var Mt=Object.defineProperty;var $t=(e,t,a)=>t in e?Mt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var we=(e,t,a)=>$t(e,typeof t!="symbol"?t+"":t,a);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const L=document.getElementById("app"),W=document.getElementById("player"),He=document.getElementById("waveform"),he=document.getElementById("player-play"),Oe=document.getElementById("player-prev"),Ve=document.getElementById("player-next"),je=document.getElementById("player-current-time"),Pe=document.getElementById("player-duration"),et=document.getElementById("player-track-title"),tt=document.getElementById("player-track-subtitle"),q=document.getElementById("player-cover-art"),se=document.getElementById("player-volume"),H=document.getElementById("player-volume-toggle"),Fe=document.getElementById("player-album-title"),de=document.getElementById("player-queue-btn"),O=document.getElementById("player-queue-popover"),ue=document.getElementById("player-queue-list"),Z=document.getElementById("player-shuffle-btn"),P=document.getElementById("player-loop-btn"),pe=document.getElementById("toast"),ye=document.createElement("audio");ye.preload="auto";const It=["In Progress","Mastering","Done"],St=["Idea","Demo","Recording","Mixing","Mastering","Done"],at={Idea:"#6e6e8a",Demo:"#4a9eff",Recording:"#ff8c42",Mixing:"#f5c518",Mastering:"#a89eff",Done:"#3ecf8e"},Lt=["Dark","Energetic","Melancholic","Hype","Chill","Aggressive","Euphoric","Nostalgic"],nt={Dark:"#5a4a6e",Energetic:"#ff5e3a",Melancholic:"#4a7ebd",Hype:"#ff3cac",Chill:"#38b2ac",Aggressive:"#e53e3e",Euphoric:"#d69e2e",Nostalgic:"#744210"},Ct=["C Major","C Minor","C# Major","C# Minor","D Major","D Minor","D# Major","D# Minor","E Major","E Minor","F Major","F Minor","F# Major","F# Minor","G Major","G Minor","G# Major","G# Minor","A Major","A Minor","A# Major","A# Minor","B Major","B Minor"],_e={"C Major":"8B","C Minor":"5A","C# Major":"3B","C# Minor":"12A","D Major":"10B","D Minor":"7A","D# Major":"5B","D# Minor":"2A","E Major":"12B","E Minor":"9A","F Major":"7B","F Minor":"4A","F# Major":"2B","F# Minor":"11A","G Major":"9B","G Minor":"6A","G# Major":"4B","G# Minor":"1A","A Major":"11B","A Minor":"8A","A# Major":"6B","A# Minor":"3A","B Major":"1B","B Minor":"10A"},De={"1A":"#3ecfb8","1B":"#3abfaa","2A":"#5dd87c","2B":"#52cc6e","3A":"#a0d84a","3B":"#b4e040","4A":"#e8d03a","4B":"#f0c828","5A":"#f0a030","5B":"#e89020","6A":"#e86040","6B":"#e05038","7A":"#e84878","7B":"#d83868","8A":"#c840c8","8B":"#b830b8","9A":"#9040e0","9B":"#8030d0","10A":"#5060e8","10B":"#4050d8","11A":"#3898d8","11B":"#30a8e0","12A":"#30bce0","12B":"#30ccd4"},ot=[{value:"listen",label:"See + Listen"},{value:"view",label:"See Only"},{value:"edit",label:"See + Edit + Listen"}],X={date:!0,fileName:!0,bpm:!0,key:!0,playCount:!0,status:!0,moodTags:!0,contextBadges:!0},Tt=[{key:"date",label:"Track date",description:"Show the date tag in each track row"},{key:"fileName",label:"Source file name",description:"Show original file names in track rows"},{key:"bpm",label:"BPM tag",description:"Show BPM inline tags"},{key:"key",label:"Key + Camelot tag",description:"Show musical key and Camelot badge"},{key:"playCount",label:"Play count tag",description:"Show listen count tags"},{key:"status",label:"Status tag",description:"Show track status pill"},{key:"moodTags",label:"Mood tags",description:"Show mood chips below metadata"},{key:"contextBadges",label:"Context badges",description:"Show version, notes, lyrics, and todos badges"}],st="studio.uiSettings.v1",Bt={back:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"></path><path d="M9 12h11"></path></svg>',logout:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><path d="M16 17l5-5-5-5"></path><path d="M21 12H9"></path></svg>',shuffle:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 3h5v5"></path><path d="M4 20l6-6"></path><path d="M21 3l-7 7"></path><path d="M4 4l6 6"></path><path d="M14 14l7 7"></path><path d="M16 21h5v-5"></path></svg>',play:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"></path></svg>',pause:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="5" width="4" height="14" rx="1" fill="currentColor"></rect><rect x="13" y="5" width="4" height="14" rx="1" fill="currentColor"></rect></svg>',more:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="12" r="1.7" fill="currentColor"></circle><circle cx="12" cy="12" r="1.7" fill="currentColor"></circle><circle cx="18" cy="12" r="1.7" fill="currentColor"></circle></svg>',prev:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h2v14H6zM19 5l-9 7 9 7V5z" fill="currentColor"></path></svg>',next:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 5h2v14h-2zM5 5l9 7-9 7V5z" fill="currentColor"></path></svg>',close:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6L6 18"></path><path d="M6 6l12 12"></path></svg>',trash:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path></svg>',plus:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>',check:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5"></path></svg>',volume:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l5 4V6L8 10H4z" fill="currentColor"></path><path d="M16 9a5 5 0 0 1 0 6"></path><path d="M18.8 6.2a9 9 0 0 1 0 11.6"></path></svg>',mute:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l5 4V6L8 10H4z" fill="currentColor"></path><path d="M22 9l-6 6"></path><path d="M16 9l6 6"></path></svg>',queue:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M3 11h18"></path><path d="M3 16h10"></path><polygon points="17,13 22,16 17,19" fill="currentColor" stroke="none"></polygon></svg>',repeat:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2l4 4-4 4"></path><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><path d="M7 22l-4-4 4-4"></path><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>',repeatOne:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2l4 4-4 4"></path><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><path d="M7 22l-4-4 4-4"></path><path d="M21 13v2a4 4 0 0 1-4 4H3"></path><text x="12" y="15" text-anchor="middle" font-size="7" font-weight="bold" fill="currentColor" stroke="none">1</text></svg>',link:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',notes:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 3 14 8 19 8"></polyline><line x1="8" y1="13" x2="16" y2="13"></line><line x1="8" y1="17" x2="13" y2="17"></line></svg>',metadata:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"></path></svg>',settings:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 0-.33 1v.17a2 2 0 1 1-4 0V21a1.65 1.65 0 0 0-.33-1 1.65 1.65 0 0 0-1-.6 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 0-1-.33H2.83a2 2 0 1 1 0-4H3a1.65 1.65 0 0 0 1-.33 1.65 1.65 0 0 0 .6-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-.6 1.65 1.65 0 0 0 .33-1V2.83a2 2 0 1 1 4 0V3a1.65 1.65 0 0 0 .33 1 1.65 1.65 0 0 0 1 .6 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.1.31.1.65 0 1a1.65 1.65 0 0 0 .6 1 1.65 1.65 0 0 0 1 .33h.17a2 2 0 1 1 0 4H21a1.65 1.65 0 0 0-1 .33 1.65 1.65 0 0 0-.6 1z"></path></svg>',sort:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="6" y1="12" x2="18" y2="12"></line><line x1="9" y1="18" x2="15" y2="18"></line></svg>'},n={authenticated:!1,route:{type:"home"},projects:[],currentProject:null,sharedProject:null,player:{wavesurfer:null,queue:[],index:-1,track:null,autoplayOnReady:!1,volume:1,previousVolume:1,loop:"none",shuffle:!1},trackMenu:{trackId:null,notes:"",lyrics:"",todos:[],versions:[],activeVersionId:null,bpm:null,key:null,trackStatus:null,moodTags:[],listenCount:0,lufs:null,peakDb:null},metadataPanel:{colorPalette:[]},homeSort:{key:"updatedAt",dir:"desc"},settings:{trackTagVisibility:{...X},previousPath:"/"}};let Me=null,F=null,V=null;function w(e){return Bt[e]||""}function Ie(e,t,a){return Math.max(t,Math.min(a,e))}function p(e){return String(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#39;")}function ze(e){return String(e||"").replace(/\u00a0/g," ").replace(/\r/g,"").trim()}function Se(e){if(!Number.isFinite(e)||e<0)return"0:00";const t=Math.floor(e),a=Math.floor(t/60),o=String(t%60).padStart(2,"0");return`${a}:${o}`}function rt(e){if(!Number.isFinite(e)||e<=0)return"0m";const t=Math.max(0,Math.round(e)),a=Math.floor(t/3600),o=Math.floor(t%3600/60),s=t%60;return a>0?`${a}h ${String(o).padStart(2,"0")}m`:o>0?`${o}m ${String(s).padStart(2,"0")}s`:`${s}s`}function At(e){const t=Number(e);if(!Number.isFinite(t)||t<=0)return"-";const a=t/(1024*1024);if(a>=1)return`${a.toFixed(1)} MB`;const o=t/1024;return`${Math.max(1,Math.round(o))} KB`}function it(e){const t=String(e||"listen"),a=ot.find(o=>o.value===t);return a?a.label:"See + Listen"}function xt(e="listen"){return ot.map(t=>{const a=t.value===e?"selected":"";return`<option value="${p(t.value)}" ${a}>${p(t.label)}</option>`}).join("")}function ct(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleDateString(void 0,{month:"short",day:"numeric"})}function Le(e){const t=Math.random().toString(36).slice(2,9);return`${e}-${Date.now()}-${t}`}function ie(e,t){if(!e)return;const a=e.querySelector(".marquee-inner")||e;a.textContent=t,e.classList.remove("is-scrolling"),e.style.removeProperty("--marquee-offset"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{lt(e)})})}function lt(e){if(!e)return;const t=e.querySelector(".marquee-inner")||e;e.classList.remove("is-scrolling"),e.style.removeProperty("--marquee-offset");const a=t.scrollWidth-e.clientWidth;a>2&&(e.style.setProperty("--marquee-offset",`-${a}px`),e.classList.add("is-scrolling"))}function fe(e){return String(e||"").replace(/\r/g,"").trim().slice(0,220)}function Ce(e){if(typeof e=="string"){const o=fe(e);return o?{id:Le("todo"),text:o,done:!1}:null}if(!e||typeof e!="object")return null;const t=fe(e.text);return t?{id:String(e.id||"").trim().slice(0,80)||Le("todo"),text:t,done:!!e.done}:null}function Ne(e){return Array.isArray(e)?e.map(t=>Ce(t)).filter(t=>t!==null):typeof e=="string"?e.split(`
`).map(t=>Ce(t)).filter(t=>t!==null):[]}function ke(e){const t=e&&typeof e=="object"?e:{},a={};return Object.keys(X).forEach(o=>{a[o]=typeof t[o]=="boolean"?t[o]:X[o]}),a}function jt(){try{const e=window.localStorage.getItem(st);if(!e){n.settings.trackTagVisibility={...X};return}const t=JSON.parse(e);n.settings.trackTagVisibility=ke(t&&t.trackTagVisibility)}catch{n.settings.trackTagVisibility={...X}}}function Ke(){try{const e={trackTagVisibility:ke(n.settings.trackTagVisibility)};window.localStorage.setItem(st,JSON.stringify(e))}catch{}}function dt(e={}){const{delayMs:t=650,getSnapshot:a,saveSnapshot:o,onError:s}=e;let r=null,c=!1,i=!1,d=null;function h(){if(typeof a!="function")return null;const M=a();return M?{snapshot:M,key:JSON.stringify(M)}:null}async function f(){const M=h();if(!(!M||M.key===d)){if(c){i=!0;return}c=!0;try{await o(M.snapshot),d=M.key}catch(I){typeof s=="function"&&s(I)}finally{c=!1,i&&(i=!1,f())}}}function b(){r&&window.clearTimeout(r),r=window.setTimeout(()=>{r=null,f()},t)}async function y(){r&&(window.clearTimeout(r),r=null),await f()}function k(){const M=h();d=M?M.key:null}function E(M={}){const{flush:I=!1,fireAndForget:v=!1}=M;return r&&(window.clearTimeout(r),r=null),I?v?(f(),Promise.resolve()):f():Promise.resolve()}return k(),{schedule:b,flush:y,destroy:E,markCurrentAsSaved:k}}function B(){return n.route&&n.route.type==="share"}function G(){return B()?n.route.token:null}function C(){return B()?n.sharedProject:n.currentProject}function Pt(){const e=C();return(e&&e.artist?String(e.artist).trim():"")||"Unknown Artist"}function K(){const e=C();return e?B()?!!e.canEdit:!0:!1}function Ee(){const e=C();return e?B()?!!e.canListen:!0:!1}function _t(e){return!e||!Array.isArray(e.versions)||!e.versions.length?null:e.versions.find(t=>t.id===e.activeVersionId)||e.versions[0]}function ve(e){const t=C();return(t&&Array.isArray(t.tracks)?t.tracks:[]).find(o=>o.id===e)||null}function Dt(e){const t=[...e];for(let a=t.length-1;a>0;a-=1){const o=Math.floor(Math.random()*(a+1));[t[a],t[o]]=[t[o],t[a]]}return t}function g(e){pe&&(pe.textContent=e,pe.classList.remove("hidden"),Me&&window.clearTimeout(Me),Me=window.setTimeout(()=>{pe.classList.add("hidden")},2600))}function Q(e,t){!e||e.classList.contains("hidden")||(e.classList.add("is-closing"),window.setTimeout(()=>{e.classList.add("hidden"),e.classList.remove("is-closing")},200))}function ut(e){return new Promise(t=>{const a=document.getElementById("confirm-dialog"),o=document.getElementById("confirm-dialog-message"),s=document.getElementById("confirm-dialog-ok"),r=document.getElementById("confirm-dialog-cancel");o.textContent=e,a.classList.remove("hidden");function c(){Q(a),s.removeEventListener("click",i),r.removeEventListener("click",d)}function i(){c(),t(!0)}function d(){c(),t(!1)}s.addEventListener("click",i),r.addEventListener("click",d)})}async function S(e,t={}){const{method:a="GET",body:o,allowUnauthorized:s=!1}=t,r={method:a,credentials:"include",headers:{}};o instanceof FormData?r.body=o:o!==void 0&&(r.body=JSON.stringify(o),r.headers["Content-Type"]="application/json");const c=await fetch(e,r),d=(c.headers.get("content-type")||"").includes("application/json")?await c.json().catch(()=>({})):await c.text();if(!c.ok){if(c.status===401&&!s){const f=new Error("Authentication required");throw f.code="AUTH_REQUIRED",f}const h=new Error(d&&d.error?d.error:`Request failed (${c.status})`);throw h.code=c.status===401?"AUTH_REQUIRED":"REQUEST_FAILED",h}return d}function Nt(){const t=(window.location.pathname.replace(/\/+$/,"")||"/").split("/").filter(Boolean);return t[0]==="settings"?{type:"settings"}:t[0]==="share"&&t[1]?{type:"share",token:decodeURIComponent(t[1])}:t[0]==="project"&&t[1]?{type:"project",projectId:decodeURIComponent(t[1])}:{type:"home"}}function D(e){const t=window.location.pathname.replace(/\/+$/,"")||"/";e==="/settings"&&t!=="/settings"&&(n.settings.previousPath=t),window.location.pathname!==e&&window.history.pushState({},"",e),be()}function Ut(e){return{id:e.id,title:e.title,artist:e.artist,description:e.description,status:e.status,coverUrl:e.coverUrl,trackCount:Array.isArray(e.tracks)?e.tracks.length:0,totalRuntimeSeconds:Number(e.totalRuntimeSeconds)||0,shareUrl:e.shareUrl,shareLinks:Array.isArray(e.shareLinks)?e.shareLinks:[],completionPercent:e.completionPercent||0,starRating:e.starRating||0,startDate:e.startDate||null,releaseDate:e.releaseDate||null,createdAt:e.createdAt,updatedAt:e.updatedAt}}function Ue(e){const t=Ut(e),a=n.projects.findIndex(o=>o.id===t.id);if(a>=0){n.projects.splice(a,1,t);return}n.projects.unshift(t)}function Rt(e){n.projects=n.projects.filter(t=>t.id!==e)}async function Ge(e){if(e)try{await navigator.clipboard.writeText(e),g("Share link copied");return}catch{const a=document.createElement("input");a.value=e,document.body.appendChild(a),a.select(),document.execCommand("copy"),document.body.removeChild(a),g("Share link copied")}}function Y(e,t=!1){L.innerHTML=`
    <section class="view">
      <div class="empty-state">
        <h2>Studio</h2>
        <p>${p(e||"Something went wrong")}</p>
        ${t?'<button id="error-home-button" class="primary-button" type="button">Back Home</button>':""}
      </div>
    </section>
  `;const a=document.getElementById("error-home-button");a&&a.addEventListener("click",()=>D("/"))}function ne(){if(!n.player.wavesurfer||!he)return;const e=n.player.wavesurfer.isPlaying();he.innerHTML=w(e?"pause":"play"),q&&q.classList.toggle("is-playing",e)}function pt(e){se&&(se.value=String(e)),H&&(H.innerHTML=e>0?w("volume"):w("mute"))}function We(){if(!P)return;const e=n.player.loop;e==="one"?(P.innerHTML=w("repeatOne"),P.classList.add("is-active"),P.title="Loop: one"):e==="all"?(P.innerHTML=w("repeat"),P.classList.add("is-active"),P.title="Loop: all"):(P.innerHTML=w("repeat"),P.classList.remove("is-active"),P.title="Loop: off")}function Qe(){Z&&(Z.classList.toggle("is-active",n.player.shuffle),Z.title=n.player.shuffle?"Shuffle: on":"Shuffle: off")}function qt(){if(!ue)return;const e=n.player.queue||[];if(!e.length){ue.innerHTML='<p class="player-queue-empty">No tracks in queue</p>';return}ue.innerHTML=e.map((t,a)=>`
    <button class="player-queue-item${a===n.player.index?" is-active":""}" type="button" data-queue-index="${a}">
      <span class="player-queue-num">${a+1}</span>
      <span class="player-queue-name">${p(t.title||t.originalName||"Untitled")}</span>
    </button>
  `).join(""),ue.querySelectorAll("[data-queue-index]").forEach(t=>{t.addEventListener("click",()=>{const a=parseInt(t.dataset.queueIndex,10);ce(a),Te()})})}function Te(){O&&(O.classList.remove("is-open"),O.setAttribute("aria-hidden","true"))}function ae(e){const t=Ie(Number(e),0,1);n.player.volume=t,t>0&&(n.player.previousVolume=t),n.player.wavesurfer&&n.player.wavesurfer.setVolume(t),pt(t)}function Ht(){if(!q)return;const e=n.route.type==="share"?n.sharedProject:n.currentProject;if(Fe&&ie(Fe,e&&e.title?e.title:""),e&&e.coverUrl){q.style.backgroundImage=`url("${e.coverUrl}?v=${e.activeCoverId||""}")`,q.classList.add("has-image"),q.textContent="";return}q.style.backgroundImage="",q.classList.remove("has-image");const t=e&&e.title?String(e.title).charAt(0).toUpperCase():"S";q.textContent=t}function ee(){const e=n.player.track?n.player.track.id:null,t=!!(n.player.wavesurfer&&n.player.wavesurfer.isPlaying());L.querySelectorAll(".track-row[data-track-id]").forEach(s=>{const r=!!(e&&s.dataset.trackId===e);s.classList.toggle("is-active",r);const c=s.querySelector(".track-play-button");c&&(c.innerHTML=w(r&&t?"pause":"play"),c.title=r&&t?"Pause track":"Play track")});const o=document.getElementById("play-all-button");if(o){const s=C()&&C().tracks||[],r=!!(e&&s.some(c=>c.id===e));o.innerHTML=w(r&&t?"pause":"play"),o.title=r&&t?"Pause":"Play from start"}}function ce(e){const t=n.player.queue||[];if(!t.length)return;let a=e;a<0&&(a=t.length-1),a>=t.length&&(a=0);const o=t[a];z(o,t,a)}function Ye(){const e=n.player.queue||[];if(n.player.shuffle&&e.length>1){let t;do t=Math.floor(Math.random()*e.length);while(t===n.player.index);ce(t)}else ce(n.player.index+1)}function Ot(){if(!n.player.track)return;if((n.player.wavesurfer?n.player.wavesurfer.getCurrentTime():0)<2){if(n.player.index<=0){n.player.wavesurfer&&n.player.wavesurfer.pause();return}ce(n.player.index-1);return}n.player.wavesurfer&&n.player.wavesurfer.seekTo(0)}function Je(){const e=n.player.queue||[];if(!e.length)return;let t=-1;if(n.player.shuffle&&e.length>1)t=(n.player.index+1)%e.length;else if(t=n.player.index+1,t>=e.length)if(n.player.loop==="all")t=0;else return;const a=e[t];!a||!a.audioUrl||ye.src!==a.audioUrl&&(ye.src=a.audioUrl,ye.load())}function z(e,t,a){if(!n.player.wavesurfer||!e){g("Waveform player is unavailable");return}if(!e.audioUrl){g("This link cannot play audio");return}if(n.player.track&&n.player.track.id===e.id&&n.player.track.audioUrl===e.audioUrl){n.player.wavesurfer.playPause();return}n.player.queue=t,n.player.index=a,n.player.track=e,n.player.autoplayOnReady=!0,e.id&&C()&&Ft(e.id);const o=e.title||e.originalName||"Untitled Track";document.title=o+" — Studio",ie(et,o),ie(tt,Pt()),je.textContent="0:00",Pe.textContent="0:00",Ht();const s=W.classList.contains("hidden");W.classList.remove("hidden"),s&&(W.classList.add("player-entering"),window.setTimeout(()=>W.classList.remove("player-entering"),360)),n.player.wavesurfer.load(e.audioUrl),ee(),ne()}function Vt(){if(!window.WaveSurfer||!He){g("Could not initialize waveform renderer");return}const e=document.createElement("audio");e.preload="auto",n.player.wavesurfer=WaveSurfer.create({container:He,media:e,waveColor:"rgba(255, 255, 255, 0.18)",progressColor:"#A89EFF",cursorColor:"#d9d4ff",barWidth:1.2,barGap:1.2,barRadius:2,height:30,normalize:!0,hideScrollbar:!0}),e.addEventListener("canplay",()=>{n.player.autoplayOnReady&&(n.player.autoplayOnReady=!1,e.volume=Ie(n.player.volume,0,1),e.play().catch(()=>{}),ne(),Je())}),Oe.innerHTML=w("prev"),Ve.innerHTML=w("next"),he.innerHTML=w("play"),pt(n.player.volume);const t=s=>{je.textContent=Se(s)};n.player.wavesurfer.on("ready",()=>{var s,r;Pe.textContent=Se(n.player.wavesurfer.getDuration()),n.player.autoplayOnReady&&(n.player.autoplayOnReady=!1,(r=(s=n.player.wavesurfer.play()).catch)==null||r.call(s,()=>{}),Je()),ae(n.player.volume),ne()}),n.player.wavesurfer.on("audioprocess",()=>{t(n.player.wavesurfer.getCurrentTime())}),n.player.wavesurfer.on("timeupdate",s=>{t(s)}),n.player.wavesurfer.on("interaction",()=>{t(n.player.wavesurfer.getCurrentTime())}),n.player.wavesurfer.on("play",()=>{ne(),ee()}),n.player.wavesurfer.on("pause",()=>{ne(),ee()}),n.player.wavesurfer.on("finish",()=>{const s=n.player.loop;if(s==="one")n.player.wavesurfer.seekTo(0),n.player.wavesurfer.play();else if(s==="all")Ye();else{const r=n.player.index+1;r<(n.player.queue||[]).length&&ce(r)}}),n.player.wavesurfer.on("error",()=>{g("Could not load track")}),he.addEventListener("click",()=>{if(!n.player.track){const s=n.player.queue||[];s.length&&z(s[0],s,0);return}n.player.wavesurfer.playPause()}),Oe.addEventListener("click",Ot),Ve.addEventListener("click",Ye),se&&se.addEventListener("input",()=>{ae(se.value)});const a=H?H.nextElementSibling:null;H&&H.addEventListener("click",()=>{if(window.matchMedia("(pointer: coarse)").matches){a&&a.classList.toggle("is-open");return}if(n.player.volume<=.001){ae(n.player.previousVolume||.85);return}n.player.previousVolume=n.player.volume,ae(0)});const o=H?H.closest(".player-volume"):null;o&&o.addEventListener("wheel",s=>{s.preventDefault();const r=s.deltaY<0?.05:-.05;ae(Ie(n.player.volume+r,0,1))},{passive:!1}),document.addEventListener("click",s=>{a&&a.classList.contains("is-open")&&!a.contains(s.target)&&s.target!==H&&a.classList.remove("is-open")}),Z&&(Z.innerHTML=w("shuffle"),Qe(),Z.addEventListener("click",()=>{n.player.shuffle=!n.player.shuffle,Qe()})),P&&(We(),P.addEventListener("click",()=>{const s=["none","all","one"],r=s.indexOf(n.player.loop);n.player.loop=s[(r+1)%s.length],We()})),de&&(de.innerHTML=w("queue"),de.addEventListener("click",()=>{O.classList.contains("is-open")?Te():(qt(),O.classList.add("is-open"),O.setAttribute("aria-hidden","false"))})),document.addEventListener("click",s=>{O&&O.classList.contains("is-open")&&!O.contains(s.target)&&s.target!==de&&Te()})}async function Ft(e){try{const t=B()?`/api/share/${encodeURIComponent(G())}/tracks/${encodeURIComponent(e)}/play`:`/api/projects/${encodeURIComponent(C().id)}/tracks/${encodeURIComponent(e)}/play`,a=await S(t,{method:"POST"}),o=C();if(o&&Array.isArray(o.tracks)){const s=o.tracks.find(r=>r.id===e);s&&(s.listenCount=a.listenCount)}if(n.trackMenu.trackId===e){n.trackMenu.listenCount=a.listenCount;const s=document.getElementById("track-listen-count");s&&(s.textContent=`Played ${a.listenCount} time${a.listenCount!==1?"s":""}`)}}catch{}}function zt(e,t){const a=Math.max(1,Math.round(t/11025)),o=Math.floor(e.length/a),s=t/a,r=new Float32Array(o);for(let v=0;v<o;v++)r[v]=e[v*a];const c=Math.max(1,Math.round(s/44)),i=Math.floor(o/c);if(i<4)return null;const d=new Float32Array(i);for(let v=0;v<i;v++){let l=0;for(let u=0;u<c;u++){const m=r[v*c+u]||0;l+=m*m}d[v]=l/c}const h=new Float32Array(i);for(let v=1;v<i;v++)h[v]=Math.max(0,d[v]-d[v-1]);const f=s/c,b=Math.max(1,Math.round(f*60/200)),y=Math.round(f*60/50),k=i;let E=b,M=-1/0;for(let v=b;v<=y;v++){let l=0;for(let u=0;u<k-v;u++)l+=h[u]*h[u+v];l>M&&(M=l,E=v)}let I=Math.round(60*f/E);for(;I>180;)I=Math.round(I/2);for(;I<60;)I=Math.round(I*2);return I}function Kt(e,t){const a=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],o=new Float32Array(12),s=Math.min(e.length,t*30),r=8192;for(let y=0;y<12;y++)for(let k=2;k<=5;k++){const E=36+y+(k-2)*12,M=440*Math.pow(2,(E-69)/12);if(M>=t/2||M<20)continue;const I=2*Math.cos(2*Math.PI*M/t);let v=0,l=0;for(let u=0;u+r<=s;u+=r){let m=0,$=0;for(let A=0;A<r;A++){const R=e[u+A]+I*m-$;$=m,m=R}v+=m*m+$*$-I*m*$,l++}o[y]+=l>0?v/l:0}const c=Math.max(...o);if(c>0)for(let y=0;y<12;y++)o[y]/=c;const i=[6.35,2.23,3.48,2.33,4.38,4.09,2.52,5.19,2.39,3.66,2.29,2.88],d=[6.33,2.68,3.52,5.38,2.6,3.53,2.54,4.75,3.98,2.69,3.34,3.17];function h(y,k){let E=0,M=0;for(let u=0;u<12;u++)E+=o[u],M+=y[(u+k)%12];E/=12,M/=12;let I=0,v=0,l=0;for(let u=0;u<12;u++){const m=o[u]-E,$=y[(u+k)%12]-M;I+=m*$,v+=m*m,l+=$*$}return v*l>0?I/Math.sqrt(v*l):0}let f=null,b=-1/0;for(let y=0;y<12;y++){const k=h(i,y),E=h(d,y);k>b&&(b=k,f=a[y]+" Major"),E>b&&(b=E,f=a[y]+" Minor")}return f}async function mt(e){const t=await fetch(e,{credentials:"include"});if(!t.ok)throw new Error("Could not fetch audio file for analysis");const a=await t.arrayBuffer(),o=new(window.AudioContext||window.webkitAudioContext);let s;try{s=await new Promise((E,M)=>{o.decodeAudioData(a,E,M)})}finally{o.close()}const r=s.numberOfChannels,c=s.length,i=new Float32Array(c);let d=0,h=0;for(let E=0;E<r;E++){const M=s.getChannelData(E);let I=0;for(let v=0;v<c;v++){const l=M[v];i[v]+=l;const u=l<0?-l:l;u>h&&(h=u),I+=l*l}d+=I/c}for(let E=0;E<c;E++)i[E]/=r;const f=d>0?Math.round((-.691+10*Math.log10(d))*10)/10:null,b=h>0?Math.round(20*Math.log10(h)*10)/10:null,y=zt(i,s.sampleRate),k=Kt(i,s.sampleRate);return{lufs:f,peakDb:b,bpm:y,key:k}}async function Gt(e,t){if(n.trackMenu.trackId!==e)return;const a=document.getElementById("track-lufs-analyze");a&&(a.disabled=!0,a.textContent="Detecting…");try{const o=await mt(t);if(n.trackMenu.trackId!==e)return;n.trackMenu.lufs=o.lufs,n.trackMenu.peakDb=o.peakDb,n.trackMenu.bpm===null&&(n.trackMenu.bpm=o.bpm),n.trackMenu.key===null&&(n.trackMenu.key=o.key),Re(),_()}catch{}finally{if(n.trackMenu.trackId===e){const o=document.getElementById("track-lufs-analyze");o&&(o.disabled=!1),qe()}}}async function Wt(){const e=await S("/api/projects");n.projects=e.projects||[]}async function Qt(e){const t=await S(`/api/projects/${encodeURIComponent(e)}`);n.currentProject=t.project,Ue(t.project)}function N(e){B()&&(n.sharedProject=e),n.currentProject=e,Ue(e)}async function oe(e){const t=C();if(!t)return;const a=B()?`/api/share/${encodeURIComponent(G())}/project`:`/api/projects/${encodeURIComponent(t.id)}`,o=await S(a,{method:"PATCH",body:e});N(o.project)}async function yt(e,t,a){const o=B()?`/api/share/${encodeURIComponent(G())}/tracks/${encodeURIComponent(t)}`:`/api/projects/${encodeURIComponent(e)}/tracks/${encodeURIComponent(t)}`,s=await S(o,{method:"PATCH",body:a});N(s.project)}function ht(){if(!n.trackMenu.trackId)return null;const e=document.getElementById("track-menu-notes"),t=document.getElementById("track-menu-lyrics"),a=document.getElementById("track-bpm-input"),o=document.getElementById("track-key-select"),s=document.getElementById("track-status-select"),r=String(e?e.value:n.trackMenu.notes).slice(0,4e3),c=String(t?t.value:n.trackMenu.lyrics).slice(0,12e3),i=a?a.value!==""?Number(a.value):null:n.trackMenu.bpm,d=o?o.value||null:n.trackMenu.key,h=s?s.value||null:n.trackMenu.trackStatus,f=(n.trackMenu.todos||[]).map(b=>Ce(b)).filter(b=>b!==null);return{trackId:n.trackMenu.trackId,notes:r,lyrics:c,todos:f,bpm:i,key:d,trackStatus:h,moodTags:[...n.trackMenu.moodTags||[]],lufs:n.trackMenu.lufs,peakDb:n.trackMenu.peakDb}}async function ft(e,t){!t||!t.trackId||await yt(e,t.trackId,{notes:t.notes,lyrics:t.lyrics,todos:t.todos,bpm:t.bpm,key:t.key,trackStatus:t.trackStatus,moodTags:t.moodTags,lufs:t.lufs,peakDb:t.peakDb})}function Yt(e){te({flush:!0,fireAndForget:!0}),F=dt({delayMs:700,getSnapshot:ht,saveSnapshot:async t=>{await ft(e,t)},onError:t=>{g(t.message||"Could not autosave track details")}})}function _(){F&&F.schedule()}function te(e={}){if(!F)return Promise.resolve();const t=F;return F=null,t.destroy(e)}function Jt(){var i,d,h,f,b,y;const e=((i=document.getElementById("meta-start-date-btn"))==null?void 0:i.dataset.value)||"",t=((d=document.getElementById("meta-release-date-btn"))==null?void 0:d.dataset.value)||"",a=Math.max(0,Math.min(100,Math.round(Number(((h=document.getElementById("meta-completion-range"))==null?void 0:h.value)||0)))),o=Number((f=document.getElementById("meta-star-rating"))==null?void 0:f.dataset.rating)||0,s=String(((b=document.getElementById("meta-presave-link"))==null?void 0:b.value)||"").trim(),r=String(((y=document.getElementById("meta-distributor-notes"))==null?void 0:y.value)||""),c={};return L.querySelectorAll(".stream-checkbox").forEach(k=>{c[k.dataset.platform]=k.checked}),{startDate:e||null,releaseDate:t||null,completionPercent:a,starRating:o,colorPalette:[...n.metadataPanel.colorPalette],streamingChecklist:c,preSaveLink:s,distributorNotes:r}}function Xt(){le({flush:!1}),V=dt({delayMs:700,getSnapshot:Jt,saveSnapshot:async e=>{await oe(e)},onError:e=>{g(e.message||"Could not autosave metadata")}})}function U(){V&&V.schedule()}function le(e={}){if(!V)return Promise.resolve();const t=V;return V=null,t.destroy(e)}async function Zt(e,t,a){const o=new FormData;o.append("track",a);const s=B()?`/api/share/${encodeURIComponent(G())}/tracks/${encodeURIComponent(t)}/versions`:`/api/projects/${encodeURIComponent(e)}/tracks/${encodeURIComponent(t)}/versions`,r=await S(s,{method:"POST",body:o});N(r.project)}async function ea(e,t,a){const o=B()?`/api/share/${encodeURIComponent(G())}/tracks/${encodeURIComponent(t)}/versions/${encodeURIComponent(a)}/select`:`/api/projects/${encodeURIComponent(e)}/tracks/${encodeURIComponent(t)}/versions/${encodeURIComponent(a)}/select`,s=await S(o,{method:"POST"});N(s.project)}async function ta(e,t){const a=`/api/projects/${encodeURIComponent(e)}/covers/${encodeURIComponent(t)}`,o=await S(a,{method:"DELETE"});N(o.project)}async function aa(e,t){const a=new FormData;a.append("cover",t);const o=B()?`/api/share/${encodeURIComponent(G())}/cover`:`/api/projects/${encodeURIComponent(e)}/cover`,s=await S(o,{method:"POST",body:a});N(s.project)}async function na(e,t){const a=B()?`/api/share/${encodeURIComponent(G())}/covers/${encodeURIComponent(t)}/select`:`/api/projects/${encodeURIComponent(e)}/covers/${encodeURIComponent(t)}/select`,o=await S(a,{method:"POST"});N(o.project)}function Be(e={}){const{flushAutosave:t=!0}=e;te(t?{flush:!0,fireAndForget:!0}:{flush:!1});const a=document.getElementById("track-menu-overlay");a&&(Q(a),a.setAttribute("aria-hidden","true")),n.trackMenu={trackId:null,notes:"",lyrics:"",todos:[],versions:[],activeVersionId:null,bpm:null,key:null,trackStatus:null,moodTags:[],listenCount:0,lufs:null,peakDb:null}}function ge(){const e=document.getElementById("track-todo-list");if(!e)return;const t=K(),a=n.trackMenu.todos||[];if(!a.length){e.innerHTML='<p class="todo-empty">No todos yet.</p>';return}e.innerHTML=a.map((o,s)=>`
        <div class="todo-row ${o.done?"done":""}" data-todo-row="${s}">
          <label class="todo-toggle" aria-label="Toggle todo">
            <input type="checkbox" data-todo-toggle="${s}" ${o.done?"checked":""} ${t?"":"disabled"} />
            <span>${w("check")}</span>
          </label>
          <input
            class="todo-text-input"
            type="text"
            value="${p(o.text)}"
            maxlength="220"
            data-todo-text="${s}"
            ${t?"":"disabled"}
          />
          <button
            class="icon-button todo-remove-button"
            type="button"
            aria-label="Remove todo"
            data-todo-remove="${s}"
            ${t?"":"disabled"}
          >${w("close")}</button>
        </div>
      `).join(""),t&&(e.querySelectorAll("[data-todo-toggle]").forEach(o=>{o.addEventListener("change",()=>{const s=Number.parseInt(o.dataset.todoToggle,10);!Number.isFinite(s)||!n.trackMenu.todos[s]||(n.trackMenu.todos[s].done=o.checked,ge(),_())})}),e.querySelectorAll("[data-todo-text]").forEach(o=>{o.addEventListener("input",()=>{const s=Number.parseInt(o.dataset.todoText,10);!Number.isFinite(s)||!n.trackMenu.todos[s]||(n.trackMenu.todos[s].text=fe(o.value),_())})}),e.querySelectorAll("[data-todo-remove]").forEach(o=>{o.addEventListener("click",()=>{const s=Number.parseInt(o.dataset.todoRemove,10);Number.isFinite(s)&&(n.trackMenu.todos.splice(s,1),ge(),_())})}))}function oa(){const e=document.getElementById("track-version-list");if(!e)return;const t=K(),a=Array.isArray(n.trackMenu.versions)?n.trackMenu.versions:[];if(!a.length){e.innerHTML='<p class="todo-empty">No versions yet.</p>';return}e.innerHTML=a.map(o=>{const s=o.id===n.trackMenu.activeVersionId,r=[];return Number.isFinite(o.durationSeconds)&&r.push(Se(o.durationSeconds)),Number.isFinite(o.sizeBytes)&&r.push(At(o.sizeBytes)),`
        <div class="version-row ${s?"active":""}" data-version-row="${p(o.id)}">
          <div class="version-main">
            <div class="version-title">${p(o.originalName||"Untitled version")}</div>
            <div class="version-meta">${p(r.join(" • ")||"No metadata")}</div>
          </div>
          <button class="secondary-button version-use-button" type="button" data-version-select="${p(o.id)}" ${t?"":"disabled"}>${s?"Active":"Use"}</button>
        </div>
      `}).join(""),t&&e.querySelectorAll("[data-version-select]").forEach(o=>{o.addEventListener("click",async()=>{const s=o.dataset.versionSelect;if(!s||!n.trackMenu.trackId)return;const r=C();if(r)try{await ea(r.id,n.trackMenu.trackId,s);const c=ve(n.trackMenu.trackId);if(c&&(n.trackMenu.versions=Array.isArray(c.versions)?[...c.versions]:[],n.trackMenu.activeVersionId=c.activeVersionId||null),n.player.track&&n.player.track.id===n.trackMenu.trackId&&c){const i=C()&&C().tracks||[],d=i.findIndex(h=>h.id===c.id);d>=0&&z(i[d],i,d)}j(),Ae(n.trackMenu.trackId),g("Switched track version")}catch(c){g(c.message||"Could not switch version")}})})}function Xe(){const e=document.getElementById("track-todo-input");if(!e)return;const t=fe(e.value);t&&(n.trackMenu.todos.push({id:Le("todo"),text:t,done:!1}),e.value="",ge(),_())}function Ae(e){te({flush:!0,fireAndForget:!0});const t=ve(e);if(!t)return;n.trackMenu.trackId=t.id,n.trackMenu.notes=String(t.notes||""),n.trackMenu.lyrics=String(t.lyrics||""),n.trackMenu.todos=Ne(t.todos),n.trackMenu.versions=Array.isArray(t.versions)?[...t.versions]:[],n.trackMenu.activeVersionId=t.activeVersionId||null,n.trackMenu.bpm=t.bpm??null,n.trackMenu.key=t.key||null,n.trackMenu.trackStatus=t.trackStatus||null,n.trackMenu.moodTags=Array.isArray(t.moodTags)?[...t.moodTags]:[],n.trackMenu.listenCount=t.listenCount||0,n.trackMenu.lufs=t.lufs??null,n.trackMenu.peakDb=t.peakDb??null;const a=document.getElementById("track-menu-title"),o=document.getElementById("track-menu-subtitle"),s=document.getElementById("track-menu-notes"),r=document.getElementById("track-menu-lyrics"),c=document.getElementById("track-todo-input"),i=document.getElementById("track-menu-overlay");if(!i||!a||!o||!s||!r)return;const d=[];t.trackNumber!==null&&t.trackNumber!==void 0&&t.trackNumber!==""&&d.push(`Track ${t.trackNumber}`),t.originalName&&d.push(t.originalName),t.versionCount>1&&d.push(`${t.versionCount} versions`),a.textContent=t.title||t.originalName||"Untitled track",o.textContent=d.join(" | "),s.value=n.trackMenu.notes,r.value=n.trackMenu.lyrics,c&&(c.value=""),i.classList.remove("hidden","is-closing"),i.setAttribute("aria-hidden","false"),ge(),oa(),Re();const h=C();K()&&h&&h.id&&Yt(h.id),K()&&t.audioUrl&&t.bpm===null&&t.key===null&&t.lufs===null&&setTimeout(()=>Gt(t.id,t.audioUrl),300)}async function sa(e){const t=ht();t&&(await ft(e,t),F&&F.markCurrentAsSaved(),g("Track details saved"))}async function ra(e){if(!n.trackMenu.trackId||!await ut("Delete this track from the project?"))return;const t=B()?`/api/share/${encodeURIComponent(G())}/tracks/${encodeURIComponent(n.trackMenu.trackId)}`:`/api/projects/${encodeURIComponent(e)}/tracks/${encodeURIComponent(n.trackMenu.trackId)}`,a=await S(t,{method:"DELETE"});N(a.project),Be({flushAutosave:!1}),j()}function Re(){const e=K(),t=document.getElementById("track-bpm-input");t&&(t.value=n.trackMenu.bpm!==null?String(n.trackMenu.bpm):"",t.disabled=!e);const a=document.getElementById("track-key-select");a&&(a.value=n.trackMenu.key||"",a.disabled=!e,gt(a));const o=document.getElementById("track-camelot-badge");if(o){const i=n.trackMenu.key?_e[n.trackMenu.key]:null,d=i?De[i]||"#888":null;i&&d?(o.textContent=i,o.style.cssText=`background:${d}26;color:${d};border-color:${d}55`,o.hidden=!1):(o.textContent="",o.style.cssText="",o.hidden=!0)}const s=document.getElementById("track-status-select");s&&(s.value=n.trackMenu.trackStatus||"",s.disabled=!e,vt(s));const r=document.getElementById("track-mood-tags");r&&bt(r,e,()=>{_()});const c=document.getElementById("track-listen-count");if(c){const i=n.trackMenu.listenCount||0;c.textContent=`Played ${i} time${i!==1?"s":""}`}qe()}function vt(e){if(!e)return;const t=e.value,a=t&&at[t]||"";e.style.borderColor=a?a+"88":"",e.style.color=a||"",e.style.boxShadow=a?`0 0 0 1px ${a}44`:""}function gt(e){e&&e.classList.toggle("is-empty",!e.value)}function ia(e){if(!e)return"";const t=_e[e];if(!t)return"";const a=De[t]||"#888";return`<span class="camelot-badge" style="background:${a}26;color:${a};border-color:${a}55">${p(t)}</span>`}function bt(e,t,a){const o=n.trackMenu.moodTags||[];e.innerHTML=Lt.map(s=>{const r=o.includes(s),c=nt[s]||"#555",i=r?`background:${c}33;border-color:${c};color:${c}`:"";return`<button
      class="mood-chip${r?" active":""}"
      type="button"
      data-mood="${p(s)}"
      style="${i}"
      ${t?"":"disabled"}
    >${p(s)}</button>`}).join(""),t&&e.querySelectorAll("[data-mood]").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.mood,c=n.trackMenu.moodTags.indexOf(r);c>=0?n.trackMenu.moodTags.splice(c,1):n.trackMenu.moodTags.push(r),bt(e,t,a),typeof a=="function"&&a()})})}function qe(){const e=document.getElementById("track-lufs-display"),t=document.getElementById("track-lufs-analyze");if(!e)return;const a=n.trackMenu.lufs,o=n.trackMenu.peakDb;a!==null||o!==null?e.innerHTML=[a!==null?`<span class="lufs-value"><span class="lufs-label">LUFS</span> ${a} dBFS</span>`:"",o!==null?`<span class="lufs-value"><span class="lufs-label">Peak</span> ${o} dBFS</span>`:""].filter(Boolean).join(""):e.innerHTML='<span class="lufs-empty">Not analyzed</span>',t&&(t.textContent=a!==null?"Re-analyze":"Analyze")}function ca(e,t={}){const{canEdit:a=!1}=t,o=document.getElementById("track-menu-overlay"),s=document.getElementById("track-menu-close"),r=document.getElementById("track-menu-save"),c=document.getElementById("track-menu-delete"),i=document.getElementById("track-menu-play"),d=document.getElementById("track-todo-add"),h=document.getElementById("track-todo-input"),f=document.getElementById("track-menu-notes"),b=document.getElementById("track-menu-lyrics"),y=document.getElementById("track-version-add"),k=document.getElementById("track-version-input");L.querySelectorAll("[data-track-menu]").forEach(l=>{l.addEventListener("click",()=>{Ae(l.dataset.trackMenu)})}),o&&o.addEventListener("click",l=>{l.target===o&&Be()}),s&&s.addEventListener("click",()=>{Be()}),r&&r.addEventListener("click",async()=>{if(a)try{await sa(e)}catch(l){g(l.message||"Could not save track details")}}),c&&c.addEventListener("click",async()=>{if(a)try{await ra(e)}catch(l){g(l.message||"Could not delete track")}}),i&&i.addEventListener("click",()=>{if(!n.trackMenu.trackId)return;if(!Ee()){g("This share link cannot play audio");return}const l=C(),u=l&&l.tracks||[],m=u.findIndex($=>$.id===n.trackMenu.trackId);m<0||z(u[m],u,m)}),d&&d.addEventListener("click",()=>{a&&Xe()}),h&&h.addEventListener("keydown",l=>{a&&l.key==="Enter"&&(l.preventDefault(),Xe())}),f&&a&&f.addEventListener("input",()=>{n.trackMenu.notes=String(f.value||"").slice(0,4e3),_()}),b&&a&&b.addEventListener("input",()=>{n.trackMenu.lyrics=String(b.value||"").slice(0,12e3),_()}),y&&k&&(y.addEventListener("click",()=>{!a||!n.trackMenu.trackId||k.click()}),k.addEventListener("change",async()=>{if(!a||!n.trackMenu.trackId)return;const l=k.files&&k.files[0];if(l)try{await Zt(e,n.trackMenu.trackId,l);const u=ve(n.trackMenu.trackId);u&&(n.trackMenu.versions=Array.isArray(u.versions)?[...u.versions]:[],n.trackMenu.activeVersionId=u.activeVersionId||null),k.value="",j(),Ae(n.trackMenu.trackId),g("Track version uploaded")}catch(u){g(u.message||"Could not upload version")}}));const E=document.getElementById("track-lufs-analyze");E&&E.addEventListener("click",async()=>{const l=ve(n.trackMenu.trackId);if(!l||!l.audioUrl){g("No audio file available to analyze");return}const u=n.trackMenu.trackId;E.disabled=!0,E.textContent="Analyzing…";try{const m=await mt(l.audioUrl);if(n.trackMenu.trackId!==u)return;n.trackMenu.lufs=m.lufs,n.trackMenu.peakDb=m.peakDb,n.trackMenu.bpm=m.bpm??n.trackMenu.bpm,n.trackMenu.key=m.key??n.trackMenu.key,Re(),_(),g("Audio analysis complete")}catch(m){g(m.message||"Analysis failed")}finally{if(n.trackMenu.trackId!==u)return;const m=document.getElementById("track-lufs-analyze");m&&(m.disabled=!1),qe()}});const M=document.getElementById("track-bpm-input");M&&a&&M.addEventListener("input",()=>{n.trackMenu.bpm=M.value===""?null:Number(M.value),_()});const I=document.getElementById("track-status-select");I&&a&&I.addEventListener("change",()=>{n.trackMenu.trackStatus=I.value||null,vt(I),_()});const v=document.getElementById("track-key-select");v&&a&&v.addEventListener("change",()=>{n.trackMenu.key=v.value||null,gt(v);const l=document.getElementById("track-camelot-badge");if(!l)return;const u=v.value?_e[v.value]:null,m=u?De[u]||"#888":null;u&&m?(l.textContent=u,l.style.cssText=`background:${m}26;color:${m};border-color:${m}55`,l.hidden=!1):(l.textContent="",l.style.cssText="",l.hidden=!0),_()})}function me(e,t,a={}){if(!e)return;const{singleLine:o=!1}=a;e.addEventListener("focus",()=>{e.dataset.beforeEdit=ze(e.innerText)}),o&&e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),e.blur())}),e.addEventListener("blur",async()=>{const s=e.dataset.beforeEdit||"",r=ze(e.innerText);if(s!==r)try{await t(r),j()}catch(c){g(c.message||"Failed to save changes"),e.innerText=s}})}function la(e){return e.coverUrl?`<img src="${p(e.coverUrl)}" alt="Cover image" loading="lazy" />`:""}function da(e){const t=Math.max(0,Math.min(5,Math.round(e)));return Array.from({length:5},(a,o)=>`<span class="card-star${o<t?" filled":""}" aria-hidden="true">★</span>`).join("")}function xe(e){if(!e)return"";const t=new Date;t.setHours(0,0,0,0);const o=new Date(e+"T00:00:00")-t,s=Math.ceil(o/(1e3*60*60*24));if(s<0)return`<span class="countdown-overdue">${Math.abs(s)} days overdue</span>`;if(s===0)return'<span class="countdown-red">Release day!</span>';let r;return s>30?r="countdown-green":s>7?r="countdown-yellow":r="countdown-red",`<span class="${r}">${s} day${s!==1?"s":""} remaining</span>`}function ua(e){return!Array.isArray(e)||!e.length?"":e.map(t=>`<span class="project-palette-swatch" style="background:${p(t)}" title="${p(t)}"></span>`).join("")}const pa=["January","February","March","April","May","June","July","August","September","October","November","December"],ma=["Su","Mo","Tu","We","Th","Fr","Sa"],x=class x{static open(t,a,o,s={}){x.close();const r=new x(t,a,o,s);x._instance=r,r._mount()}static close(){x._instance&&(x._instance._destroy(),x._instance=null)}constructor(t,a,o,s){this._anchor=t,this._onChange=o,this._label=s.label||"";const r=x._parseValue(a),c=r||new Date;this._year=c.getFullYear(),this._month=c.getMonth(),this._day=r?c.getDate():null,this._el=null,this._boundKeydown=this._onKeydown.bind(this),this._boundOutsideClick=this._onOutsideClick.bind(this)}_mount(){const t=document.createElement("div");t.className="dp-popover",document.body.appendChild(t),this._el=t,this._render(),this._position(),this._anchor.classList.add("dp-open"),document.addEventListener("keydown",this._boundKeydown),setTimeout(()=>document.addEventListener("pointerdown",this._boundOutsideClick),0)}_render(){const t=this._el,a=this._year,o=this._month,s=new Date(a,o,1).getDay(),r=new Date(a,o+1,0).getDate();let c="";for(let i=0;i<s;i++)c+='<span class="dp-cell dp-blank"></span>';for(let i=1;i<=r;i++){const d=this._day===i,h=new Date,f=h.getFullYear()===a&&h.getMonth()===o&&h.getDate()===i;c+=`<button class="dp-cell dp-day${d?" dp-selected":""}${f?" dp-today":""}" type="button" data-day="${i}">${i}</button>`}t.innerHTML=`
      <div class="dp-header">
        <button class="dp-nav-btn" type="button" data-dp-prev aria-label="Previous month">‹</button>
        <span class="dp-month-label">${pa[o]} ${a}</span>
        <button class="dp-nav-btn" type="button" data-dp-next aria-label="Next month">›</button>
      </div>
      <div class="dp-day-names">
        ${ma.map(i=>`<span class="dp-day-name">${i}</span>`).join("")}
      </div>
      <div class="dp-grid">${c}</div>
      <div class="dp-footer">
        ${this._day!==null?'<button class="dp-clear-btn" type="button">Clear</button>':""}
        <button class="dp-today-btn" type="button">Today</button>
      </div>
    `,this._bindEvents()}_bindEvents(){const t=this._el;t.querySelector("[data-dp-prev]").addEventListener("click",()=>{this._month--,this._month<0&&(this._month=11,this._year--),this._render()}),t.querySelector("[data-dp-next]").addEventListener("click",()=>{this._month++,this._month>11&&(this._month=0,this._year++),this._render()}),t.querySelectorAll(".dp-day").forEach(o=>{o.addEventListener("click",()=>{this._day=Number(o.dataset.day),this._commitAndClose()})});const a=t.querySelector(".dp-clear-btn");a&&a.addEventListener("click",()=>{this._day=null,this._onChange&&this._onChange(""),x.close()}),t.querySelector(".dp-today-btn").addEventListener("click",()=>{const o=new Date;this._year=o.getFullYear(),this._month=o.getMonth(),this._day=o.getDate(),this._commitAndClose()})}_commitAndClose(){if(this._day!==null&&this._onChange){const t=String(this._month+1).padStart(2,"0"),a=String(this._day).padStart(2,"0");this._onChange(`${this._year}-${t}-${a}`)}x.close()}_position(){const t=this._el,a=this._anchor.getBoundingClientRect(),o=window.innerWidth,s=window.innerHeight,r=t.offsetWidth||240,c=t.offsetHeight||300;let i=a.bottom+8,d=a.left;i+c>s-12&&(i=a.top-c-8),d+r>o-12&&(d=o-r-12),d<8&&(d=8),t.style.top=i+"px",t.style.left=d+"px"}_onKeydown(t){t.key==="Escape"&&x.close()}_onOutsideClick(t){this._el&&!this._el.contains(t.target)&&t.target!==this._anchor&&x.close()}_destroy(){document.removeEventListener("keydown",this._boundKeydown),document.removeEventListener("pointerdown",this._boundOutsideClick),this._anchor&&this._anchor.classList.remove("dp-open"),this._el&&this._el.parentNode&&this._el.parentNode.removeChild(this._el),this._el=null}static _parseValue(t){if(!t)return null;const a=new Date(t+"T00:00:00");return isNaN(a.getTime())?null:a}static formatDisplay(t){const a=x._parseValue(t);return a?a.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"}):"Set date…"}};we(x,"_instance",null);let J=x;const T=class T{static open(t,a,o){T.close();const s=new T(t,a,o);T._instance=s,s._mount()}static close(){T._instance&&(T._instance._destroy(),T._instance=null)}constructor(t,a,o){this._anchor=t,this._onApply=o;const{h:s,s:r,v:c}=T._hexToHsv(a||"#a89eff");this._h=s,this._s=r,this._v=c,this._el=null,this._draggingGradient=!1,this._draggingHue=!1,this._boundKeydown=this._onKeydown.bind(this),this._boundOutsideClick=this._onOutsideClick.bind(this)}_mount(){const t=document.createElement("div");t.className="cp-popover",t.innerHTML=this._buildHtml(),document.body.appendChild(t),this._el=t,this._position(),this._update(),this._bindEvents(),this._anchor.classList.add("cp-open"),document.addEventListener("keydown",this._boundKeydown),setTimeout(()=>document.addEventListener("pointerdown",this._boundOutsideClick),0)}_buildHtml(){return`
      <div class="cp-gradient-box">
        <div class="cp-gradient-cursor"></div>
      </div>
      <div class="cp-hue-track">
        <div class="cp-slider-thumb"></div>
      </div>
      <div class="cp-bottom-row">
        <div class="cp-preview"></div>
        <input class="cp-hex-input" type="text" maxlength="7" spellcheck="false" value="" />
      </div>
      <div class="cp-actions">
        <button class="cp-btn cp-btn-cancel" type="button">Cancel</button>
        <button class="cp-btn cp-btn-apply" type="button">Apply</button>
      </div>
    `}_position(){const t=this._el,a=this._anchor.getBoundingClientRect(),o=window.innerWidth,s=window.innerHeight,r=t.offsetWidth||224,c=t.offsetHeight||300;let i=a.bottom+8,d=a.left;i+c>s-12&&(i=a.top-c-8),d+r>o-12&&(d=o-r-12),d<8&&(d=8),t.style.top=i+"px",t.style.left=d+"px"}_update(){const t=this._el;if(!t)return;const a=T._hsvToHex(this._h,this._s,this._v),o=T._hsvToHex(this._h,1,1),s=t.querySelector(".cp-gradient-box");s.style.background=o;const r=t.querySelector(".cp-gradient-cursor");r.style.left=this._s*100+"%",r.style.top=(1-this._v)*100+"%";const c=t.querySelector(".cp-hue-track .cp-slider-thumb");c.style.left=this._h/360*100+"%",t.querySelector(".cp-preview").style.background=a;const i=t.querySelector(".cp-hex-input");document.activeElement!==i&&(i.value=a.toUpperCase())}_bindEvents(){const t=this._el,a=t.querySelector(".cp-gradient-box"),o=t.querySelector(".cp-hue-track"),s=t.querySelector(".cp-hex-input");a.addEventListener("pointerdown",r=>{r.preventDefault(),this._draggingGradient=!0,a.setPointerCapture(r.pointerId),this._updateFromGradientEvent(r,a)}),a.addEventListener("pointermove",r=>{this._draggingGradient&&this._updateFromGradientEvent(r,a)}),a.addEventListener("pointerup",()=>{this._draggingGradient=!1}),o.addEventListener("pointerdown",r=>{r.preventDefault(),this._draggingHue=!0,o.setPointerCapture(r.pointerId),this._updateFromHueEvent(r,o)}),o.addEventListener("pointermove",r=>{this._draggingHue&&this._updateFromHueEvent(r,o)}),o.addEventListener("pointerup",()=>{this._draggingHue=!1}),s.addEventListener("input",()=>{const r=s.value.trim(),c=r.startsWith("#")?r:"#"+r;if(/^#[0-9a-fA-F]{6}$/.test(c)){const{h:i,s:d,v:h}=T._hexToHsv(c);this._h=i,this._s=d,this._v=h,this._update()}}),t.querySelector(".cp-btn-apply").addEventListener("click",()=>{this._apply()}),t.querySelector(".cp-btn-cancel").addEventListener("click",()=>{T.close()})}_updateFromGradientEvent(t,a){const o=a.getBoundingClientRect(),s=Math.max(0,Math.min(1,(t.clientX-o.left)/o.width)),r=Math.max(0,Math.min(1,(t.clientY-o.top)/o.height));this._s=s,this._v=1-r,this._update()}_updateFromHueEvent(t,a){const o=a.getBoundingClientRect(),s=Math.max(0,Math.min(1,(t.clientX-o.left)/o.width));this._h=s*360,this._update()}_apply(){const t=T._hsvToHex(this._h,this._s,this._v);this._onApply&&this._onApply(t),T.close()}_onKeydown(t){t.key==="Escape"&&T.close(),t.key==="Enter"&&this._apply()}_onOutsideClick(t){this._el&&!this._el.contains(t.target)&&t.target!==this._anchor&&T.close()}_destroy(){document.removeEventListener("keydown",this._boundKeydown),document.removeEventListener("pointerdown",this._boundOutsideClick),this._anchor&&this._anchor.classList.remove("cp-open"),this._el&&this._el.parentNode&&this._el.parentNode.removeChild(this._el),this._el=null}static _hexToHsv(t){const a=parseInt(t.slice(1,3),16)/255,o=parseInt(t.slice(3,5),16)/255,s=parseInt(t.slice(5,7),16)/255,r=Math.max(a,o,s),c=Math.min(a,o,s),i=r-c,d=r,h=r===0?0:i/r;let f=0;return i!==0&&(r===a?f=((o-s)/i+(o<s?6:0))/6:r===o?f=((s-a)/i+2)/6:f=((a-o)/i+4)/6),{h:f*360,s:h,v:d}}static _hsvToHex(t,a,o){const s=Math.floor(t/60%6),r=t/60-Math.floor(t/60),c=o*(1-a),i=o*(1-r*a),d=o*(1-(1-r)*a);let h,f,b;switch(s){case 0:h=o,f=d,b=c;break;case 1:h=i,f=o,b=c;break;case 2:h=c,f=o,b=d;break;case 3:h=c,f=i,b=o;break;case 4:h=d,f=c,b=o;break;default:h=o,f=c,b=i;break}const y=k=>Math.round(k*255).toString(16).padStart(2,"0");return"#"+y(h)+y(f)+y(b)}};we(T,"_instance",null);let re=T;function kt(e,t){const a=e.map((s,r)=>`
      <div class="palette-swatch-wrap">
        <div class="palette-swatch" style="background:${p(s)}" data-palette-index="${r}" role="button" tabindex="0" aria-label="Edit color ${r+1}: ${p(s)}"></div>
        ${t?`<button class="palette-remove-btn" type="button" data-palette-remove="${r}" aria-label="Remove color">×</button>`:""}
      </div>
    `).join(""),o=t&&e.length<5?'<button id="palette-add-btn" class="palette-add-btn" type="button" aria-label="Add color">+</button>':"";return a+o}const Ze=[{key:"updatedAt",label:"Last Modified",dir:"desc"},{key:"createdAt",label:"Date Created",dir:"desc"},{key:"title",label:"Title A→Z",dir:"asc"},{key:"artist",label:"Artist A→Z",dir:"asc"},{key:"status",label:"Status",dir:"asc"},{key:"completionPercent",label:"% Complete",dir:"desc"},{key:"starRating",label:"Star Rating",dir:"desc"},{key:"releaseDate",label:"Release Date",dir:"asc"},{key:"startDate",label:"Start Date",dir:"asc"}];function ya(){const{key:e,dir:t}=n.homeSort,a=[...n.projects];return a.sort((o,s)=>{let r=o[e],c=s[e];const i=r==null||r==="",d=c==null||c==="";return i&&d?0:i?1:d?-1:typeof r=="number"&&typeof c=="number"?t==="asc"?r-c:c-r:(r=String(r).toLowerCase(),c=String(c).toLowerCase(),r<c?t==="asc"?-1:1:r>c?t==="asc"?1:-1:0)}),a}function Et(){const e=ya(),t=Ze.find(i=>i.key===n.homeSort.key),a=t?t.label:"Sort",o=e.map(i=>{const d=i.trackCount===1?"1 track":`${i.trackCount||0} tracks`,h=rt(i.totalRuntimeSeconds||0),f=i.completionPercent||0,b=i.starRating||0;return`
        <article class="project-card" data-open-project="${p(i.id)}">
          <div class="card-cover">
            ${la(i)}
            <span class="status-pill">${p(i.status||"In Progress")}</span>
          </div>
          <div class="card-body">
            <h3 class="card-title">${p(i.title||"Untitled Project")}</h3>
            <p class="card-artist">${p(i.artist||"Unknown Artist")}</p>
            <p class="card-meta">${p(`${d} • ${h}`)}</p>
            ${b>0?`<div class="card-rating">${da(b)}</div>`:""}
          </div>
          ${f>0?`<div class="card-progress-wrap"><div class="card-progress-bar" style="width:${f}%"></div></div>`:""}
        </article>
      `}).join(""),s=Ze.map(i=>{const d=i.key===n.homeSort.key;return`<button class="sort-menu-item ui-dropdown-item${d?" sort-menu-item--active":""}" type="button" data-sort-key="${i.key}" data-sort-dir="${i.dir}">${i.label}${d?n.homeSort.dir==="asc"?" ↑":" ↓":""}</button>`}).join("");L.innerHTML=`
    <section class="view home-view">
      <header class="topbar">
        <div>
          <h1 class="brand">Studio</h1>
          <p class="brand-sub">Private workspace for works in progress</p>
        </div>
        <div class="topbar-actions">
          <button id="open-settings-button" class="circle-button" type="button" aria-label="Open settings" title="Settings">${w("settings")}</button>
          <button id="logout-button" class="text-button" type="button">Logout</button>
        </div>
      </header>

      <section class="home-actions">
        <button id="create-project-button" class="primary-button" type="button">${w("plus")} New Project</button>
        <div class="sort-wrap">
          <button id="sort-button" class="sort-button ui-dropdown-trigger" type="button" aria-haspopup="true" aria-expanded="false">
            ${w("sort")} ${p(a)}
          </button>
          <div id="sort-menu" class="sort-menu ui-dropdown-menu hidden">
            ${s}
          </div>
        </div>
      </section>

      <section class="project-grid">
        ${o||'<div class="empty-state">No projects yet. Create one to start uploading tracks.</div>'}
      </section>
    </section>
  `,document.getElementById("open-settings-button").addEventListener("click",()=>{D("/settings")}),document.getElementById("logout-button").addEventListener("click",async()=>{try{await S("/api/logout",{method:"POST"}),n.authenticated=!1,n.currentProject=null,D("/")}catch(i){g(i.message||"Could not log out")}}),document.getElementById("create-project-button").addEventListener("click",async()=>{try{const i=await S("/api/projects",{method:"POST",body:{title:"Untitled Project",artist:"Unknown Artist",description:"",status:"In Progress"}});n.currentProject=i.project,Ue(i.project),D(`/project/${i.project.id}`)}catch(i){g(i.message||"Failed to create project")}});const r=document.getElementById("sort-button"),c=document.getElementById("sort-menu");r.addEventListener("click",i=>{i.stopPropagation();const d=!c.classList.contains("hidden");c.classList.toggle("hidden",d),r.setAttribute("aria-expanded",String(!d))}),c.querySelectorAll(".sort-menu-item").forEach(i=>{i.addEventListener("click",()=>{const d=i.dataset.sortKey,h=i.dataset.sortDir;n.homeSort.key===d?n.homeSort.dir=n.homeSort.dir==="asc"?"desc":"asc":(n.homeSort.key=d,n.homeSort.dir=h),Et()})}),document.addEventListener("click",function i(d){r.contains(d.target)||(c.classList.add("hidden"),r.setAttribute("aria-expanded","false"),document.removeEventListener("click",i))}),L.querySelectorAll("[data-open-project]").forEach(i=>{i.addEventListener("click",()=>{D(`/project/${i.dataset.openProject}`)})}),ee()}function ha(e,t){const a=K(),o=a&&!B(),s=Ee(),r=ke(n.settings.trackTagVisibility),c=ct(e.createdAt)||"No date",i=Ne(e.todos),d=i.filter(l=>!l.done).length,h=_t(e),f=[];r.contextBadges&&e.versionCount>1&&f.push(`<span class="track-badge">v${e.versionCount}</span>`),r.contextBadges&&h&&h.originalName&&f.push(`<span class="track-badge track-badge-filename marquee-wrap"><span class="marquee-inner">${p(h.originalName)}</span></span>`),r.contextBadges&&e.notes&&f.push('<span class="track-badge">Notes</span>'),r.contextBadges&&e.lyrics&&f.push('<span class="track-badge">Lyrics</span>'),r.contextBadges&&i.length&&f.push(`<span class="track-badge">Todos ${d}/${i.length}</span>`);const b=e.trackStatus&&at[e.trackStatus]||"",y=r.status&&e.trackStatus?`<span class="track-status-pill" style="background:${b}22;color:${b};border-color:${b}55">${p(e.trackStatus)}</span>`:"",k=r.moodTags&&Array.isArray(e.moodTags)&&e.moodTags.length?e.moodTags.map(l=>{const u=nt[l]||"#555";return`<span class="track-mood-chip" style="background:${u}22;color:${u};border-color:${u}55">${p(l)}</span>`}).join(""):"",E=[],M=e.originalName||(h==null?void 0:h.originalName)||"";r.date&&E.push(`<span class="track-date">${p(c)}</span>`),r.fileName&&M&&E.push(`<span class="track-file-name">${p(M)}</span>`),r.bpm&&e.bpm&&E.push(`<span class="track-inline-meta">${p(String(e.bpm))} BPM</span>`),r.key&&e.key&&E.push(`${ia(e.key)}<span class="track-inline-meta">${p(e.key)}</span>`),r.playCount&&e.listenCount&&E.push(`<span class="track-inline-meta">${p(String(e.listenCount))} plays</span>`);const I=E.map((l,u)=>u===0?l:`<span class="stats-dot track-meta-dot">&middot;</span>${l}`).join(""),v=f.length||y;return`
    <article class="track-row" data-track-id="${p(e.id)}" draggable="${o?"true":"false"}">
      <div class="track-index drag-handle" title="Drag to reorder">${t+1}</div>
      <div class="track-main">
        <div class="track-line">
          <div
            class="editable track-title-editable"
            contenteditable="${a?"true":"false"}"
            spellcheck="false"
            data-track-id="${p(e.id)}"
            data-track-field="title"
            data-placeholder="Untitled track"
          >${p(e.title||"")}</div>
        </div>

        <div class="track-meta-line">
          ${I}
        </div>

        ${k?`<div class="track-mood-chips-row">${k}</div>`:""}

        ${v?`<div class="track-bottom-row">
          <div class="track-badges">${f.join("")}</div>
          ${y}
        </div>`:""}
      </div>
      <button class="icon-button track-play-button" type="button" data-play-track="${p(e.id)}" title="Play track" ${s?"":"disabled"}>${w("play")}</button>
      <button class="icon-button track-menu-button" type="button" data-track-menu="${p(e.id)}" title="Track options">${w("more")}</button>
    </article>
  `}function fa(e){return It.map(t=>{const a=t===e?"selected":"";return`<option value="${p(t)}" ${a}>${p(t)}</option>`}).join("")}function j(){te({flush:!1}),le({flush:!1});const e=C();if(!e){Y("Project not found",!0);return}n.metadataPanel.colorPalette=Array.isArray(e.colorPalette)?[...e.colorPalette]:[];const t=K(),a=Ee(),o=!B(),s=e.tracks||[],r=s.map((y,k)=>ha(y,k)).join(""),c=s.length===1?"1 track":`${s.length} tracks`,i=rt(e.totalRuntimeSeconds||0),d=Array.isArray(e.shareLinks)?e.shareLinks:[],f=(Array.isArray(e.coverVersions)?e.coverVersions:[]).map(y=>`
        <div class="cover-thumb-wrap">
          <button
            class="cover-switcher-thumb ${y.id===e.activeCoverId?"active":""}"
            type="button"
            data-cover-version="${p(y.id)}"
            title="Switch cover"
          >
            <img src="${p(y.coverUrl)}" alt="Cover version" loading="lazy" />
          </button>
          ${t?`<button class="cover-thumb-delete" type="button" data-delete-cover="${p(y.id)}" title="Delete cover" aria-label="Delete cover">${w("close")}</button>`:""}
        </div>
      `).join(""),b=d.map(y=>{const k=`${window.location.origin}${y.shareUrl}`;return`
        <div class="share-link-item">
          <span class="share-link-type">${p(it(y.access))}</span>
          <input class="share-link-input" type="text" readonly value="${p(k)}" />
          <button class="secondary-button" type="button" data-copy-share="${p(y.shareUrl)}">Copy</button>
          <button class="secondary-button" type="button" data-delete-share="${p(y.id)}">Delete</button>
        </div>
      `}).join("");L.innerHTML=`
    <section class="view project-view">
      <header class="project-chrome">
          <button id="back-home-button" class="circle-button" type="button" aria-label="Back to library">${w("back")}</button>
        <div class="chrome-actions">
            ${o?`<button id="open-settings-button" class="circle-button" type="button" aria-label="Open settings" title="Settings">${w("settings")}</button><button id="delete-project-button" class="circle-button danger" type="button" aria-label="Delete project" title="Delete project">${w("trash")}</button><button id="logout-button" class="circle-button" type="button" aria-label="Log out">${w("logout")}</button>`:""}
        </div>
      </header>

      <section class="project-stage">
        <div class="cover-stack">
          <button id="cover-button" class="cover-editor stage-cover" type="button" aria-label="Upload cover image">
            ${e.coverUrl?`<img src="${p(e.coverUrl)}?v=${p(e.activeCoverId||"")}" alt="Project cover" />`:"Click to upload cover"}
          </button>
          <div class="cover-switcher-wrap">
            <p class="cover-switcher-label">Cover Versions</p>
            <div id="cover-switcher" class="cover-switcher">
              ${f||'<p class="todo-empty">No cover versions yet.</p>'}
            </div>
          </div>
        </div>

        <div class="project-column">
          <div class="project-head">
            <div class="project-headings">
              <h1 id="project-title" class="editable heading-editable" contenteditable="${t?"true":"false"}" spellcheck="false" data-placeholder="Project title">${p(e.title||"")}</h1>

              <div class="project-stats-row">
                <p id="project-artist" class="editable subheading-editable" contenteditable="${t?"true":"false"}" spellcheck="false" data-placeholder="Artist">${p(e.artist||"")}</p>
                  <span class="stats-dot">&middot;</span>
                <span class="project-track-count">${p(c)}</span>
                  <span class="stats-dot">&middot;</span>
                <span class="project-runtime">${p(i)}</span>
              </div>

              ${e.colorPalette&&e.colorPalette.length||e.releaseDate?`<div class="project-meta-chips">
                      ${e.colorPalette&&e.colorPalette.length?`<div class="project-palette-row">${ua(e.colorPalette)}</div>`:""}
                      ${e.releaseDate?`<div class="project-deadline-chip">${xe(e.releaseDate)}</div>`:""}
                    </div>`:""}
            </div>

            <div class="project-main-controls">
              <button id="shuffle-tracks-button" class="icon-button ghost-control" type="button" title="Shuffle queue">${w("shuffle")}</button>
              <button id="play-all-button" class="icon-button play-main-control" type="button" title="Play from start" ${a?"":"disabled"}>${w("play")}</button>
            </div>
          </div>

          <div class="project-tools">
            <button id="upload-tracks-button" class="add-tracks-button" type="button" ${t?"":"disabled"}>+ Add tracks</button>

            <div class="project-secondary-controls">
              <select id="project-status" class="project-status-select ui-select" title="Status" aria-label="Status" ${t?"":"disabled"}>${fa(e.status)}</select>
              <button id="open-metadata-button" class="secondary-button panel-trigger-btn" type="button">${w("metadata")} Metadata</button>
              <button id="open-notes-button" class="secondary-button panel-trigger-btn" type="button">${w("notes")} Notes</button>
              ${o?`<button id="open-share-button" class="secondary-button panel-trigger-btn" type="button">${w("link")} Share</button>`:""}
            </div>
          </div>

          <section class="tracks-panel">
            <div class="tracks-toolbar">
              <h2>Tracklist</h2>
            </div>

            <input id="cover-input" type="file" hidden accept=".jpg,.jpeg,.png,.webp" />
            <input id="track-input" type="file" hidden multiple accept=".wav,.mp3,.flac" />

            <div id="tracks-list" class="tracks-list">
              ${r||'<div class="empty-state">No tracks uploaded yet. Add WAV, MP3, or FLAC files.</div>'}
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
            <button id="track-menu-close" class="circle-button track-menu-close" type="button" aria-label="Close track details">${w("close")}</button>
          </header>

          <div class="track-menu-actions">
            <button id="track-menu-play" class="secondary-button track-menu-play" type="button" ${a?"":"disabled"}>${w("play")} Play</button>
            <button id="track-menu-save" class="primary-button" type="button" ${t?"":"disabled"}>Save</button>
          </div>

          <div class="track-menu-field">
            <div class="track-menu-todo-head">
              <label>Versions</label>
              <button id="track-version-add" class="secondary-button track-menu-todo-add" type="button" ${t?"":"disabled"}>${w("plus")} Upload</button>
            </div>
            <input id="track-version-input" type="file" hidden accept=".wav,.mp3,.flac" />
            <div id="track-version-list" class="track-version-list"></div>
          </div>

          <div class="track-menu-field track-meta-row">
            <div class="track-meta-col">
              <label for="track-bpm-input">BPM</label>
              <input id="track-bpm-input" class="track-num-input" type="number" min="1" max="999" placeholder="—" ${t?"":"disabled"} />
            </div>
            <div class="track-meta-col">
              <label for="track-key-select">Key</label>
              <div class="track-key-row">
                <select id="track-key-select" class="track-key-select ui-select" ${t?"":"disabled"}>
                  <option value="">—</option>
                  ${Ct.map(y=>`<option value="${p(y)}">${p(y)}</option>`).join("")}
                </select>
                <span id="track-camelot-badge" class="camelot-badge" hidden></span>
              </div>
            </div>
          </div>

          <div class="track-menu-field track-meta-row">
            <div class="track-meta-col">
              <label for="track-status-select">Status</label>
              <select id="track-status-select" class="track-status-select ui-select" ${t?"":"disabled"}>
                <option value="">—</option>
                ${St.map(y=>`<option value="${p(y)}">${p(y)}</option>`).join("")}
              </select>
            </div>
            <div class="track-meta-col track-meta-col-wide">
              <label>Play Count</label>
              <span id="track-listen-count" class="track-listen-count">Played 0 times</span>
            </div>
          </div>

          <div class="track-menu-field">
            <label>Mood Tags</label>
            <div id="track-mood-tags" class="mood-tags-wrap"></div>
          </div>

          <div class="track-menu-field">
            <div class="track-menu-todo-head">
              <label>Analysis</label>
              <button id="track-lufs-analyze" class="secondary-button track-menu-todo-add" type="button" ${t?"":"disabled"}>Analyze</button>
            </div>
            <div id="track-lufs-display" class="lufs-display"></div>
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
              <button id="track-todo-add" class="secondary-button track-menu-todo-add" type="button" ${t?"":"disabled"}>${w("plus")} Add</button>
            </div>

            <div class="track-menu-todo-add-row">
              <input id="track-todo-input" type="text" placeholder="Add todo item" maxlength="220" ${t?"":"disabled"} />
            </div>

            <div id="track-todo-list" class="track-menu-todo-list"></div>
          </div>

          <footer class="track-menu-footer">
            <button id="track-menu-delete" class="secondary-button track-menu-delete" type="button" ${t?"":"disabled"}>${w("trash")} Delete Track</button>
          </footer>
        </section>
      </div>

      <div id="notes-panel" class="panel-overlay hidden" role="dialog" aria-modal="true" aria-label="Project notes">
        <div class="panel-sheet">
          <header class="panel-header">
            <h3>Project Notes</h3>
            <button id="notes-panel-close" class="circle-button" type="button" aria-label="Close notes">${w("close")}</button>
          </header>
          <div class="panel-body">
            <div class="project-notes-shell">
              <div id="project-description" class="editable description-editable" contenteditable="${t?"true":"false"}" spellcheck="true" data-placeholder="Project notes">${p(e.description||"")}</div>
            </div>
          </div>
        </div>
      </div>

      ${o?`
      <div id="share-panel" class="panel-overlay hidden" role="dialog" aria-modal="true" aria-label="Share project">
        <div class="panel-sheet">
          <header class="panel-header">
            <h3>Share Project</h3>
            <button id="share-panel-close" class="circle-button" type="button" aria-label="Close share">${w("close")}</button>
          </header>
          <div class="panel-body">
            <div class="share-manager">
              <div class="share-create-row">
                <label for="share-access-select">Share Access</label>
                <select id="share-access-select" class="project-status-select ui-select">${xt("listen")}</select>
                <button id="share-create-button" class="secondary-button" type="button">Create Share Link</button>
              </div>
              <div id="share-links-list" class="share-links-list">
                ${b||'<p class="todo-empty">No share links yet.</p>'}
              </div>
            </div>
          </div>
        </div>
      </div>
      `:""}

      <div id="metadata-panel" class="panel-overlay hidden" role="dialog" aria-modal="true" aria-label="Project metadata">
        <div class="panel-sheet panel-sheet-wide">
          <header class="panel-header">
            <h3>Metadata</h3>
            <button id="metadata-panel-close" class="circle-button" type="button" aria-label="Close metadata">${w("close")}</button>
          </header>
          <div class="panel-body">

            <div class="meta-section meta-dates-row">
              <div class="meta-date-field">
                <label class="meta-section-label">Start Date</label>
                <button id="meta-start-date-btn" class="dp-trigger-btn${t?"":" dp-trigger-btn--readonly"}" type="button" data-value="${p(e.startDate||"")}" ${t?"":"disabled"}>
                  ${J.formatDisplay(e.startDate)}
                </button>
              </div>
              <div class="meta-date-field">
                <label class="meta-section-label">Release Date</label>
                <button id="meta-release-date-btn" class="dp-trigger-btn${t?"":" dp-trigger-btn--readonly"}" type="button" data-value="${p(e.releaseDate||"")}" ${t?"":"disabled"}>
                  ${J.formatDisplay(e.releaseDate)}
                </button>
                <div id="meta-deadline-countdown" class="deadline-countdown${e.releaseDate?"":" hidden"}">${e.releaseDate?xe(e.releaseDate):""}</div>
              </div>
            </div>

            <div class="meta-section">
              <label class="meta-section-label">Completion — <span id="meta-completion-display">${e.completionPercent||0}%</span></label>
              <div class="completion-track">
                <input type="range" id="meta-completion-range" min="0" max="100" value="${e.completionPercent||0}" ${t?"":"disabled"} />
                <input type="number" id="meta-completion-num" class="metadata-num-input" min="0" max="100" value="${e.completionPercent||0}" ${t?"":"disabled"} />
              </div>
            </div>

            <div class="meta-section">
              <label class="meta-section-label">Rating</label>
              <div id="meta-star-rating" class="star-rating-widget" data-rating="${e.starRating||0}">
                ${[1,2,3,4,5].map(y=>`<button class="star-btn${y<=(e.starRating||0)?" active":""}" type="button" data-star="${y}" aria-label="${y} star${y>1?"s":""}" ${t?"":"disabled"}>★</button>`).join("")}
              </div>
            </div>

            <div class="meta-section">
              <label class="meta-section-label">Color Palette</label>
              <div id="meta-color-palette" class="color-palette-row">
                ${kt(n.metadataPanel.colorPalette,t)}
              </div>
            </div>

            <div class="meta-section">
              <label class="meta-section-label">Streaming Platforms</label>
              <div class="streaming-checklist">
                ${[{key:"spotify",label:"Spotify"},{key:"appleMusic",label:"Apple Music"},{key:"bandcamp",label:"Bandcamp"},{key:"tidal",label:"Tidal"},{key:"youtubeMusic",label:"YouTube Music"},{key:"soundCloud",label:"SoundCloud"}].map(({key:y,label:k})=>`
                  <label class="stream-check-row">
                    <input type="checkbox" class="stream-checkbox" data-platform="${p(y)}" ${(e.streamingChecklist||{})[y]?"checked":""} ${t?"":"disabled"} />
                    <span>${p(k)}</span>
                  </label>
                `).join("")}
              </div>
            </div>

            <div class="meta-section">
              <label class="meta-section-label" for="meta-presave-link">Pre-Save Link</label>
              <input type="url" id="meta-presave-link" class="metadata-url-input" placeholder="https://..." value="${p(e.preSaveLink||"")}" ${t?"":"disabled"} />
              ${e.preSaveLink?`<a href="${p(e.preSaveLink)}" target="_blank" rel="noopener noreferrer" class="presave-link-preview">Open link ↗</a>`:""}
            </div>

            <div class="meta-section">
              <label class="meta-section-label" for="meta-distributor-notes">Distributor Notes</label>
              <textarea id="meta-distributor-notes" class="metadata-textarea" placeholder="DistroKid / TuneCore details, ISRC codes, release admin notes…" ${t?"":"disabled"}>${p(e.distributorNotes||"")}</textarea>
            </div>

            ${t?'<div class="metadata-actions"><button id="metadata-save" class="primary-button" type="button">Save Metadata</button></div>':""}

          </div>
        </div>
      </div>
    </section>
  `,ga(),ee(),requestAnimationFrame(()=>{requestAnimationFrame(()=>{L.querySelectorAll(".track-badge.marquee-wrap").forEach(lt)})})}function va(e,t){le({flush:!1});const a=document.getElementById("metadata-panel"),o=document.getElementById("metadata-panel-close"),s=document.getElementById("open-metadata-button"),r=document.getElementById("meta-completion-range"),c=document.getElementById("meta-completion-num"),i=document.getElementById("meta-completion-display"),d=document.getElementById("meta-star-rating"),h=document.getElementById("meta-color-palette"),f=document.getElementById("metadata-save");if(!a)return;function b(){re.close(),J.close(),le({flush:!0,fireAndForget:!0}),Q(a)}if(s&&s.addEventListener("click",()=>{a.classList.remove("hidden")}),o&&o.addEventListener("click",b),a.addEventListener("click",l=>{l.target===a&&b()}),!t)return;Xt();function y(l,u){const m=document.getElementById(l);m&&m.addEventListener("click",()=>{J.open(m,m.dataset.value||"",$=>{m.dataset.value=$,m.textContent=J.formatDisplay($),u($)})})}function k(l){const u=document.getElementById("meta-deadline-countdown");if(u){if(!l){u.classList.add("hidden"),u.innerHTML="";return}u.classList.remove("hidden"),u.innerHTML=xe(l)}}y("meta-start-date-btn",()=>{U()}),y("meta-release-date-btn",l=>{k(l),U()}),r&&c&&i&&(r.addEventListener("input",()=>{c.value=r.value,i.textContent=r.value+"%",U()}),c.addEventListener("input",()=>{const l=Math.max(0,Math.min(100,Math.round(Number(c.value)||0)));r.value=l,i.textContent=l+"%",U()})),d&&d.querySelectorAll(".star-btn").forEach(l=>{l.addEventListener("click",()=>{const u=Number(l.dataset.star),m=Number(d.dataset.rating)||0,$=u===m?0:u;d.dataset.rating=$,d.querySelectorAll(".star-btn").forEach((A,R)=>A.classList.toggle("active",R+1<=$)),U()})});function E(){h&&(h.innerHTML=kt(n.metadataPanel.colorPalette,t),M())}function M(){if(!h)return;h.querySelectorAll(".palette-swatch[data-palette-index]").forEach(u=>{const m=()=>{if(!t)return;const $=Number(u.dataset.paletteIndex),A=n.metadataPanel.colorPalette[$]||"#a89eff";re.open(u,A,R=>{n.metadataPanel.colorPalette[$]=R,u.style.background=R,u.setAttribute("aria-label",`Edit color ${$+1}: ${R}`),U()})};u.addEventListener("click",m),u.addEventListener("keydown",$=>{($.key==="Enter"||$.key===" ")&&($.preventDefault(),m())})}),h.querySelectorAll("[data-palette-remove]").forEach(u=>{u.addEventListener("click",()=>{const m=Number(u.dataset.paletteRemove);Number.isFinite(m)&&(re.close(),n.metadataPanel.colorPalette.splice(m,1),E(),U())})});const l=document.getElementById("palette-add-btn");l&&l.addEventListener("click",()=>{n.metadataPanel.colorPalette.length<5&&(n.metadataPanel.colorPalette.push("#a89eff"),E(),U())})}M(),L.querySelectorAll(".stream-checkbox").forEach(l=>{l.addEventListener("change",()=>{U()})});const I=document.getElementById("meta-presave-link");I&&I.addEventListener("input",()=>{U()});const v=document.getElementById("meta-distributor-notes");v&&v.addEventListener("input",()=>{U()}),f&&f.addEventListener("click",async()=>{try{V&&(await V.flush(),V.markCurrentAsSaved()),g("Metadata saved")}catch(l){g(l.message||"Could not save metadata")}})}function ga(){const e=C();if(!e)return;const t=K(),a=Ee(),o=!B();document.getElementById("back-home-button").addEventListener("click",()=>{D("/")});const s=document.getElementById("notes-panel"),r=document.getElementById("notes-panel-close"),c=document.getElementById("open-notes-button");c&&s&&c.addEventListener("click",()=>{s.classList.remove("hidden")}),r&&s&&r.addEventListener("click",()=>{Q(s)}),s&&s.addEventListener("click",l=>{l.target===s&&Q(s)});const i=document.getElementById("share-panel"),d=document.getElementById("share-panel-close"),h=document.getElementById("open-share-button");h&&i&&h.addEventListener("click",()=>{i.classList.remove("hidden")}),d&&i&&d.addEventListener("click",()=>{Q(i)}),i&&i.addEventListener("click",l=>{l.target===i&&Q(i)});const f=document.getElementById("logout-button"),b=document.getElementById("open-settings-button");b&&b.addEventListener("click",()=>{D("/settings")}),f&&f.addEventListener("click",async()=>{try{await S("/api/logout",{method:"POST"}),n.authenticated=!1,n.currentProject=null,D("/")}catch(l){g(l.message||"Could not log out")}});const y=document.getElementById("delete-project-button");y&&y.addEventListener("click",async()=>{const l=e.title||"this project";if(await ut(`Delete "${l}" and all its tracks/covers?`))try{await S(`/api/projects/${encodeURIComponent(e.id)}`,{method:"DELETE"}),Rt(e.id),n.currentProject=null,n.player.wavesurfer&&n.player.wavesurfer.stop(),n.player.queue=[],n.player.index=-1,n.player.track=null,n.player.autoplayOnReady=!1,W.classList.add("hidden"),document.title="Studio",ie(et,"No track loaded"),ie(tt,""),je.textContent="0:00",Pe.textContent="0:00",D("/"),g("Project deleted")}catch(u){g(u.message||"Could not delete project")}}),t&&(me(document.getElementById("project-title"),async l=>{await oe({title:l||"Untitled Project"})},{singleLine:!0}),me(document.getElementById("project-artist"),async l=>{await oe({artist:l||"Unknown Artist"})},{singleLine:!0}),me(document.getElementById("project-description"),async l=>{await oe({description:l})}));const k=document.getElementById("project-status");k&&t&&k.addEventListener("change",async()=>{try{await oe({status:k.value}),j()}catch(l){g(l.message||"Failed to save status")}});const E=document.getElementById("cover-input");document.getElementById("cover-button").addEventListener("click",()=>{t&&E.click()}),E.addEventListener("change",async()=>{if(t&&!(!E.files||!E.files[0]))try{await aa(e.id,E.files[0]),j(),g("Cover version uploaded")}catch(l){g(l.message||"Cover upload failed")}}),L.querySelectorAll("[data-cover-version]").forEach(l=>{l.addEventListener("click",async()=>{if(!t)return;const u=l.dataset.coverVersion;if(u)try{await na(e.id,u),j()}catch(m){g(m.message||"Could not switch cover")}})}),t&&L.querySelectorAll("[data-delete-cover]").forEach(l=>{l.addEventListener("click",async u=>{u.stopPropagation();const m=l.dataset.deleteCover;if(m)try{await ta(e.id,m),j(),g("Cover deleted")}catch($){g($.message||"Could not delete cover")}})});const M=document.getElementById("track-input");document.getElementById("upload-tracks-button").addEventListener("click",()=>{t&&M.click()});const I=document.getElementById("play-all-button");I&&I.addEventListener("click",()=>{if(!a){g("This share link cannot play audio");return}const l=C(),u=l&&l.tracks||[];if(!u.length){g("No tracks available");return}const m=n.player.track?n.player.track.id:null;if(!!(m&&u.some(A=>A.id===m))&&n.player.wavesurfer){n.player.wavesurfer.playPause();return}z(u[0],u,0)});const v=document.getElementById("shuffle-tracks-button");if(v&&v.addEventListener("click",()=>{if(!a){g("This share link cannot play audio");return}const l=C(),u=l&&l.tracks||[];if(!u.length){g("No tracks available");return}const m=Dt(u);z(m[0],m,0),g("Shuffle queue ready")}),M.addEventListener("change",async()=>{if(!t||B())return;const l=Array.from(M.files||[]);if(!l.length)return;const u=new FormData;l.forEach(m=>{u.append("tracks",m)});try{const m=await S(`/api/projects/${encodeURIComponent(e.id)}/tracks`,{method:"POST",body:u});N(m.project),j(),g("Tracks uploaded")}catch(m){g(m.message||"Track upload failed")}}),o){const l=document.getElementById("share-create-button"),u=document.getElementById("share-access-select");l&&u&&l.addEventListener("click",async()=>{try{const m=await S(`/api/projects/${encodeURIComponent(e.id)}/share`,{method:"POST",body:{access:u.value}});N(m.project),j(),m.shareLink&&m.shareLink.shareUrl&&await Ge(`${window.location.origin}${m.shareLink.shareUrl}`)}catch(m){g(m.message||"Could not create share link")}}),L.querySelectorAll("[data-copy-share]").forEach(m=>{m.addEventListener("click",async()=>{const $=m.dataset.copyShare;$&&await Ge(`${window.location.origin}${$}`)})}),L.querySelectorAll("[data-delete-share]").forEach(m=>{m.addEventListener("click",async()=>{const $=m.dataset.deleteShare;if($)try{const A=await S(`/api/projects/${encodeURIComponent(e.id)}/share/${encodeURIComponent($)}`,{method:"DELETE"});N(A.project),j(),g("Share link deleted")}catch(A){g(A.message||"Could not delete share link")}})})}L.querySelectorAll("[data-play-track]").forEach(l=>{l.addEventListener("click",()=>{if(!a){g("This share link cannot play audio");return}const u=l.dataset.playTrack,m=C(),$=m&&m.tracks||[],A=$.findIndex(R=>R.id===u);A<0||z($[A],$,A)})}),t&&L.querySelectorAll("[data-track-field]").forEach(l=>{const u=l.dataset.trackField,m=l.dataset.trackId;me(l,async $=>{await yt(e.id,m,{[u]:$})},{singleLine:!0})}),ca(e.id,{canEdit:t}),va(e.id,t),!B()&&t&&ba(e.id)}function ba(e){const t=Array.from(L.querySelectorAll(".track-row[data-track-id]"));if(!t.length)return;let a=null;t.forEach(o=>{o.addEventListener("dragstart",s=>{a=o.dataset.trackId,o.classList.add("dragging"),s.dataTransfer.effectAllowed="move"}),o.addEventListener("dragend",()=>{a=null,o.classList.remove("dragging"),t.forEach(s=>s.classList.remove("drag-target"))}),o.addEventListener("dragover",s=>{s.preventDefault(),a&&a!==o.dataset.trackId&&o.classList.add("drag-target")}),o.addEventListener("dragleave",()=>{o.classList.remove("drag-target")}),o.addEventListener("drop",async s=>{if(s.preventDefault(),o.classList.remove("drag-target"),!a)return;const r=o.dataset.trackId;if(a===r)return;const c=C(),i=[...c&&c.tracks||[]],d=i.findIndex(y=>y.id===a),h=i.findIndex(y=>y.id===r);if(d<0||h<0)return;const[f]=i.splice(d,1);i.splice(h,0,f);const b=i.map(y=>y.id);try{const y=await S(`/api/projects/${encodeURIComponent(e)}/tracks/reorder`,{method:"PATCH",body:{trackIds:b}});N(y.project),j()}catch(y){g(y.message||"Failed to reorder tracks")}})})}function wt(){const e=ke(n.settings.trackTagVisibility);n.settings.trackTagVisibility={...e};const t=Tt.map(r=>{const c=e[r.key]?"checked":"";return`
      <label class="settings-toggle-row" for="setting-${p(r.key)}">
        <span class="settings-toggle-copy">
          <span class="settings-toggle-label">${p(r.label)}</span>
          <span class="settings-toggle-desc">${p(r.description)}</span>
        </span>
        <input id="setting-${p(r.key)}" class="settings-toggle-input" type="checkbox" data-track-tag-setting="${p(r.key)}" ${c} />
      </label>
    `}).join("");L.innerHTML=`
    <section class="view settings-view">
      <header class="project-chrome settings-chrome">
        <button id="settings-back-button" class="circle-button" type="button" aria-label="Back">${w("back")}</button>
        <div class="chrome-actions">
          <button id="settings-logout-button" class="circle-button" type="button" aria-label="Log out">${w("logout")}</button>
        </div>
      </header>

      <section class="settings-panel">
        <h1 class="settings-title">Settings</h1>
        <p class="settings-subtitle">Choose which track tags are visible in project rows.</p>

        <div class="settings-card">
          <div class="settings-card-head">
            <h2>Track Tag Visibility</h2>
            <button id="settings-reset-tags" class="secondary-button" type="button">Reset Defaults</button>
          </div>
          <div class="settings-toggle-list">
            ${t}
          </div>
        </div>
      </section>
    </section>
  `;const a=document.getElementById("settings-back-button");a&&a.addEventListener("click",()=>{const r=n.settings.previousPath||"/";D(r==="/settings"?"/":r)});const o=document.getElementById("settings-logout-button");o&&o.addEventListener("click",async()=>{try{await S("/api/logout",{method:"POST"}),n.authenticated=!1,n.currentProject=null,n.sharedProject=null,D("/")}catch(r){g(r.message||"Could not log out")}}),L.querySelectorAll("[data-track-tag-setting]").forEach(r=>{r.addEventListener("change",()=>{const c=r.dataset.trackTagSetting;Object.prototype.hasOwnProperty.call(X,c)&&(n.settings.trackTagVisibility[c]=!!r.checked,Ke())})});const s=document.getElementById("settings-reset-tags");s&&s.addEventListener("click",()=>{n.settings.trackTagVisibility={...X},Ke(),wt(),g("Tag visibility reset")})}function ka(){const e=n.sharedProject;if(!e){Y("Shared project not found",!0);return}const t=!!e.canListen;!t&&W&&W.classList.add("hidden");const o=(e.tracks||[]).map((s,r)=>{const c=s.trackNumber===null||s.trackNumber===void 0?"-":p(s.trackNumber),i=Ne(s.todos),d=i.filter(f=>!f.done).length,h=i.length?`${d} open / ${i.length} total`:"-";return`
        <article class="track-row readonly shared-track-row" data-track-id="${p(s.id)}">
          <div class="track-index">${r+1}</div>
          <button class="icon-button track-play-button" type="button" data-share-play-track="${p(s.id)}" aria-label="Play track" ${t?"":"disabled"}>${w("play")}</button>
          <div class="track-main">
            <div class="track-line">
              <div class="readonly-text shared-track-title">${p(s.title||"Untitled track")}</div>
            </div>

            <div class="track-meta-line">
              <span class="track-number-chip"># ${c}</span>
              <span class="track-date">${p(ct(s.createdAt)||"No date")}</span>
              <span class="track-file-name">${p(s.originalName||"")}</span>
            </div>

            <div class="track-aux-grid readonly-aux-grid">
              <div class="track-aux-field">
                <span class="track-aux-label">Notes</span>
                <div class="track-aux-static">${p(s.notes||"-")}</div>
              </div>
              <div class="track-aux-field">
                <span class="track-aux-label">Lyrics</span>
                <div class="track-aux-static">${p(s.lyrics||"-")}</div>
              </div>
              <div class="track-aux-field">
                <span class="track-aux-label">Todos</span>
                <div class="track-aux-static">${p(h)}</div>
              </div>
            </div>
          </div>
          <div class="track-menu-placeholder"></div>
        </article>
      `}).join("");L.innerHTML=`
    <section class="view share-view">
      <header class="topbar">
        <div>
          <h1 class="brand">${p(e.title||"Shared Project")}</h1>
          <p class="brand-sub">by ${p(e.artist||"Unknown Artist")} • ${p(it(e.shareAccess))}</p>
        </div>
        <button id="open-studio-button" class="text-button" type="button">Open Studio</button>
      </header>

      <section class="project-hero readonly">
        <div class="cover-editor">
          ${e.coverUrl?`<img src="${p(e.coverUrl)}" alt="Project cover" />`:"No cover"}
        </div>

        <div class="project-meta">
          <p class="readonly-text">Status: ${p(e.status||"In Progress")}</p>
          <div class="description-editable">${p(e.description||"")}</div>
        </div>
      </section>

      <section class="tracks-panel">
        <div class="tracks-toolbar">
          <h2>Tracks</h2>
        </div>
        ${t?"":'<p class="todo-empty">This link can view project data but cannot play audio.</p>'}
        <div class="tracks-list">
          ${o||'<div class="empty-state">No tracks available.</div>'}
        </div>
      </section>
    </section>
  `,document.getElementById("open-studio-button").addEventListener("click",()=>{D("/")}),t&&L.querySelectorAll("[data-share-play-track]").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.sharePlayTrack,c=n.sharedProject.tracks||[],i=c.findIndex(d=>d.id===r);i<0||z(c[i],c,i)})}),ee()}function $e(){L.innerHTML=`
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
  `;const e=document.getElementById("login-form"),t=document.getElementById("password-input");e.addEventListener("submit",async a=>{a.preventDefault();try{await S("/api/login",{method:"POST",body:{password:t.value},allowUnauthorized:!0}),n.authenticated=!0,t.value="",be()}catch(o){g(o.message||"Login failed")}})}async function Ea(e){if(!e){Y("Invalid share token",!0);return}try{const t=await S(`/api/share/${encodeURIComponent(e)}`,{allowUnauthorized:!0});if(n.sharedProject=t.project,n.currentProject=t.project,t.project&&t.project.canEdit){j();return}ka()}catch(t){Y(t.message||"Share link not found",!0)}}async function be(){te({flush:!0,fireAndForget:!0}),le({flush:!0,fireAndForget:!0});const e=Nt();if(n.route=e,e.type==="share"){await Ea(e.token);return}try{const t=await S("/api/session",{allowUnauthorized:!0});n.authenticated=!!t.authenticated}catch{Y("Could not connect to the Studio server");return}if(!n.authenticated){$e();return}if(e.type==="settings"){wt();return}if(e.type==="project"){try{await Qt(e.projectId),j()}catch(t){if(t.code==="AUTH_REQUIRED"){$e();return}Y(t.message||"Project not found",!0)}return}try{await Wt(),Et()}catch(t){if(t.code==="AUTH_REQUIRED"){$e();return}Y(t.message||"Could not load projects")}}function wa(){jt(),Vt(),window.addEventListener("popstate",()=>{be()}),be()}wa();
