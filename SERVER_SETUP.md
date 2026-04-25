# Self-hosting Studio on Ubuntu Server

## Requirements

- Ubuntu 22.04+ (or any modern Debian-based distro)
- Docker Engine 24+
- Docker Compose plugin (`docker compose` not `docker-compose`)
- Your mergeFS pool already mounted (e.g. at `/mnt/pool`)

---

## 1. Install Docker

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker
```

Verify:
```bash
docker --version
docker compose version
```

---

## 2. Clone / copy the app to the server

```bash
# From your local machine
scp -r /path/to/Studio_App user@your-server-ip:~/studio

# Or clone if you have it in a repo
git clone <your-repo-url> ~/studio
cd ~/studio
```

---

## 3. Create your `.env` file

In the `~/studio` directory, create a `.env` file. This is where you set all runtime config including the data path on your mergeFS pool.

```bash
nano ~/studio/.env
```

Paste and edit:

```env
# Strong password for the app login
APP_PASSWORD=change_me_to_something_strong

# Port the container will expose on the host
PORT=3000

# A random secret for session cookies — generate one:
# openssl rand -hex 32
SESSION_SECRET=paste_your_random_secret_here

# Absolute path on the HOST where your project data lives.
# Point this at your mergeFS pool directory.
# The container always sees it as /data internally.
DATA_PATH=/mnt/pool/studio-data
```

> **Important:** `DATA_PATH` is the path on your Ubuntu server, not inside the container. The container always mounts it at `/data` regardless.

---

## 4. Create the data directory

Make sure the target directory exists and the Docker process can write to it:

```bash
sudo mkdir -p /mnt/pool/studio-data
sudo chown -R $USER:$USER /mnt/pool/studio-data
```

---

## 5. Build and start

```bash
cd ~/studio
docker compose up -d --build
```

The first build downloads the Node image and installs dependencies — this takes a couple of minutes. Subsequent restarts are instant.

Check it's running:
```bash
docker compose ps
docker compose logs -f
```

The app is now available at `http://your-server-ip:3000`.

---

## 6. (Optional) Reverse proxy with Nginx + HTTPS

Install Nginx and Certbot:

```bash
sudo apt install -y nginx certbot python3-certbot-nginx
```

Create a site config:

```bash
sudo nano /etc/nginx/sites-available/studio
```

```nginx
server {
    listen 80;
    server_name studio.yourdomain.com;

    # Increase for large audio file uploads
    client_max_body_size 512M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;

        # Disable buffering so audio streams correctly
        proxy_buffering off;
        proxy_read_timeout 300s;
    }
}
```

Enable the site and get a certificate:

```bash
sudo ln -s /etc/nginx/sites-available/studio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d studio.yourdomain.com
```

---

## 7. Auto-start on reboot

Docker containers with `restart: unless-stopped` start automatically when the Docker daemon starts. Ensure Docker starts on boot:

```bash
sudo systemctl enable docker
```

If your mergeFS pool takes time to mount after boot, make sure it is fully mounted **before** Docker tries to bind-mount it. You can do this by adding a `ExecStartPre` delay or a `BindsTo=` dependency in a systemd service, but the simplest approach is:

```bash
# /etc/rc.local or a cron @reboot job
sleep 20 && cd /home/youruser/studio && docker compose up -d
```

Or create a proper systemd override:

```bash
sudo systemctl edit docker
```

```ini
[Unit]
After=mnt-pool.mount
Requires=mnt-pool.mount
```

Replace `mnt-pool.mount` with the actual systemd mount unit name for your pool (run `systemctl list-units --type=mount` to find it).

---

## 8. Updating the app

```bash
cd ~/studio
git pull                        # or re-copy files
docker compose down
docker compose up -d --build
```

Your data in `DATA_PATH` is never touched by the build.

---

## Summary of environment variables

| Variable | Default | Description |
|---|---|---|
| `APP_PASSWORD` | `studio` | Login password for the app |
| `PORT` | `3000` | Host port the app listens on |
| `SESSION_SECRET` | `studio-session-secret` | Secret for signing session cookies — change this! |
| `DATA_PATH` | `./data` | **Host path** to your data directory (mergeFS pool path goes here) |
