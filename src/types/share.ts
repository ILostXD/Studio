export type ShareAccess = "view" | "listen" | "edit";

export interface ShareLink {
  id: string;
  token: string;
  shareUrl: string;
  access: ShareAccess;
  createdAt: string;
  updatedAt: string;
}

export interface ShareSession {
  canEdit: boolean;
  canListen: boolean;
  shareAccess: ShareAccess;
}
