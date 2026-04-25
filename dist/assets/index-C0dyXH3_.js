(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();const $=document.getElementById("app"),K=document.getElementById("player"),ae=document.getElementById("waveform"),R=document.getElementById("player-play"),re=document.getElementById("player-prev"),ne=document.getElementById("player-next"),de=document.getElementById("player-current-time"),le=document.getElementById("player-duration"),ke=document.getElementById("player-track-title"),ge=document.getElementById("player-track-subtitle"),T=document.getElementById("player-cover-art"),S=document.getElementById("player-volume"),V=document.getElementById("player-volume-toggle"),B=document.getElementById("toast"),be=["In Progress","Mastering","Done"],ue=[{value:"listen",label:"See + Listen"},{value:"view",label:"See Only"},{value:"edit",label:"See + Edit + Listen"}],$e={back:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"></path><path d="M9 12h11"></path></svg>',logout:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><path d="M16 17l5-5-5-5"></path><path d="M21 12H9"></path></svg>',shuffle:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 3h5v5"></path><path d="M4 20l6-6"></path><path d="M21 3l-7 7"></path><path d="M4 4l6 6"></path><path d="M14 14l7 7"></path><path d="M16 21h5v-5"></path></svg>',play:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"></path></svg>',pause:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="5" width="4" height="14" rx="1" fill="currentColor"></rect><rect x="13" y="5" width="4" height="14" rx="1" fill="currentColor"></rect></svg>',more:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="12" r="1.7" fill="currentColor"></circle><circle cx="12" cy="12" r="1.7" fill="currentColor"></circle><circle cx="18" cy="12" r="1.7" fill="currentColor"></circle></svg>',prev:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h2v14H6zM19 5l-9 7 9 7V5z" fill="currentColor"></path></svg>',next:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 5h2v14h-2zM5 5l9 7-9 7V5z" fill="currentColor"></path></svg>',close:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6L6 18"></path><path d="M6 6l12 12"></path></svg>',trash:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path></svg>',plus:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>',check:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5"></path></svg>',volume:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l5 4V6L8 10H4z" fill="currentColor"></path><path d="M16 9a5 5 0 0 1 0 6"></path><path d="M18.8 6.2a9 9 0 0 1 0 11.6"></path></svg>',mute:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l5 4V6L8 10H4z" fill="currentColor"></path><path d="M22 9l-6 6"></path><path d="M16 9l6 6"></path></svg>'},a={authenticated:!1,route:{type:"home"},projects:[],currentProject:null,sharedProject:null,player:{wavesurfer:null,queue:[],index:-1,track:null,autoplayOnReady:!1,volume:.85,previousVolume:.85},trackMenu:{trackId:null,notes:"",lyrics:"",todos:[],versions:[],activeVersionId:null}};let W=null;function h(e){return $e[e]||""}function we(e,t,r){return Math.max(t,Math.min(r,e))}function c(e){return String(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#39;")}function oe(e){return String(e||"").replace(/\u00a0/g," ").replace(/\r/g,"").trim()}function J(e){if(!Number.isFinite(e)||e<0)return"0:00";const t=Math.floor(e),r=Math.floor(t/60),n=String(t%60).padStart(2,"0");return`${r}:${n}`}function pe(e){if(!Number.isFinite(e)||e<=0)return"0m";const t=Math.max(0,Math.round(e)),r=Math.floor(t/3600),n=Math.floor(t%3600/60),o=t%60;return r>0?`${r}h ${String(n).padStart(2,"0")}m`:n>0?`${n}m ${String(o).padStart(2,"0")}s`:`${o}s`}function Ie(e){const t=Number(e);if(!Number.isFinite(t)||t<=0)return"-";const r=t/(1024*1024);if(r>=1)return`${r.toFixed(1)} MB`;const n=t/1024;return`${Math.max(1,Math.round(n))} KB`}function ve(e){const t=String(e||"listen"),r=ue.find(n=>n.value===t);return r?r.label:"See + Listen"}function Ee(e="listen"){return ue.map(t=>{const r=t.value===e?"selected":"";return`<option value="${c(t.value)}" ${r}>${c(t.label)}</option>`}).join("")}function me(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleDateString(void 0,{month:"short",day:"numeric"})}function X(e){const t=Math.random().toString(36).slice(2,9);return`${e}-${Date.now()}-${t}`}function H(e){return String(e||"").replace(/\r/g,"").trim().slice(0,220)}function Y(e){if(typeof e=="string"){const n=H(e);return n?{id:X("todo"),text:n,done:!1}:null}if(!e||typeof e!="object")return null;const t=H(e.text);return t?{id:String(e.id||"").trim().slice(0,80)||X("todo"),text:t,done:!!e.done}:null}function F(e){return Array.isArray(e)?e.map(t=>Y(t)).filter(t=>t!==null):typeof e=="string"?e.split(`
`).map(t=>Y(t)).filter(t=>t!==null):[]}function g(){return a.route&&a.route.type==="share"}function C(){return g()?a.route.token:null}function I(){return g()?a.sharedProject:a.currentProject}function x(){const e=I();return e?g()?!!e.canEdit:!0:!1}function z(){const e=I();return e?g()?!!e.canListen:!0:!1}function Le(e){return!e||!Array.isArray(e.versions)||!e.versions.length?null:e.versions.find(t=>t.id===e.activeVersionId)||e.versions[0]}function ee(e){const t=I();return(t&&Array.isArray(t.tracks)?t.tracks:[]).find(n=>n.id===e)||null}function Te(e){const t=[...e];for(let r=t.length-1;r>0;r-=1){const n=Math.floor(Math.random()*(r+1));[t[r],t[n]]=[t[n],t[r]]}return t}function p(e){B&&(B.textContent=e,B.classList.remove("hidden"),W&&window.clearTimeout(W),W=window.setTimeout(()=>{B.classList.add("hidden")},2600))}async function k(e,t={}){const{method:r="GET",body:n,allowUnauthorized:o=!1}=t,i={method:r,credentials:"include",headers:{}};n instanceof FormData?i.body=n:n!==void 0&&(i.body=JSON.stringify(n),i.headers["Content-Type"]="application/json");const d=await fetch(e,i),u=(d.headers.get("content-type")||"").includes("application/json")?await d.json().catch(()=>({})):await d.text();if(!d.ok){if(d.status===401&&!o){const l=new Error("Authentication required");throw l.code="AUTH_REQUIRED",l}const f=new Error(u&&u.error?u.error:`Request failed (${d.status})`);throw f.code=d.status===401?"AUTH_REQUIRED":"REQUEST_FAILED",f}return u}function je(){const t=(window.location.pathname.replace(/\/+$/,"")||"/").split("/").filter(Boolean);return t[0]==="share"&&t[1]?{type:"share",token:decodeURIComponent(t[1])}:t[0]==="project"&&t[1]?{type:"project",projectId:decodeURIComponent(t[1])}:{type:"home"}}function j(e){window.location.pathname!==e&&window.history.pushState({},"",e),O()}function Me(e){return{id:e.id,title:e.title,artist:e.artist,description:e.description,status:e.status,coverUrl:e.coverUrl,trackCount:Array.isArray(e.tracks)?e.tracks.length:0,totalRuntimeSeconds:Number(e.totalRuntimeSeconds)||0,shareUrl:e.shareUrl,shareLinks:Array.isArray(e.shareLinks)?e.shareLinks:[],createdAt:e.createdAt,updatedAt:e.updatedAt}}function te(e){const t=Me(e),r=a.projects.findIndex(n=>n.id===t.id);if(r>=0){a.projects.splice(r,1,t);return}a.projects.unshift(t)}async function se(e){if(e)try{await navigator.clipboard.writeText(e),p("Share link copied");return}catch{const r=document.createElement("input");r.value=e,document.body.appendChild(r),r.select(),document.execCommand("copy"),document.body.removeChild(r),p("Share link copied")}}function M(e,t=!1){$.innerHTML=`
    <section class="view">
      <div class="empty-state">
        <h2>Studio</h2>
        <p>${c(e||"Something went wrong")}</p>
        ${t?'<button id="error-home-button" class="primary-button" type="button">Back Home</button>':""}
      </div>
    </section>
  `;const r=document.getElementById("error-home-button");r&&r.addEventListener("click",()=>j("/"))}function Ce(e){const t=[];if(e.trackNumber!==null&&e.trackNumber!==void 0&&e.trackNumber!==""&&t.push(`Track ${e.trackNumber}`),e.notes)t.push(String(e.notes).split(`
`)[0].slice(0,60));else if(e.lyrics)t.push(`Lyrics: ${String(e.lyrics).split(`
`)[0].slice(0,48)}`);else if(e.todos){const r=F(e.todos),n=r.filter(o=>!o.done).length;t.push(n?`Todos: ${n} open`:`Todos: ${r.length}`)}else e.originalName&&t.push(e.originalName);return t.join(" | ")}function N(){if(!a.player.wavesurfer||!R)return;const e=a.player.wavesurfer.isPlaying();R.innerHTML=h(e?"pause":"play")}function ye(e){S&&(S.value=String(e)),V&&(V.innerHTML=e>0?h("volume"):h("mute"))}function A(e){const t=we(Number(e),0,1);a.player.volume=t,t>0&&(a.player.previousVolume=t),a.player.wavesurfer&&a.player.wavesurfer.setVolume(t),ye(t)}function Se(){if(!T)return;const e=a.route.type==="share"?a.sharedProject:a.currentProject;if(e&&e.coverUrl){T.style.backgroundImage=`url("${e.coverUrl}")`,T.classList.add("has-image"),T.textContent="";return}T.style.backgroundImage="",T.classList.remove("has-image");const t=e&&e.title?String(e.title).charAt(0).toUpperCase():"S";T.textContent=t}function _(){const e=a.player.track?a.player.track.id:null;$.querySelectorAll(".track-row[data-track-id]").forEach(r=>{r.classList.toggle("is-active",!!(e&&r.dataset.trackId===e))})}function fe(e){const t=a.player.queue||[];if(!t.length)return;let r=e;r<0&&(r=t.length-1),r>=t.length&&(r=0);const n=t[r];L(n,t,r)}function ce(){fe(a.player.index+1)}function xe(){if(!a.player.wavesurfer||!a.player.track)return;if(a.player.wavesurfer.getCurrentTime()>3){a.player.wavesurfer.seekTo(0);return}fe(a.player.index-1)}function L(e,t,r){if(!a.player.wavesurfer||!e){p("Waveform player is unavailable");return}if(!e.audioUrl){p("This link cannot play audio");return}if(a.player.track&&a.player.track.id===e.id&&a.player.track.audioUrl===e.audioUrl){a.player.wavesurfer.playPause();return}a.player.queue=t,a.player.index=r,a.player.track=e,a.player.autoplayOnReady=!0,ke.textContent=e.title||e.originalName||"Untitled Track",ge.textContent=Ce(e),de.textContent="0:00",le.textContent="0:00",Se(),K.classList.remove("hidden"),window.requestAnimationFrame(()=>{a.player.wavesurfer.load(e.audioUrl)}),_(),N()}function Be(){if(!window.WaveSurfer||!ae){p("Could not initialize waveform renderer");return}a.player.wavesurfer=WaveSurfer.create({container:ae,waveColor:"rgba(255, 255, 255, 0.18)",progressColor:"#A89EFF",cursorColor:"#d9d4ff",barWidth:1.2,barGap:1.2,barRadius:2,height:30,normalize:!0,hideScrollbar:!0}),re.innerHTML=h("prev"),ne.innerHTML=h("next"),R.innerHTML=h("play"),ye(a.player.volume);const e=t=>{de.textContent=J(t)};a.player.wavesurfer.on("ready",()=>{le.textContent=J(a.player.wavesurfer.getDuration()),a.player.autoplayOnReady&&(a.player.wavesurfer.play(),a.player.autoplayOnReady=!1),A(a.player.volume),N()}),a.player.wavesurfer.on("audioprocess",()=>{e(a.player.wavesurfer.getCurrentTime())}),a.player.wavesurfer.on("timeupdate",t=>{e(t)}),a.player.wavesurfer.on("interaction",()=>{e(a.player.wavesurfer.getCurrentTime())}),a.player.wavesurfer.on("play",N),a.player.wavesurfer.on("pause",N),a.player.wavesurfer.on("finish",()=>{ce()}),a.player.wavesurfer.on("error",()=>{p("Could not load track")}),R.addEventListener("click",()=>{if(!a.player.track){const t=a.player.queue||[];t.length&&L(t[0],t,0);return}a.player.wavesurfer.playPause()}),re.addEventListener("click",xe),ne.addEventListener("click",ce),S&&S.addEventListener("input",()=>{A(S.value)}),V&&V.addEventListener("click",()=>{if(a.player.volume<=.001){A(a.player.previousVolume||.85);return}a.player.previousVolume=a.player.volume,A(0)})}async function Ae(){const e=await k("/api/projects");a.projects=e.projects||[]}async function Pe(e){const t=await k(`/api/projects/${encodeURIComponent(e)}`);a.currentProject=t.project,te(t.project)}function E(e){g()&&(a.sharedProject=e),a.currentProject=e,te(e)}async function P(e){const t=I();if(!t)return;const r=g()?`/api/share/${encodeURIComponent(C())}/project`:`/api/projects/${encodeURIComponent(t.id)}`,n=await k(r,{method:"PATCH",body:e});E(n.project)}async function he(e,t,r){const n=g()?`/api/share/${encodeURIComponent(C())}/tracks/${encodeURIComponent(t)}`:`/api/projects/${encodeURIComponent(e)}/tracks/${encodeURIComponent(t)}`,o=await k(n,{method:"PATCH",body:r});E(o.project)}async function Ue(e,t,r){const n=new FormData;n.append("track",r);const o=g()?`/api/share/${encodeURIComponent(C())}/tracks/${encodeURIComponent(t)}/versions`:`/api/projects/${encodeURIComponent(e)}/tracks/${encodeURIComponent(t)}/versions`,i=await k(o,{method:"POST",body:n});E(i.project)}async function Ne(e,t,r){const n=g()?`/api/share/${encodeURIComponent(C())}/tracks/${encodeURIComponent(t)}/versions/${encodeURIComponent(r)}/select`:`/api/projects/${encodeURIComponent(e)}/tracks/${encodeURIComponent(t)}/versions/${encodeURIComponent(r)}/select`,o=await k(n,{method:"POST"});E(o.project)}async function Re(e,t){const r=new FormData;r.append("cover",t);const n=g()?`/api/share/${encodeURIComponent(C())}/cover`:`/api/projects/${encodeURIComponent(e)}/cover`,o=await k(n,{method:"POST",body:r});E(o.project)}async function Ve(e,t){const r=g()?`/api/share/${encodeURIComponent(C())}/covers/${encodeURIComponent(t)}/select`:`/api/projects/${encodeURIComponent(e)}/covers/${encodeURIComponent(t)}/select`,n=await k(r,{method:"POST"});E(n.project)}function q(){const e=document.getElementById("track-menu-overlay");e&&(e.classList.add("hidden"),e.setAttribute("aria-hidden","true")),a.trackMenu={trackId:null,notes:"",lyrics:"",todos:[],versions:[],activeVersionId:null}}function D(){const e=document.getElementById("track-todo-list");if(!e)return;const t=x(),r=a.trackMenu.todos||[];if(!r.length){e.innerHTML='<p class="todo-empty">No todos yet.</p>';return}e.innerHTML=r.map((n,o)=>`
        <div class="todo-row ${n.done?"done":""}" data-todo-row="${o}">
          <label class="todo-toggle" aria-label="Toggle todo">
            <input type="checkbox" data-todo-toggle="${o}" ${n.done?"checked":""} ${t?"":"disabled"} />
            <span>${h("check")}</span>
          </label>
          <input
            class="todo-text-input"
            type="text"
            value="${c(n.text)}"
            maxlength="220"
            data-todo-text="${o}"
            ${t?"":"disabled"}
          />
          <button
            class="icon-button todo-remove-button"
            type="button"
            aria-label="Remove todo"
            data-todo-remove="${o}"
            ${t?"":"disabled"}
          >${h("close")}</button>
        </div>
      `).join(""),t&&(e.querySelectorAll("[data-todo-toggle]").forEach(n=>{n.addEventListener("change",()=>{const o=Number.parseInt(n.dataset.todoToggle,10);!Number.isFinite(o)||!a.trackMenu.todos[o]||(a.trackMenu.todos[o].done=n.checked,D())})}),e.querySelectorAll("[data-todo-text]").forEach(n=>{n.addEventListener("input",()=>{const o=Number.parseInt(n.dataset.todoText,10);!Number.isFinite(o)||!a.trackMenu.todos[o]||(a.trackMenu.todos[o].text=H(n.value))})}),e.querySelectorAll("[data-todo-remove]").forEach(n=>{n.addEventListener("click",()=>{const o=Number.parseInt(n.dataset.todoRemove,10);Number.isFinite(o)&&(a.trackMenu.todos.splice(o,1),D())})}))}function He(){const e=document.getElementById("track-version-list");if(!e)return;const t=x(),r=Array.isArray(a.trackMenu.versions)?a.trackMenu.versions:[];if(!r.length){e.innerHTML='<p class="todo-empty">No versions yet.</p>';return}e.innerHTML=r.map(n=>{const o=n.id===a.trackMenu.activeVersionId,i=[];return Number.isFinite(n.durationSeconds)&&i.push(J(n.durationSeconds)),Number.isFinite(n.sizeBytes)&&i.push(Ie(n.sizeBytes)),`
        <div class="version-row ${o?"active":""}" data-version-row="${c(n.id)}">
          <div class="version-main">
            <div class="version-title">${c(n.originalName||"Untitled version")}</div>
            <div class="version-meta">${c(i.join(" • ")||"No metadata")}</div>
          </div>
          <button class="secondary-button version-use-button" type="button" data-version-select="${c(n.id)}" ${t?"":"disabled"}>${o?"Active":"Use"}</button>
        </div>
      `}).join(""),t&&e.querySelectorAll("[data-version-select]").forEach(n=>{n.addEventListener("click",async()=>{const o=n.dataset.versionSelect;if(!o||!a.trackMenu.trackId)return;const i=I();if(i)try{await Ne(i.id,a.trackMenu.trackId,o);const d=ee(a.trackMenu.trackId);if(d&&(a.trackMenu.versions=Array.isArray(d.versions)?[...d.versions]:[],a.trackMenu.activeVersionId=d.activeVersionId||null),a.player.track&&a.player.track.id===a.trackMenu.trackId&&d){const v=I()&&I().tracks||[],u=v.findIndex(f=>f.id===d.id);u>=0&&L(v[u],v,u)}w(),Z(a.trackMenu.trackId),p("Switched track version")}catch(d){p(d.message||"Could not switch version")}})})}function ie(){const e=document.getElementById("track-todo-input");if(!e)return;const t=H(e.value);t&&(a.trackMenu.todos.push({id:X("todo"),text:t,done:!1}),e.value="",D())}function Z(e){const t=ee(e);if(!t)return;a.trackMenu.trackId=t.id,a.trackMenu.notes=String(t.notes||""),a.trackMenu.lyrics=String(t.lyrics||""),a.trackMenu.todos=F(t.todos),a.trackMenu.versions=Array.isArray(t.versions)?[...t.versions]:[],a.trackMenu.activeVersionId=t.activeVersionId||null;const r=document.getElementById("track-menu-title"),n=document.getElementById("track-menu-subtitle"),o=document.getElementById("track-menu-notes"),i=document.getElementById("track-menu-lyrics"),d=document.getElementById("track-todo-input"),v=document.getElementById("track-menu-overlay");if(!v||!r||!n||!o||!i)return;const u=[];t.trackNumber!==null&&t.trackNumber!==void 0&&t.trackNumber!==""&&u.push(`Track ${t.trackNumber}`),t.originalName&&u.push(t.originalName),t.versionCount>1&&u.push(`${t.versionCount} versions`),r.textContent=t.title||t.originalName||"Untitled track",n.textContent=u.join(" | "),o.value=a.trackMenu.notes,i.value=a.trackMenu.lyrics,d&&(d.value=""),v.classList.remove("hidden"),v.setAttribute("aria-hidden","false"),D(),He()}async function qe(e){if(!a.trackMenu.trackId)return;const t=document.getElementById("track-menu-notes"),r=document.getElementById("track-menu-lyrics");a.trackMenu.notes=String(t?t.value:"").slice(0,4e3),a.trackMenu.lyrics=String(r?r.value:"").slice(0,12e3);const n=(a.trackMenu.todos||[]).map(o=>Y(o)).filter(o=>o!==null);await he(e,a.trackMenu.trackId,{notes:a.trackMenu.notes,lyrics:a.trackMenu.lyrics,todos:n}),p("Track details saved"),q(),w()}async function De(e){if(!a.trackMenu.trackId||!window.confirm("Delete this track from the project?"))return;const t=g()?`/api/share/${encodeURIComponent(C())}/tracks/${encodeURIComponent(a.trackMenu.trackId)}`:`/api/projects/${encodeURIComponent(e)}/tracks/${encodeURIComponent(a.trackMenu.trackId)}`,r=await k(t,{method:"DELETE"});E(r.project),q(),w()}function Oe(e,t={}){const{canEdit:r=!1}=t,n=document.getElementById("track-menu-overlay"),o=document.getElementById("track-menu-close"),i=document.getElementById("track-menu-save"),d=document.getElementById("track-menu-delete"),v=document.getElementById("track-menu-play"),u=document.getElementById("track-todo-add"),f=document.getElementById("track-todo-input"),l=document.getElementById("track-version-add"),y=document.getElementById("track-version-input");$.querySelectorAll("[data-track-menu]").forEach(s=>{s.addEventListener("click",()=>{Z(s.dataset.trackMenu)})}),n&&n.addEventListener("click",s=>{s.target===n&&q()}),o&&o.addEventListener("click",()=>{q()}),i&&i.addEventListener("click",async()=>{if(r)try{await qe(e)}catch(s){p(s.message||"Could not save track details")}}),d&&d.addEventListener("click",async()=>{if(r)try{await De(e)}catch(s){p(s.message||"Could not delete track")}}),v&&v.addEventListener("click",()=>{if(!a.trackMenu.trackId)return;if(!z()){p("This share link cannot play audio");return}const s=I(),m=s&&s.tracks||[],b=m.findIndex(Q=>Q.id===a.trackMenu.trackId);b<0||L(m[b],m,b)}),u&&u.addEventListener("click",()=>{r&&ie()}),f&&f.addEventListener("keydown",s=>{r&&s.key==="Enter"&&(s.preventDefault(),ie())}),l&&y&&(l.addEventListener("click",()=>{!r||!a.trackMenu.trackId||y.click()}),y.addEventListener("change",async()=>{if(!r||!a.trackMenu.trackId)return;const s=y.files&&y.files[0];if(s)try{await Ue(e,a.trackMenu.trackId,s);const m=ee(a.trackMenu.trackId);m&&(a.trackMenu.versions=Array.isArray(m.versions)?[...m.versions]:[],a.trackMenu.activeVersionId=m.activeVersionId||null),y.value="",w(),Z(a.trackMenu.trackId),p("Track version uploaded")}catch(m){p(m.message||"Could not upload version")}}))}function U(e,t,r={}){if(!e)return;const{singleLine:n=!1}=r;e.addEventListener("focus",()=>{e.dataset.beforeEdit=oe(e.innerText)}),n&&e.addEventListener("keydown",o=>{o.key==="Enter"&&(o.preventDefault(),e.blur())}),e.addEventListener("blur",async()=>{const o=e.dataset.beforeEdit||"",i=oe(e.innerText);if(o!==i)try{await t(i),w()}catch(d){p(d.message||"Failed to save changes"),e.innerText=o}})}function Fe(e){return e.coverUrl?`<img src="${c(e.coverUrl)}" alt="Cover image" loading="lazy" />`:""}function ze(){const e=a.projects.map(t=>{const r=t.trackCount===1?"1 track":`${t.trackCount||0} tracks`,n=pe(t.totalRuntimeSeconds||0);return`
        <article class="project-card" data-open-project="${c(t.id)}">
          <div class="card-cover">
            ${Fe(t)}
            <span class="status-pill">${c(t.status||"In Progress")}</span>
          </div>
          <div class="card-body">
            <h3 class="card-title">${c(t.title||"Untitled Project")}</h3>
            <p class="card-artist">${c(t.artist||"Unknown Artist")}</p>
            <p class="card-meta">${c(`${r} • ${n}`)}</p>
          </div>
        </article>
      `}).join("");$.innerHTML=`
    <section class="view home-view">
      <header class="topbar">
        <div>
          <h1 class="brand">Studio</h1>
          <p class="brand-sub">Private workspace for works in progress</p>
        </div>
        <button id="logout-button" class="text-button" type="button">Logout</button>
      </header>

      <section class="home-actions">
        <button id="create-project-button" class="primary-button" type="button">New Project</button>
      </section>

      <section class="project-grid">
        ${e||'<div class="empty-state">No projects yet. Create one to start uploading tracks.</div>'}
      </section>
    </section>
  `,document.getElementById("logout-button").addEventListener("click",async()=>{try{await k("/api/logout",{method:"POST"}),a.authenticated=!1,a.currentProject=null,j("/")}catch(t){p(t.message||"Could not log out")}}),document.getElementById("create-project-button").addEventListener("click",async()=>{try{const t=await k("/api/projects",{method:"POST",body:{title:"Untitled Project",artist:"Unknown Artist",description:"",status:"In Progress"}});a.currentProject=t.project,te(t.project),j(`/project/${t.project.id}`)}catch(t){p(t.message||"Failed to create project")}}),$.querySelectorAll("[data-open-project]").forEach(t=>{t.addEventListener("click",()=>{j(`/project/${t.dataset.openProject}`)})}),_()}function _e(e,t){const r=x(),n=r&&!g(),o=z(),i=me(e.createdAt)||"No date",d=F(e.todos),v=d.filter(l=>!l.done).length,u=Le(e),f=[];return e.versionCount>1&&f.push(`<span class="track-badge">v${e.versionCount}</span>`),u&&u.originalName&&f.push(`<span class="track-badge">${c(u.originalName.slice(0,26))}</span>`),e.notes&&f.push('<span class="track-badge">Notes</span>'),e.lyrics&&f.push('<span class="track-badge">Lyrics</span>'),d.length&&f.push(`<span class="track-badge">Todos ${v}/${d.length}</span>`),`
    <article class="track-row" data-track-id="${c(e.id)}" draggable="${n?"true":"false"}">
      <div class="track-index drag-handle" title="Drag to reorder">${t+1}</div>
      <div class="track-main">
        <div class="track-line">
          <div
            class="editable track-title-editable"
            contenteditable="${r?"true":"false"}"
            spellcheck="false"
            data-track-id="${c(e.id)}"
            data-track-field="title"
            data-placeholder="Untitled track"
          >${c(e.title||"")}</div>
        </div>

        <div class="track-meta-line">
          <span class="track-date">${c(i)}</span>
          <span class="track-file-name">${c(e.originalName||(u==null?void 0:u.originalName)||"")}</span>
        </div>

        <div class="track-badges">${f.join("")}</div>
      </div>
      <button class="icon-button track-play-button" type="button" data-play-track="${c(e.id)}" title="Play track" ${o?"":"disabled"}>${h("play")}</button>
      <button class="icon-button track-menu-button" type="button" data-track-menu="${c(e.id)}" title="Track options">${h("more")}</button>
    </article>
  `}function Qe(e){return be.map(t=>{const r=t===e?"selected":"";return`<option value="${c(t)}" ${r}>${c(t)}</option>`}).join("")}function w(){const e=I();if(!e){M("Project not found",!0);return}const t=x(),r=z(),n=!g(),o=e.tracks||[],i=o.map((m,b)=>_e(m,b)).join(""),d=o.length===1?"1 track":`${o.length} tracks`,v=pe(e.totalRuntimeSeconds||0),u=`${d} • ${v}`,f=Array.isArray(e.shareLinks)?e.shareLinks:[],y=(Array.isArray(e.coverVersions)?e.coverVersions:[]).map(m=>`
        <button
          class="cover-switcher-thumb ${m.id===e.activeCoverId?"active":""}"
          type="button"
          data-cover-version="${c(m.id)}"
          title="Switch cover"
        >
          <img src="${c(m.coverUrl)}" alt="Cover version" loading="lazy" />
        </button>
      `).join(""),s=f.map(m=>{const b=`${window.location.origin}${m.shareUrl}`;return`
        <div class="share-link-item">
          <span class="share-link-type">${c(ve(m.access))}</span>
          <input class="share-link-input" type="text" readonly value="${c(b)}" />
          <button class="secondary-button" type="button" data-copy-share="${c(m.shareUrl)}">Copy</button>
          <button class="secondary-button" type="button" data-delete-share="${c(m.id)}">Delete</button>
        </div>
      `}).join("");$.innerHTML=`
    <section class="view project-view">
      <header class="project-chrome">
          <button id="back-home-button" class="circle-button" type="button" aria-label="Back to library">${h("back")}</button>
        <div class="chrome-actions">
            ${n?`<button id="logout-button" class="circle-button" type="button" aria-label="Log out">${h("logout")}</button>`:""}
        </div>
      </header>

      <section class="project-stage">
        <div class="cover-stack">
          <button id="cover-button" class="cover-editor stage-cover" type="button" aria-label="Upload cover image">
            ${e.coverUrl?`<img src="${c(e.coverUrl)}" alt="Project cover" />`:"Click to upload cover"}
          </button>
          <div class="cover-switcher-wrap">
            <p class="cover-switcher-label">Cover Versions</p>
            <div id="cover-switcher" class="cover-switcher">
              ${y||'<p class="todo-empty">No cover versions yet.</p>'}
            </div>
          </div>
        </div>

        <div class="project-column">
          <div class="project-head">
            <div class="project-headings">
              <h1 id="project-title" class="editable heading-editable" contenteditable="${t?"true":"false"}" spellcheck="false" data-placeholder="Project title">${c(e.title||"")}</h1>

              <div class="project-stats-row">
                <p id="project-artist" class="editable subheading-editable" contenteditable="${t?"true":"false"}" spellcheck="false" data-placeholder="Artist">${c(e.artist||"")}</p>
                  <span class="stats-dot">&middot;</span>
                <span class="project-track-count">${c(u)}</span>
              </div>
            </div>

            <div class="project-main-controls">
              <button id="shuffle-tracks-button" class="icon-button ghost-control" type="button" title="Shuffle queue">${h("shuffle")}</button>
              <button id="play-all-button" class="icon-button play-main-control" type="button" title="Play from start" ${r?"":"disabled"}>${h("play")}</button>
            </div>
          </div>

          <div class="project-tools">
            <button id="upload-tracks-button" class="add-tracks-button" type="button" ${t?"":"disabled"}>+ Add tracks</button>

            <div class="project-secondary-controls">
              <div class="meta-row">
                <label for="project-status">Status</label>
                <select id="project-status" class="project-status-select" ${t?"":"disabled"}>${Qe(e.status)}</select>
              </div>
            </div>
          </div>

          ${n?`
            <div class="share-manager">
              <div class="share-create-row">
                <label for="share-access-select">Share Access</label>
                <select id="share-access-select" class="project-status-select">${Ee("listen")}</select>
                <button id="share-create-button" class="secondary-button" type="button">Create Share Link</button>
              </div>
              <div id="share-links-list" class="share-links-list">
                ${s||'<p class="todo-empty">No share links yet.</p>'}
              </div>
            </div>
          `:""}

          <div class="project-notes-shell">
            <div id="project-description" class="editable description-editable" contenteditable="${t?"true":"false"}" spellcheck="true" data-placeholder="Project notes">${c(e.description||"")}</div>
          </div>

          <section class="tracks-panel">
            <div class="tracks-toolbar">
              <h2>Tracklist</h2>
            </div>

            <input id="cover-input" type="file" hidden accept=".jpg,.jpeg,.png,.webp" />
            <input id="track-input" type="file" hidden multiple accept=".wav,.mp3,.flac" />

            <div id="tracks-list" class="tracks-list">
              ${i||'<div class="empty-state">No tracks uploaded yet. Add WAV, MP3, or FLAC files.</div>'}
            </div>
          </section>
        </div>
      </section>

      <div id="track-menu-overlay" class="track-menu-overlay hidden" aria-hidden="true">
        <section class="track-menu-sheet" role="dialog" aria-modal="true" aria-label="Track details">
          <header class="track-menu-header">
            <div class="track-menu-headings">
              <h3 id="track-menu-title">Track details</h3>
              <p id="track-menu-subtitle"></p>
            </div>
            <button id="track-menu-close" class="circle-button track-menu-close" type="button" aria-label="Close track details">${h("close")}</button>
          </header>

          <div class="track-menu-actions">
            <button id="track-menu-play" class="secondary-button track-menu-play" type="button" ${r?"":"disabled"}>${h("play")} Play</button>
            <button id="track-menu-save" class="primary-button" type="button" ${t?"":"disabled"}>Save</button>
          </div>

          <div class="track-menu-field">
            <div class="track-menu-todo-head">
              <label>Versions</label>
              <button id="track-version-add" class="secondary-button track-menu-todo-add" type="button" ${t?"":"disabled"}>${h("plus")} Upload</button>
            </div>
            <input id="track-version-input" type="file" hidden accept=".wav,.mp3,.flac" />
            <div id="track-version-list" class="track-version-list"></div>
          </div>

          <div class="track-menu-field">
            <label for="track-menu-notes">Notes</label>
            <textarea id="track-menu-notes" class="track-menu-notes" placeholder="Session notes" ${t?"":"disabled"}></textarea>
          </div>

          <div class="track-menu-field">
            <label for="track-menu-lyrics">Lyrics</label>
            <textarea id="track-menu-lyrics" class="track-menu-lyrics" placeholder="Lyrics with line breaks" ${t?"":"disabled"}></textarea>
          </div>

          <div class="track-menu-field">
            <div class="track-menu-todo-head">
              <label for="track-todo-input">Todos</label>
              <button id="track-todo-add" class="secondary-button track-menu-todo-add" type="button" ${t?"":"disabled"}>${h("plus")} Add</button>
            </div>

            <div class="track-menu-todo-add-row">
              <input id="track-todo-input" type="text" placeholder="Add todo item" maxlength="220" ${t?"":"disabled"} />
            </div>

            <div id="track-todo-list" class="track-menu-todo-list"></div>
          </div>

          <footer class="track-menu-footer">
            <button id="track-menu-delete" class="secondary-button track-menu-delete" type="button" ${t?"":"disabled"}>${h("trash")} Delete Track</button>
          </footer>
        </section>
      </div>
    </section>
  `,We(),_()}function We(){const e=I();if(!e)return;const t=x(),r=z(),n=!g();document.getElementById("back-home-button").addEventListener("click",()=>{j("/")});const o=document.getElementById("logout-button");o&&o.addEventListener("click",async()=>{try{await k("/api/logout",{method:"POST"}),a.authenticated=!1,a.currentProject=null,j("/")}catch(l){p(l.message||"Could not log out")}}),t&&(U(document.getElementById("project-title"),async l=>{await P({title:l||"Untitled Project"})},{singleLine:!0}),U(document.getElementById("project-artist"),async l=>{await P({artist:l||"Unknown Artist"})},{singleLine:!0}),U(document.getElementById("project-description"),async l=>{await P({description:l})}));const i=document.getElementById("project-status");i&&t&&i.addEventListener("change",async()=>{try{await P({status:i.value}),w()}catch(l){p(l.message||"Failed to save status")}});const d=document.getElementById("cover-input");document.getElementById("cover-button").addEventListener("click",()=>{t&&d.click()}),d.addEventListener("change",async()=>{if(t&&!(!d.files||!d.files[0]))try{await Re(e.id,d.files[0]),w(),p("Cover version uploaded")}catch(l){p(l.message||"Cover upload failed")}}),$.querySelectorAll("[data-cover-version]").forEach(l=>{l.addEventListener("click",async()=>{if(!t)return;const y=l.dataset.coverVersion;if(y)try{await Ve(e.id,y),w()}catch(s){p(s.message||"Could not switch cover")}})});const v=document.getElementById("track-input");document.getElementById("upload-tracks-button").addEventListener("click",()=>{t&&v.click()});const u=document.getElementById("play-all-button");u&&u.addEventListener("click",()=>{if(!r){p("This share link cannot play audio");return}const l=I(),y=l&&l.tracks||[];if(!y.length){p("No tracks available");return}L(y[0],y,0)});const f=document.getElementById("shuffle-tracks-button");if(f&&f.addEventListener("click",()=>{if(!r){p("This share link cannot play audio");return}const l=I(),y=l&&l.tracks||[];if(!y.length){p("No tracks available");return}const s=Te(y);L(s[0],s,0),p("Shuffle queue ready")}),v.addEventListener("change",async()=>{if(!t||g())return;const l=Array.from(v.files||[]);if(!l.length)return;const y=new FormData;l.forEach(s=>{y.append("tracks",s)});try{const s=await k(`/api/projects/${encodeURIComponent(e.id)}/tracks`,{method:"POST",body:y});E(s.project),w(),p("Tracks uploaded")}catch(s){p(s.message||"Track upload failed")}}),n){const l=document.getElementById("share-create-button"),y=document.getElementById("share-access-select");l&&y&&l.addEventListener("click",async()=>{try{const s=await k(`/api/projects/${encodeURIComponent(e.id)}/share`,{method:"POST",body:{access:y.value}});E(s.project),w(),s.shareLink&&s.shareLink.shareUrl&&await se(`${window.location.origin}${s.shareLink.shareUrl}`)}catch(s){p(s.message||"Could not create share link")}}),$.querySelectorAll("[data-copy-share]").forEach(s=>{s.addEventListener("click",async()=>{const m=s.dataset.copyShare;m&&await se(`${window.location.origin}${m}`)})}),$.querySelectorAll("[data-delete-share]").forEach(s=>{s.addEventListener("click",async()=>{const m=s.dataset.deleteShare;if(m)try{const b=await k(`/api/projects/${encodeURIComponent(e.id)}/share/${encodeURIComponent(m)}`,{method:"DELETE"});E(b.project),w(),p("Share link deleted")}catch(b){p(b.message||"Could not delete share link")}})})}$.querySelectorAll("[data-play-track]").forEach(l=>{l.addEventListener("click",()=>{if(!r){p("This share link cannot play audio");return}const y=l.dataset.playTrack,s=I(),m=s&&s.tracks||[],b=m.findIndex(Q=>Q.id===y);b<0||L(m[b],m,b)})}),t&&$.querySelectorAll("[data-track-field]").forEach(l=>{const y=l.dataset.trackField,s=l.dataset.trackId;U(l,async m=>{await he(e.id,s,{[y]:m})},{singleLine:!0})}),Oe(e.id,{canEdit:t}),!g()&&t&&Ge(e.id)}function Ge(e){const t=Array.from($.querySelectorAll(".track-row[data-track-id]"));if(!t.length)return;let r=null;t.forEach(n=>{n.addEventListener("dragstart",o=>{r=n.dataset.trackId,n.classList.add("dragging"),o.dataTransfer.effectAllowed="move"}),n.addEventListener("dragend",()=>{r=null,n.classList.remove("dragging"),t.forEach(o=>o.classList.remove("drag-target"))}),n.addEventListener("dragover",o=>{o.preventDefault(),r&&r!==n.dataset.trackId&&n.classList.add("drag-target")}),n.addEventListener("dragleave",()=>{n.classList.remove("drag-target")}),n.addEventListener("drop",async o=>{if(o.preventDefault(),n.classList.remove("drag-target"),!r)return;const i=n.dataset.trackId;if(r===i)return;const d=I(),v=[...d&&d.tracks||[]],u=v.findIndex(s=>s.id===r),f=v.findIndex(s=>s.id===i);if(u<0||f<0)return;const[l]=v.splice(u,1);v.splice(f,0,l);const y=v.map(s=>s.id);try{const s=await k(`/api/projects/${encodeURIComponent(e)}/tracks/reorder`,{method:"PATCH",body:{trackIds:y}});E(s.project),w()}catch(s){p(s.message||"Failed to reorder tracks")}})})}function Ke(){const e=a.sharedProject;if(!e){M("Shared project not found",!0);return}const t=!!e.canListen;!t&&K&&K.classList.add("hidden");const n=(e.tracks||[]).map((o,i)=>{const d=o.trackNumber===null||o.trackNumber===void 0?"-":c(o.trackNumber),v=F(o.todos),u=v.filter(l=>!l.done).length,f=v.length?`${u} open / ${v.length} total`:"-";return`
        <article class="track-row readonly shared-track-row" data-track-id="${c(o.id)}">
          <div class="track-index">${i+1}</div>
          <button class="icon-button track-play-button" type="button" data-share-play-track="${c(o.id)}" aria-label="Play track" ${t?"":"disabled"}>${h("play")}</button>
          <div class="track-main">
            <div class="track-line">
              <div class="readonly-text shared-track-title">${c(o.title||"Untitled track")}</div>
            </div>

            <div class="track-meta-line">
              <span class="track-number-chip"># ${d}</span>
              <span class="track-date">${c(me(o.createdAt)||"No date")}</span>
              <span class="track-file-name">${c(o.originalName||"")}</span>
            </div>

            <div class="track-aux-grid readonly-aux-grid">
              <div class="track-aux-field">
                <span class="track-aux-label">Notes</span>
                <div class="track-aux-static">${c(o.notes||"-")}</div>
              </div>
              <div class="track-aux-field">
                <span class="track-aux-label">Lyrics</span>
                <div class="track-aux-static">${c(o.lyrics||"-")}</div>
              </div>
              <div class="track-aux-field">
                <span class="track-aux-label">Todos</span>
                <div class="track-aux-static">${c(f)}</div>
              </div>
            </div>
          </div>
          <div class="track-menu-placeholder"></div>
        </article>
      `}).join("");$.innerHTML=`
    <section class="view share-view">
      <header class="topbar">
        <div>
          <h1 class="brand">${c(e.title||"Shared Project")}</h1>
          <p class="brand-sub">by ${c(e.artist||"Unknown Artist")} • ${c(ve(e.shareAccess))}</p>
        </div>
        <button id="open-studio-button" class="text-button" type="button">Open Studio</button>
      </header>

      <section class="project-hero readonly">
        <div class="cover-editor">
          ${e.coverUrl?`<img src="${c(e.coverUrl)}" alt="Project cover" />`:"No cover"}
        </div>

        <div class="project-meta">
          <p class="readonly-text">Status: ${c(e.status||"In Progress")}</p>
          <div class="description-editable">${c(e.description||"")}</div>
        </div>
      </section>

      <section class="tracks-panel">
        <div class="tracks-toolbar">
          <h2>Tracks</h2>
        </div>
        ${t?"":'<p class="todo-empty">This link can view project data but cannot play audio.</p>'}
        <div class="tracks-list">
          ${n||'<div class="empty-state">No tracks available.</div>'}
        </div>
      </section>
    </section>
  `,document.getElementById("open-studio-button").addEventListener("click",()=>{j("/")}),t&&$.querySelectorAll("[data-share-play-track]").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.sharePlayTrack,d=a.sharedProject.tracks||[],v=d.findIndex(u=>u.id===i);v<0||L(d[v],d,v)})}),_()}function G(){$.innerHTML=`
    <section class="view login-view">
      <div class="login-card">
        <h1>Studio</h1>
        <p>Enter your app password to continue.</p>
        <form id="login-form">
          <input id="password-input" type="password" required autocomplete="current-password" placeholder="Password" />
          <button class="primary-button" type="submit">Unlock</button>
        </form>
      </div>
    </section>
  `;const e=document.getElementById("login-form"),t=document.getElementById("password-input");e.addEventListener("submit",async r=>{r.preventDefault();try{await k("/api/login",{method:"POST",body:{password:t.value},allowUnauthorized:!0}),a.authenticated=!0,t.value="",O()}catch(n){p(n.message||"Login failed")}})}async function Je(e){if(!e){M("Invalid share token",!0);return}try{const t=await k(`/api/share/${encodeURIComponent(e)}`,{allowUnauthorized:!0});if(a.sharedProject=t.project,a.currentProject=t.project,t.project&&t.project.canEdit){w();return}Ke()}catch(t){M(t.message||"Share link not found",!0)}}async function O(){const e=je();if(a.route=e,e.type==="share"){await Je(e.token);return}try{const t=await k("/api/session",{allowUnauthorized:!0});a.authenticated=!!t.authenticated}catch{M("Could not connect to the Studio server");return}if(!a.authenticated){G();return}if(e.type==="project"){try{await Pe(e.projectId),w()}catch(t){if(t.code==="AUTH_REQUIRED"){G();return}M(t.message||"Project not found",!0)}return}try{await Ae(),ze()}catch(t){if(t.code==="AUTH_REQUIRED"){G();return}M(t.message||"Could not load projects")}}function Xe(){Be(),window.addEventListener("popstate",()=>{O()}),O()}Xe();
