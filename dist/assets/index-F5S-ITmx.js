var Gt=Object.defineProperty;var Wt=(e,t,n)=>t in e?Gt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ne=(e,t,n)=>Wt(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const B=document.getElementById("app"),ae=document.getElementById("player"),it=document.getElementById("waveform"),xe=document.getElementById("player-play"),ct=document.getElementById("player-prev"),lt=document.getElementById("player-next"),Qe=document.getElementById("player-current-time"),Je=document.getElementById("player-duration"),Mt=document.getElementById("player-track-title"),$t=document.getElementById("player-track-subtitle"),Y=document.getElementById("player-cover-art"),ve=document.getElementById("player-volume"),Q=document.getElementById("player-volume-toggle"),dt=document.getElementById("player-album-title"),ut=document.querySelector(".player-track"),Me=document.getElementById("player-queue-btn"),J=document.getElementById("player-queue-popover"),$e=document.getElementById("player-queue-list"),de=document.getElementById("player-shuffle-btn"),O=document.getElementById("player-loop-btn"),Ie=document.getElementById("toast"),Se=document.createElement("audio");Se.preload="auto";const Yt=["In Progress","Mastering","Done"],Qt=["Idea","Demo","Recording","Mixing","Mastering","Done"],It={Idea:"#6e6e8a",Demo:"#4a9eff",Recording:"#ff8c42",Mixing:"#f5c518",Mastering:"#a89eff",Done:"#3ecf8e"},Jt=["Dark","Energetic","Melancholic","Hype","Chill","Aggressive","Euphoric","Nostalgic"],St={Dark:"#5a4a6e",Energetic:"#ff5e3a",Melancholic:"#4a7ebd",Hype:"#ff3cac",Chill:"#38b2ac",Aggressive:"#e53e3e",Euphoric:"#d69e2e",Nostalgic:"#744210"},Zt=["C Major","C Minor","C# Major","C# Minor","D Major","D Minor","D# Major","D# Minor","E Major","E Minor","F Major","F Minor","F# Major","F# Minor","G Major","G Minor","G# Major","G# Minor","A Major","A Minor","A# Major","A# Minor","B Major","B Minor"],Ze={"C Major":"8B","C Minor":"5A","C# Major":"3B","C# Minor":"12A","D Major":"10B","D Minor":"7A","D# Major":"5B","D# Minor":"2A","E Major":"12B","E Minor":"9A","F Major":"7B","F Minor":"4A","F# Major":"2B","F# Minor":"11A","G Major":"9B","G Minor":"6A","G# Major":"4B","G# Minor":"1A","A Major":"11B","A Minor":"8A","A# Major":"6B","A# Minor":"3A","B Major":"1B","B Minor":"10A"},Xe={"1A":"#3ecfb8","1B":"#3abfaa","2A":"#5dd87c","2B":"#52cc6e","3A":"#a0d84a","3B":"#b4e040","4A":"#e8d03a","4B":"#f0c828","5A":"#f0a030","5B":"#e89020","6A":"#e86040","6B":"#e05038","7A":"#e84878","7B":"#d83868","8A":"#c840c8","8B":"#b830b8","9A":"#9040e0","9B":"#8030d0","10A":"#5060e8","10B":"#4050d8","11A":"#3898d8","11B":"#30a8e0","12A":"#30bce0","12B":"#30ccd4"},Lt=[{value:"listen",label:"See + Listen"},{value:"view",label:"See Only"},{value:"edit",label:"See + Edit + Listen"}],ie={date:!0,bpm:!0,key:!0,playCount:!0,status:!0,moodTags:!0,contextBadges:!0},Xt=[{key:"date",label:"Track date",description:"Show the date tag in each track row"},{key:"bpm",label:"BPM tag",description:"Show BPM inline tags"},{key:"key",label:"Key + Camelot tag",description:"Show musical key and Camelot badge"},{key:"playCount",label:"Play count tag",description:"Show listen count tags"},{key:"status",label:"Status tag",description:"Show track status pill"},{key:"moodTags",label:"Mood tags",description:"Show mood chips below metadata"},{key:"contextBadges",label:"Context badges",description:"Show version, notes, lyrics, and todos badges"}],xt="studio.uiSettings.v1",en={back:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"></path><path d="M9 12h11"></path></svg>',logout:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><path d="M16 17l5-5-5-5"></path><path d="M21 12H9"></path></svg>',shuffle:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 3h5v5"></path><path d="M4 20l6-6"></path><path d="M21 3l-7 7"></path><path d="M4 4l6 6"></path><path d="M14 14l7 7"></path><path d="M16 21h5v-5"></path></svg>',play:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"></path></svg>',pause:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="5" width="4" height="14" rx="1" fill="currentColor"></rect><rect x="13" y="5" width="4" height="14" rx="1" fill="currentColor"></rect></svg>',more:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="12" r="1.7" fill="currentColor"></circle><circle cx="12" cy="12" r="1.7" fill="currentColor"></circle><circle cx="18" cy="12" r="1.7" fill="currentColor"></circle></svg>',prev:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h2v14H6zM19 5l-9 7 9 7V5z" fill="currentColor"></path></svg>',next:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 5h2v14h-2zM5 5l9 7-9 7V5z" fill="currentColor"></path></svg>',close:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6L6 18"></path><path d="M6 6l12 12"></path></svg>',trash:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path></svg>',plus:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>',check:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5"></path></svg>',volume:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l5 4V6L8 10H4z" fill="currentColor"></path><path d="M16 9a5 5 0 0 1 0 6"></path><path d="M18.8 6.2a9 9 0 0 1 0 11.6"></path></svg>',mute:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l5 4V6L8 10H4z" fill="currentColor"></path><path d="M22 9l-6 6"></path><path d="M16 9l6 6"></path></svg>',queue:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M3 11h18"></path><path d="M3 16h10"></path><polygon points="17,13 22,16 17,19" fill="currentColor" stroke="none"></polygon></svg>',repeat:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2l4 4-4 4"></path><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><path d="M7 22l-4-4 4-4"></path><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>',repeatOne:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2l4 4-4 4"></path><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><path d="M7 22l-4-4 4-4"></path><path d="M21 13v2a4 4 0 0 1-4 4H3"></path><text x="12" y="15" text-anchor="middle" font-size="7" font-weight="bold" fill="currentColor" stroke="none">1</text></svg>',link:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',notes:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 3 14 8 19 8"></polyline><line x1="8" y1="13" x2="16" y2="13"></line><line x1="8" y1="17" x2="13" y2="17"></line></svg>',metadata:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"></path></svg>',moodboard:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect></svg>',users:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',analytics:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5"></path><path d="M4 19h16"></path><rect x="7" y="11" width="3" height="5" rx="1"></rect><rect x="12" y="7" width="3" height="9" rx="1"></rect><rect x="17" y="4" width="3" height="12" rx="1"></rect></svg>',export:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12"></path><path d="M7 8l5-5 5 5"></path><path d="M5 21h14a2 2 0 0 0 2-2v-4"></path><path d="M3 15v4a2 2 0 0 0 2 2"></path></svg>',external:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7"></path><path d="M10 14L21 3"></path><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"></path></svg>',settings:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 0-.33 1v.17a2 2 0 1 1-4 0V21a1.65 1.65 0 0 0-.33-1 1.65 1.65 0 0 0-1-.6 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 0-1-.33H2.83a2 2 0 1 1 0-4H3a1.65 1.65 0 0 0 1-.33 1.65 1.65 0 0 0 .6-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-.6 1.65 1.65 0 0 0 .33-1V2.83a2 2 0 1 1 4 0V3a1.65 1.65 0 0 0 .33 1 1.65 1.65 0 0 0 1 .6 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.1.31.1.65 0 1a1.65 1.65 0 0 0 .6 1 1.65 1.65 0 0 0 1 .33h.17a2 2 0 1 1 0 4H21a1.65 1.65 0 0 0-1 .33 1.65 1.65 0 0 0-.6 1z"></path></svg>',sort:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="6" y1="12" x2="18" y2="12"></line><line x1="9" y1="18" x2="15" y2="18"></line></svg>'},o={authenticated:!1,route:{type:"home"},projects:[],currentProject:null,sharedProject:null,player:{wavesurfer:null,queue:[],index:-1,track:null,sourceContext:null,autoplayOnReady:!1,volume:1,previousVolume:1,loop:"none",shuffle:!1},trackMenu:{trackId:null,notes:"",lyrics:"",todos:[],versions:[],activeVersionId:null,bpm:null,key:null,trackStatus:null,moodTags:[],listenCount:0,lufs:null,peakDb:null},metadataPanel:{colorPalette:[]},homeSort:{key:"updatedAt",dir:"desc"},settings:{trackTagVisibility:{...ie},previousPath:"/"}};let He=null,ue=null,pe=null;const pt=new Set;function k(e){return en[e]||""}function Ve(e,t,n){return Math.max(t,Math.min(n,e))}function u(e){return String(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#39;")}function Ce(e){return String(e||"").replace(/\u00a0/g," ").replace(/\r/g,"").trim()}function Fe(e){if(!Number.isFinite(e)||e<0)return"0:00";const t=Math.floor(e),n=Math.floor(t/60),a=String(t%60).padStart(2,"0");return`${n}:${a}`}function Ct(e){if(!Number.isFinite(e)||e<=0)return"0m";const t=Math.max(0,Math.round(e)),n=Math.floor(t/3600),a=Math.floor(t%3600/60),r=t%60;return n>0?`${n}h ${String(a).padStart(2,"0")}m`:a>0?`${a}m ${String(r).padStart(2,"0")}s`:`${r}s`}function tn(e){const t=Number(e);if(!Number.isFinite(t)||t<=0)return"-";const n=t/(1024*1024);if(n>=1)return`${n.toFixed(1)} MB`;const a=t/1024;return`${Math.max(1,Math.round(a))} KB`}function Tt(e){const t=String(e||"listen"),n=Lt.find(a=>a.value===t);return n?n.label:"See + Listen"}function nn(e="listen"){return Lt.map(t=>{const n=t.value===e?"selected":"";return`<option value="${u(t.value)}" ${n}>${u(t.label)}</option>`}).join("")}function Bt(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleDateString(void 0,{month:"short",day:"numeric"})}function Te(e){const t=Math.random().toString(36).slice(2,9);return`${e}-${Date.now()}-${t}`}function ge(e,t){if(!e)return;const n=e.querySelector(".marquee-inner")||e;n.textContent=t,e.classList.remove("is-scrolling"),e.style.removeProperty("--marquee-offset"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{et(e)})})}function et(e){if(!e)return;const t=e.querySelector(".marquee-inner")||e;e.classList.remove("is-scrolling"),e.style.removeProperty("--marquee-offset");const n=t.scrollWidth-e.clientWidth;n>2&&(e.style.setProperty("--marquee-offset",`-${n}px`),e.classList.add("is-scrolling"))}function Be(e){return String(e||"").replace(/\r/g,"").trim().slice(0,220)}function ze(e){if(typeof e=="string"){const a=Be(e);return a?{id:Te("todo"),text:a,done:!1}:null}if(!e||typeof e!="object")return null;const t=Be(e.text);return t?{id:String(e.id||"").trim().slice(0,80)||Te("todo"),text:t,done:!!e.done}:null}function tt(e){return Array.isArray(e)?e.map(t=>ze(t)).filter(t=>t!==null):typeof e=="string"?e.split(`
`).map(t=>ze(t)).filter(t=>t!==null):[]}function De(e){const t=e&&typeof e=="object"?e:{},n={};return Object.keys(ie).forEach(a=>{n[a]=typeof t[a]=="boolean"?t[a]:ie[a]}),n}function an(){try{const e=window.localStorage.getItem(xt);if(!e){o.settings.trackTagVisibility={...ie};return}const t=JSON.parse(e);o.settings.trackTagVisibility=De(t&&t.trackTagVisibility)}catch{o.settings.trackTagVisibility={...ie}}}function mt(){try{const e={trackTagVisibility:De(o.settings.trackTagVisibility)};window.localStorage.setItem(xt,JSON.stringify(e))}catch{}}function At(e={}){const{delayMs:t=650,getSnapshot:n,saveSnapshot:a,onError:r}=e;let s=null,c=!1,i=!1,l=null;function p(){if(typeof n!="function")return null;const I=n();return I?{snapshot:I,key:JSON.stringify(I)}:null}async function h(){const I=p();if(!(!I||I.key===l)){if(c){i=!0;return}c=!0;try{await a(I.snapshot),l=I.key}catch(L){typeof r=="function"&&r(L)}finally{c=!1,i&&(i=!1,h())}}}function m(){s&&window.clearTimeout(s),s=window.setTimeout(()=>{s=null,h()},t)}async function d(){s&&(window.clearTimeout(s),s=null),await h()}function g(){const I=p();l=I?I.key:null}function w(I={}){const{flush:L=!1,fireAndForget:f=!1}=I;return s&&(window.clearTimeout(s),s=null),L?f?(h(),Promise.resolve()):h():Promise.resolve()}return g(),{schedule:m,flush:d,destroy:w,markCurrentAsSaved:g}}function A(){return o.route&&o.route.type==="share"}function W(){return A()?o.route.token:null}function C(){return A()?o.sharedProject:o.currentProject}function on(){const e=C();return(e&&e.artist?String(e.artist).trim():"")||"Unknown Artist"}function G(){const e=C();return e?A()?!!e.canEdit:!0:!1}function Ue(){const e=C();return e?A()?!!e.canListen:!0:!1}function rn(e){return!e||!Array.isArray(e.versions)||!e.versions.length?null:e.versions.find(t=>t.id===e.activeVersionId)||e.versions[0]}function ke(e){const t=C();return(t&&Array.isArray(t.tracks)?t.tracks:[]).find(a=>a.id===e)||null}function sn(e){const t=[...e];for(let n=t.length-1;n>0;n-=1){const a=Math.floor(Math.random()*(n+1));[t[n],t[a]]=[t[a],t[n]]}return t}function M(e){Ie&&(Ie.textContent=e,Ie.classList.remove("hidden"),He&&window.clearTimeout(He),He=window.setTimeout(()=>{Ie.classList.add("hidden")},2600))}function te(e,t){!e||e.classList.contains("hidden")||(e.classList.add("is-closing"),window.setTimeout(()=>{e.classList.add("hidden"),e.classList.remove("is-closing")},200))}function nt(e){return new Promise(t=>{const n=document.getElementById("confirm-dialog"),a=document.getElementById("confirm-dialog-message"),r=document.getElementById("confirm-dialog-ok"),s=document.getElementById("confirm-dialog-cancel");a.textContent=e,n.classList.remove("hidden");function c(){te(n),r.removeEventListener("click",i),s.removeEventListener("click",l)}function i(){c(),t(!0)}function l(){c(),t(!1)}r.addEventListener("click",i),s.addEventListener("click",l)})}async function T(e,t={}){const{method:n="GET",body:a,allowUnauthorized:r=!1}=t,s={method:n,credentials:"include",headers:{}};a instanceof FormData?s.body=a:a!==void 0&&(s.body=JSON.stringify(a),s.headers["Content-Type"]="application/json");const c=await fetch(e,s),l=(c.headers.get("content-type")||"").includes("application/json")?await c.json().catch(()=>({})):await c.text();if(!c.ok){if(c.status===401&&!r){const h=new Error("Authentication required");throw h.code="AUTH_REQUIRED",h}const p=new Error(l&&l.error?l.error:`Request failed (${c.status})`);throw p.code=c.status===401?"AUTH_REQUIRED":"REQUEST_FAILED",p}return l}function cn(){const t=(window.location.pathname.replace(/\/+$/,"")||"/").split("/").filter(Boolean);return t[0]==="settings"?{type:"settings"}:t[0]==="share"&&t[1]?{type:"share",token:decodeURIComponent(t[1])}:t[0]==="project"&&t[1]?{type:"project",projectId:decodeURIComponent(t[1])}:{type:"home"}}function R(e){const t=window.location.pathname.replace(/\/+$/,"")||"/";e==="/settings"&&t!=="/settings"&&(o.settings.previousPath=t),window.location.pathname!==e&&window.history.pushState({},"",e),_e()}function ln(e){return{id:e.id,title:e.title,artist:e.artist,description:e.description,status:e.status,coverUrl:e.coverUrl,trackCount:Array.isArray(e.tracks)?e.tracks.length:0,totalRuntimeSeconds:Number(e.totalRuntimeSeconds)||0,shareUrl:e.shareUrl,shareLinks:Array.isArray(e.shareLinks)?e.shareLinks:[],completionPercent:e.completionPercent||0,starRating:e.starRating||0,startDate:e.startDate||null,releaseDate:e.releaseDate||null,createdAt:e.createdAt,updatedAt:e.updatedAt}}function Re(e){const t=ln(e),n=o.projects.findIndex(a=>a.id===t.id);if(n>=0){o.projects.splice(n,1,t);return}o.projects.unshift(t)}function dn(e){o.projects=o.projects.filter(t=>t.id!==e)}async function ft(e){if(e)try{await navigator.clipboard.writeText(e),M("Share link copied");return}catch{const n=document.createElement("input");n.value=e,document.body.appendChild(n),n.select(),document.execCommand("copy"),document.body.removeChild(n),M("Share link copied")}}function re(e,t=!1){B.innerHTML=`
    <section class="view">
      <div class="empty-state">
        <h2>Studio</h2>
        <p>${u(e||"Something went wrong")}</p>
        ${t?'<button id="error-home-button" class="primary-button" type="button">Back Home</button>':""}
      </div>
    </section>
  `;const n=document.getElementById("error-home-button");n&&n.addEventListener("click",()=>R("/"))}function he(){if(!o.player.wavesurfer||!xe)return;const e=o.player.wavesurfer.isPlaying();xe.innerHTML=k(e?"pause":"play"),Y&&Y.classList.toggle("is-playing",e)}function Pt(e){ve&&(ve.value=String(e)),Q&&(Q.innerHTML=e>0?k("volume"):k("mute"))}function ht(){if(!O)return;const e=o.player.loop;e==="one"?(O.innerHTML=k("repeatOne"),O.classList.add("is-active"),O.title="Loop: one"):e==="all"?(O.innerHTML=k("repeat"),O.classList.add("is-active"),O.title="Loop: all"):(O.innerHTML=k("repeat"),O.classList.remove("is-active"),O.title="Loop: off")}function yt(){de&&(de.classList.toggle("is-active",o.player.shuffle),de.title=o.player.shuffle?"Shuffle: on":"Shuffle: off")}function un(){if(!$e)return;const e=o.player.queue||[];if(!e.length){$e.innerHTML='<p class="player-queue-empty">No tracks in queue</p>';return}$e.innerHTML=e.map((t,n)=>`
    <button class="player-queue-item${n===o.player.index?" is-active":""}" type="button" data-queue-index="${n}">
      <span class="player-queue-num">${n+1}</span>
      <span class="player-queue-name">${u(t.title||t.originalName||"Untitled")}</span>
    </button>
  `).join(""),$e.querySelectorAll("[data-queue-index]").forEach(t=>{t.addEventListener("click",()=>{const n=parseInt(t.dataset.queueIndex,10);we(n),Ke()})})}function Ke(){J&&(J.classList.remove("is-open"),J.setAttribute("aria-hidden","true"))}function fe(e){const t=Ve(Number(e),0,1);o.player.volume=t,t>0&&(o.player.previousVolume=t),o.player.wavesurfer&&o.player.wavesurfer.setVolume(t),Pt(t)}function pn(){if(!Y)return;const e=o.route.type==="share"?o.sharedProject:o.currentProject;if(dt&&ge(dt,e&&e.title?e.title:""),e&&e.coverUrl){Y.style.backgroundImage=`url("${e.coverUrl}?v=${e.activeCoverId||""}")`,Y.classList.add("has-image"),Y.textContent="";return}Y.style.backgroundImage="",Y.classList.remove("has-image");const t=e&&e.title?String(e.title).charAt(0).toUpperCase():"S";Y.textContent=t}function ce(){const e=o.player.track?o.player.track.id:null,t=!!(o.player.wavesurfer&&o.player.wavesurfer.isPlaying());B.querySelectorAll(".track-row[data-track-id]").forEach(r=>{const s=!!(e&&r.dataset.trackId===e);r.classList.toggle("is-active",s);const c=r.querySelector(".track-play-button");c&&(c.innerHTML=k(s&&t?"pause":"play"),c.title=s&&t?"Pause track":"Play track")});const a=document.getElementById("play-all-button");if(a){const r=C()&&C().tracks||[],s=!!(e&&r.some(c=>c.id===e));a.innerHTML=k(s&&t?"pause":"play"),a.title=s&&t?"Pause":"Play from start"}}function we(e){const t=o.player.queue||[];if(!t.length)return;let n=e;n<0&&(n=t.length-1),n>=t.length&&(n=0);const a=t[n];K(a,t,n)}function vt(){const e=o.player.queue||[];if(o.player.shuffle&&e.length>1){let t;do t=Math.floor(Math.random()*e.length);while(t===o.player.index);we(t)}else we(o.player.index+1)}function mn(){if(!o.player.track)return;if((o.player.wavesurfer?o.player.wavesurfer.getCurrentTime():0)<2){if(o.player.index<=0){o.player.wavesurfer&&o.player.wavesurfer.pause();return}we(o.player.index-1);return}o.player.wavesurfer&&o.player.wavesurfer.seekTo(0)}function bt(){const e=o.player.queue||[];if(!e.length)return;let t=-1;if(o.player.shuffle&&e.length>1)t=(o.player.index+1)%e.length;else if(t=o.player.index+1,t>=e.length)if(o.player.loop==="all")t=0;else return;const n=e[t];!n||!n.audioUrl||Se.src!==n.audioUrl&&(Se.src=n.audioUrl,Se.load())}function K(e,t,n){var s;if(!o.player.wavesurfer||!e){M("Waveform player is unavailable");return}if(!e.audioUrl){M("This link cannot play audio");return}if(o.player.track&&o.player.track.id===e.id&&o.player.track.audioUrl===e.audioUrl){o.player.wavesurfer.playPause();return}o.player.queue=t,o.player.index=n,o.player.track=e,o.player.sourceContext=A()?{type:"share",token:W()}:{type:"project",projectId:((s=C())==null?void 0:s.id)||null},o.player.autoplayOnReady=!0,e.id&&C()&&yn(e.id);const a=e.title||e.originalName||"Untitled Track";document.title=a+" — Studio",ge(Mt,a),ge($t,on()),Qe.textContent="0:00",Je.textContent="0:00",pn();const r=ae.classList.contains("hidden");ae.classList.remove("hidden"),r&&(ae.classList.add("player-entering"),window.setTimeout(()=>ae.classList.remove("player-entering"),360)),o.player.wavesurfer.load(e.audioUrl),ce(),he()}function fn(){if(!o.player.track||!o.player.sourceContext)return;const e=o.player.sourceContext;if(e.type==="share"&&e.token){if(o.route.type==="share"&&o.route.token===e.token)return;R(`/share/${encodeURIComponent(e.token)}`);return}if(e.type==="project"&&e.projectId){if(o.route.type==="project"&&o.route.projectId===e.projectId)return;R(`/project/${encodeURIComponent(e.projectId)}`)}}function hn(){if(!window.WaveSurfer||!it){M("Could not initialize waveform renderer");return}const e=document.createElement("audio");e.preload="auto",o.player.wavesurfer=WaveSurfer.create({container:it,media:e,waveColor:"rgba(255, 255, 255, 0.18)",progressColor:"#A89EFF",cursorColor:"#d9d4ff",barWidth:1.2,barGap:1.2,barRadius:2,height:30,normalize:!0,hideScrollbar:!0}),e.addEventListener("canplay",()=>{o.player.autoplayOnReady&&(o.player.autoplayOnReady=!1,e.volume=Ve(o.player.volume,0,1),e.play().catch(()=>{}),he(),bt())}),ct.innerHTML=k("prev"),lt.innerHTML=k("next"),xe.innerHTML=k("play"),Pt(o.player.volume);const t=r=>{Qe.textContent=Fe(r)};o.player.wavesurfer.on("ready",()=>{var r,s;Je.textContent=Fe(o.player.wavesurfer.getDuration()),o.player.autoplayOnReady&&(o.player.autoplayOnReady=!1,(s=(r=o.player.wavesurfer.play()).catch)==null||s.call(r,()=>{}),bt()),fe(o.player.volume),he()}),o.player.wavesurfer.on("audioprocess",()=>{t(o.player.wavesurfer.getCurrentTime())}),o.player.wavesurfer.on("timeupdate",r=>{t(r)}),o.player.wavesurfer.on("interaction",()=>{t(o.player.wavesurfer.getCurrentTime())}),o.player.wavesurfer.on("play",()=>{he(),ce()}),o.player.wavesurfer.on("pause",()=>{he(),ce()}),o.player.wavesurfer.on("finish",()=>{const r=o.player.loop;if(r==="one")o.player.wavesurfer.seekTo(0),o.player.wavesurfer.play();else if(r==="all")vt();else{const s=o.player.index+1;s<(o.player.queue||[]).length&&we(s)}}),o.player.wavesurfer.on("error",()=>{M("Could not load track")}),xe.addEventListener("click",()=>{if(!o.player.track){const r=o.player.queue||[];r.length&&K(r[0],r,0);return}o.player.wavesurfer.playPause()}),ct.addEventListener("click",mn),lt.addEventListener("click",vt),ut&&ut.addEventListener("click",fn),ve&&ve.addEventListener("input",()=>{fe(ve.value)});const n=Q?Q.nextElementSibling:null;Q&&Q.addEventListener("click",()=>{if(window.matchMedia("(pointer: coarse)").matches){n&&n.classList.toggle("is-open");return}if(o.player.volume<=.001){fe(o.player.previousVolume||.85);return}o.player.previousVolume=o.player.volume,fe(0)});const a=Q?Q.closest(".player-volume"):null;a&&a.addEventListener("wheel",r=>{r.preventDefault();const s=r.deltaY<0?.05:-.05;fe(Ve(o.player.volume+s,0,1))},{passive:!1}),document.addEventListener("click",r=>{n&&n.classList.contains("is-open")&&!n.contains(r.target)&&r.target!==Q&&n.classList.remove("is-open")}),de&&(de.innerHTML=k("shuffle"),yt(),de.addEventListener("click",()=>{o.player.shuffle=!o.player.shuffle,yt()})),O&&(ht(),O.addEventListener("click",()=>{const r=["none","all","one"],s=r.indexOf(o.player.loop);o.player.loop=r[(s+1)%r.length],ht()})),Me&&(Me.innerHTML=k("queue"),Me.addEventListener("click",()=>{J.classList.contains("is-open")?Ke():(un(),J.classList.add("is-open"),J.setAttribute("aria-hidden","false"))})),document.addEventListener("click",r=>{J&&J.classList.contains("is-open")&&!J.contains(r.target)&&r.target!==Me&&Ke()})}async function yn(e){try{const t=A()?`/api/share/${encodeURIComponent(W())}/tracks/${encodeURIComponent(e)}/play`:`/api/projects/${encodeURIComponent(C().id)}/tracks/${encodeURIComponent(e)}/play`,n=await T(t,{method:"POST"}),a=C();if(a&&Array.isArray(a.tracks)){const r=a.tracks.find(s=>s.id===e);r&&(r.listenCount=n.listenCount)}if(le(e),o.trackMenu.trackId===e){o.trackMenu.listenCount=n.listenCount;const r=document.getElementById("track-listen-count");r&&(r.textContent=`Played ${n.listenCount} time${n.listenCount!==1?"s":""}`)}}catch{}}function vn(e,t){const n=Math.min(e.length,t*180);if(n<t*6)return null;const r=Math.max(1,Math.floor(t/22050)),s=t/r,c=Math.floor(n/r);if(c<4096)return null;const i=new Float32Array(c);for(let E=0;E<c;E++)i[E]=e[E*r]||0;for(let E=c-1;E>=1;E--)i[E]=i[E]-.97*i[E-1];i[0]=0;const l=Math.max(1,Math.round(s/200)),p=Math.floor(c/l);if(p<256)return null;const h=new Float32Array(p);for(let E=0;E<p;E++){const _=E*l;let q=0;for(let X=0;X<l;X++)q+=Math.abs(i[_+X]||0);h[E]=q/l}const m=new Float32Array(p),d=7;let g=0;for(let E=0;E<p;E++)g+=h[E],E>=d&&(g-=h[E-d]),m[E]=g/Math.min(d,E+1);const w=new Float32Array(p);let I=0;for(let E=1;E<p;E++){const _=m[E]-m[E-1],q=_>0?_:0;w[E]=q,I+=q}I/=Math.max(1,p-1);const L=I*1.55,y=Math.max(1,Math.round(60/220*(s/l))),b=[];let x=-y;for(let E=1;E<p-1;E++){const _=w[E];_<L||_>=w[E-1]&&_>=w[E+1]&&E-x>=y&&(b.push(E),x=E)}if(b.length<8)return null;const v=s/l,$=new Map,S=12;for(let E=0;E<b.length;E++){const _=b[E],q=Math.min(b.length,E+S);for(let X=E+1;X<q;X++){const st=b[X]-_;if(st<=0)continue;let ee=60*v/st;for(;ee<70;)ee*=2;for(;ee>180;)ee/=2;if(ee<70||ee>180)continue;const qe=Math.round(ee),Ft=S-(X-E)+1,zt=Math.max(0,1-Math.abs(ee-qe)),Kt=Ft*(.7+.3*zt);$.set(qe,($.get(qe)||0)+Kt)}}if(!$.size)return null;let P=0,D=-1/0;for(const[E,_]of $.entries()){const q=_+($.get(E-1)||0)+($.get(E+1)||0);q>D&&(D=q,P=E)}let Z=0,ne=0;for(let E=-1;E<=1;E++){const _=P+E,q=$.get(_)||0;Z+=_*q,ne+=q}return ne>0?Math.round(Z/ne):P}function bn(e,t){const n=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],a=new Float32Array(12),r=Math.min(e.length,t*30),s=8192;for(let d=0;d<12;d++)for(let g=2;g<=5;g++){const w=36+d+(g-2)*12,I=440*Math.pow(2,(w-69)/12);if(I>=t/2||I<20)continue;const L=2*Math.cos(2*Math.PI*I/t);let f=0,y=0;for(let b=0;b+s<=r;b+=s){let x=0,v=0;for(let $=0;$<s;$++){const S=e[b+$]+L*x-v;v=x,x=S}f+=x*x+v*v-L*x*v,y++}a[d]+=y>0?f/y:0}const c=Math.max(...a);if(c>0)for(let d=0;d<12;d++)a[d]/=c;const i=[6.35,2.23,3.48,2.33,4.38,4.09,2.52,5.19,2.39,3.66,2.29,2.88],l=[6.33,2.68,3.52,5.38,2.6,3.53,2.54,4.75,3.98,2.69,3.34,3.17];function p(d,g){let w=0,I=0;for(let b=0;b<12;b++)w+=a[b],I+=d[(b+g)%12];w/=12,I/=12;let L=0,f=0,y=0;for(let b=0;b<12;b++){const x=a[b]-w,v=d[(b+g)%12]-I;L+=x*v,f+=x*x,y+=v*v}return f*y>0?L/Math.sqrt(f*y):0}let h=null,m=-1/0;for(let d=0;d<12;d++){const g=p(i,d),w=p(l,d);g>m&&(m=g,h=n[d]+" Major"),w>m&&(m=w,h=n[d]+" Minor")}return h}async function jt(e){const t=await fetch(e,{credentials:"include"});if(!t.ok)throw new Error("Could not fetch audio file for analysis");const n=await t.arrayBuffer(),a=new(window.AudioContext||window.webkitAudioContext);let r;try{r=await new Promise((w,I)=>{a.decodeAudioData(n,w,I)})}finally{a.close()}const s=r.numberOfChannels,c=r.length,i=new Float32Array(c);let l=0,p=0;for(let w=0;w<s;w++){const I=r.getChannelData(w);let L=0;for(let f=0;f<c;f++){const y=I[f];i[f]+=y;const b=y<0?-y:y;b>p&&(p=b),L+=y*y}l+=L/c}for(let w=0;w<c;w++)i[w]/=s;const h=l>0?Math.round((-.691+10*Math.log10(l))*10)/10:null,m=p>0?Math.round(20*Math.log10(p)*10)/10:null,d=vn(i,r.sampleRate),g=bn(i,r.sampleRate);return{lufs:h,peakDb:m,bpm:d,key:g}}async function gn(e,t){if(o.trackMenu.trackId!==e)return;const n=document.getElementById("track-lufs-analyze");n&&(n.disabled=!0,n.textContent="Detecting…");try{const a=await jt(t);if(o.trackMenu.trackId!==e)return;o.trackMenu.lufs=a.lufs,o.trackMenu.peakDb=a.peakDb,o.trackMenu.bpm===null&&(o.trackMenu.bpm=a.bpm),o.trackMenu.key===null&&(o.trackMenu.key=a.key),ot(),V(),F()}catch{}finally{if(o.trackMenu.trackId===e){const a=document.getElementById("track-lufs-analyze");a&&(a.disabled=!1),rt()}}}async function kn(){const e=await T("/api/projects");o.projects=e.projects||[]}async function wn(e){const t=await T(`/api/projects/${encodeURIComponent(e)}`);o.currentProject=t.project,Re(t.project)}function H(e){A()&&(o.sharedProject=e),o.currentProject=e,Re(e)}async function oe(e){const t=C();if(!t)return;const n=A()?`/api/share/${encodeURIComponent(W())}/project`:`/api/projects/${encodeURIComponent(t.id)}`,a=await T(n,{method:"PATCH",body:e});H(a.project)}async function at(e,t,n){const a=A()?`/api/share/${encodeURIComponent(W())}/tracks/${encodeURIComponent(t)}`:`/api/projects/${encodeURIComponent(e)}/tracks/${encodeURIComponent(t)}`,r=await T(a,{method:"PATCH",body:n});H(r.project)}function En(e,t){return!e||!Array.isArray(e.tracks)?null:e.tracks.find(n=>n.id===t)||null}function Mn(e,t){const n=C(),a=En(n,e);!a||!t||typeof t!="object"||(Object.assign(a,t),n&&Re(n))}function $n(e){return window.CSS&&typeof window.CSS.escape=="function"?window.CSS.escape(String(e)):String(e).replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function le(e){const t=C();if(!t||!Array.isArray(t.tracks))return;const n=t.tracks.findIndex(p=>p.id===e);if(n<0)return;const a=B.querySelector(`.track-row[data-track-id="${$n(e)}"]`);if(!a)return;const r=document.createElement("template");r.innerHTML=Ot(t.tracks[n],n).trim();const s=r.content.firstElementChild,c=a.querySelector(".track-main"),i=s&&s.querySelector(".track-main");if(!c||!i)return;c.replaceWith(i);const l=a.querySelector(".track-index");if(l&&(l.textContent=String(n+1)),G()){const p=a.querySelector("[data-track-field]");if(p){const h=p.dataset.trackField;ye(p,async m=>{await at(t.id,e,{[h]:m}),le(e)},{singleLine:!0})}}a.querySelectorAll(".track-badge.marquee-wrap").forEach(et),ce()}function _t(){if(!o.trackMenu.trackId)return null;const e=document.getElementById("track-menu-notes"),t=document.getElementById("track-menu-lyrics"),n=document.getElementById("track-bpm-input"),a=document.getElementById("track-key-select"),r=document.getElementById("track-status-select"),s=String(e?e.value:o.trackMenu.notes).slice(0,4e3),c=String(t?t.value:o.trackMenu.lyrics).slice(0,12e3),i=n?n.value!==""?Number(n.value):null:o.trackMenu.bpm,l=a?a.value||null:o.trackMenu.key,p=r?r.value||null:o.trackMenu.trackStatus,h=(o.trackMenu.todos||[]).map(m=>ze(m)).filter(m=>m!==null);return{trackId:o.trackMenu.trackId,notes:s,lyrics:c,todos:h,bpm:i,key:l,trackStatus:p,moodTags:[...o.trackMenu.moodTags||[]],lufs:o.trackMenu.lufs,peakDb:o.trackMenu.peakDb}}function V(){const e=_t();e&&(Mn(e.trackId,{notes:e.notes,lyrics:e.lyrics,todos:e.todos,bpm:e.bpm,key:e.key,trackStatus:e.trackStatus,moodTags:e.moodTags,lufs:e.lufs,peakDb:e.peakDb}),le(e.trackId))}async function In(e,t){!t||!t.trackId||(await at(e,t.trackId,{notes:t.notes,lyrics:t.lyrics,todos:t.todos,bpm:t.bpm,key:t.key,trackStatus:t.trackStatus,moodTags:t.moodTags,lufs:t.lufs,peakDb:t.peakDb}),le(t.trackId))}function Sn(e){me({flush:!0,fireAndForget:!0}),ue=At({delayMs:700,getSnapshot:_t,saveSnapshot:async t=>{await In(e,t)},onError:t=>{M(t.message||"Could not autosave track details")}})}function F(){ue&&ue.schedule()}function me(e={}){if(!ue)return Promise.resolve();const t=ue;return ue=null,t.destroy(e)}function Ln(){var i,l,p,h,m,d;const e=((i=document.getElementById("meta-start-date-btn"))==null?void 0:i.dataset.value)||"",t=((l=document.getElementById("meta-release-date-btn"))==null?void 0:l.dataset.value)||"",n=Math.max(0,Math.min(100,Math.round(Number(((p=document.getElementById("meta-completion-range"))==null?void 0:p.value)||0)))),a=Number((h=document.getElementById("meta-star-rating"))==null?void 0:h.dataset.rating)||0,r=String(((m=document.getElementById("meta-presave-link"))==null?void 0:m.value)||"").trim(),s=String(((d=document.getElementById("meta-distributor-notes"))==null?void 0:d.value)||""),c={};return B.querySelectorAll(".stream-checkbox").forEach(g=>{c[g.dataset.platform]=g.checked}),{startDate:e||null,releaseDate:t||null,completionPercent:n,starRating:a,colorPalette:[...o.metadataPanel.colorPalette],streamingChecklist:c,preSaveLink:r,distributorNotes:s}}function xn(){Ee({flush:!1}),pe=At({delayMs:700,getSnapshot:Ln,saveSnapshot:async e=>{await oe(e)},onError:e=>{M(e.message||"Could not autosave metadata")}})}function z(){pe&&pe.schedule()}function Ee(e={}){if(!pe)return Promise.resolve();const t=pe;return pe=null,t.destroy(e)}async function Cn(e,t,n){const a=new FormData;a.append("track",n);const r=A()?`/api/share/${encodeURIComponent(W())}/tracks/${encodeURIComponent(t)}/versions`:`/api/projects/${encodeURIComponent(e)}/tracks/${encodeURIComponent(t)}/versions`,s=await T(r,{method:"POST",body:a});H(s.project)}async function Tn(e,t,n){const a=A()?`/api/share/${encodeURIComponent(W())}/tracks/${encodeURIComponent(t)}/versions/${encodeURIComponent(n)}/select`:`/api/projects/${encodeURIComponent(e)}/tracks/${encodeURIComponent(t)}/versions/${encodeURIComponent(n)}/select`,r=await T(a,{method:"POST"});H(r.project)}async function Bn(e,t,n){const a=A()?`/api/share/${encodeURIComponent(W())}/tracks/${encodeURIComponent(t)}/versions/${encodeURIComponent(n)}`:`/api/projects/${encodeURIComponent(e)}/tracks/${encodeURIComponent(t)}/versions/${encodeURIComponent(n)}`,r=await T(a,{method:"DELETE"});H(r.project)}async function An(e,t){const n=`/api/projects/${encodeURIComponent(e)}/covers/${encodeURIComponent(t)}`,a=await T(n,{method:"DELETE"});H(a.project)}async function Pn(e,t){const n=new FormData;n.append("cover",t);const a=A()?`/api/share/${encodeURIComponent(W())}/cover`:`/api/projects/${encodeURIComponent(e)}/cover`,r=await T(a,{method:"POST",body:n});H(r.project)}async function jn(e,t){const n=A()?`/api/share/${encodeURIComponent(W())}/covers/${encodeURIComponent(t)}/select`:`/api/projects/${encodeURIComponent(e)}/covers/${encodeURIComponent(t)}/select`,a=await T(n,{method:"POST"});H(a.project)}function Ge(e={}){const{flushAutosave:t=!0}=e;me(t?{flush:!0,fireAndForget:!0}:{flush:!1});const n=document.getElementById("track-menu-overlay");n&&(te(n),n.setAttribute("aria-hidden","true")),o.trackMenu={trackId:null,notes:"",lyrics:"",todos:[],versions:[],activeVersionId:null,bpm:null,key:null,trackStatus:null,moodTags:[],listenCount:0,lufs:null,peakDb:null}}function Ae(){const e=document.getElementById("track-todo-list");if(!e)return;const t=G(),n=o.trackMenu.todos||[];if(!n.length){e.innerHTML='<p class="todo-empty">No todos yet.</p>';return}e.innerHTML=n.map((a,r)=>`
        <div class="todo-row ${a.done?"done":""}" data-todo-row="${r}">
          <label class="todo-toggle" aria-label="Toggle todo">
            <input type="checkbox" data-todo-toggle="${r}" ${a.done?"checked":""} ${t?"":"disabled"} />
            <span>${k("check")}</span>
          </label>
          <input
            class="todo-text-input"
            type="text"
            value="${u(a.text)}"
            maxlength="220"
            data-todo-text="${r}"
            ${t?"":"disabled"}
          />
          <button
            class="icon-button todo-remove-button"
            type="button"
            aria-label="Remove todo"
            data-todo-remove="${r}"
            ${t?"":"disabled"}
          >${k("close")}</button>
        </div>
      `).join(""),t&&(e.querySelectorAll("[data-todo-toggle]").forEach(a=>{a.addEventListener("change",()=>{const r=Number.parseInt(a.dataset.todoToggle,10);!Number.isFinite(r)||!o.trackMenu.todos[r]||(o.trackMenu.todos[r].done=a.checked,Ae(),V(),F())})}),e.querySelectorAll("[data-todo-text]").forEach(a=>{a.addEventListener("input",()=>{const r=Number.parseInt(a.dataset.todoText,10);!Number.isFinite(r)||!o.trackMenu.todos[r]||(o.trackMenu.todos[r].text=Be(a.value),V(),F())})}),e.querySelectorAll("[data-todo-remove]").forEach(a=>{a.addEventListener("click",()=>{const r=Number.parseInt(a.dataset.todoRemove,10);Number.isFinite(r)&&(o.trackMenu.todos.splice(r,1),Ae(),V(),F())})}))}function We(e){if(!e)return;const t=document.getElementById("track-menu-title"),n=document.getElementById("track-menu-subtitle");if(!t||!n)return;const a=[];e.trackNumber!==null&&e.trackNumber!==void 0&&e.trackNumber!==""&&a.push(`Track ${e.trackNumber}`),e.originalName&&a.push(e.originalName),e.versionCount>1&&a.push(`${e.versionCount} versions`),t.textContent=e.title||e.originalName||"Untitled track",n.textContent=a.join(" | ")}function Pe(){const e=document.getElementById("track-version-list");if(!e)return;const t=G(),n=Array.isArray(o.trackMenu.versions)?o.trackMenu.versions:[];if(!n.length){e.innerHTML='<p class="todo-empty">No versions yet.</p>';return}e.innerHTML=n.map(a=>{const r=a.id===o.trackMenu.activeVersionId,s=[];return Number.isFinite(a.durationSeconds)&&s.push(Fe(a.durationSeconds)),Number.isFinite(a.sizeBytes)&&s.push(tn(a.sizeBytes)),`
        <div class="version-row ${r?"active":""}" data-version-row="${u(a.id)}">
          <div class="version-main">
            <div class="version-title">${u(a.originalName||"Untitled version")}</div>
            <div class="version-meta">${u(s.join(" • ")||"No metadata")}</div>
          </div>
          <div class="version-actions">
            <button class="secondary-button version-use-button" type="button" data-version-select="${u(a.id)}" ${t?"":"disabled"}>${r?"Active":"Use"}</button>
            <button class="icon-button version-delete-button" type="button" data-version-delete="${u(a.id)}" aria-label="Delete version" title="Delete version" ${t&&n.length>1?"":"disabled"}>${k("trash")}</button>
          </div>
        </div>
      `}).join(""),t&&(e.querySelectorAll("[data-version-select]").forEach(a=>{a.addEventListener("click",async()=>{const r=a.dataset.versionSelect;if(!r||!o.trackMenu.trackId)return;const s=C();if(s)try{await Tn(s.id,o.trackMenu.trackId,r);const c=ke(o.trackMenu.trackId);if(c&&(o.trackMenu.versions=Array.isArray(c.versions)?[...c.versions]:[],o.trackMenu.activeVersionId=c.activeVersionId||null,We(c)),o.player.track&&o.player.track.id===o.trackMenu.trackId&&c){const i=C()&&C().tracks||[],l=i.findIndex(p=>p.id===c.id);l>=0&&K(i[l],i,l)}Pe(),le(o.trackMenu.trackId),M("Switched track version")}catch(c){M(c.message||"Could not switch version")}})}),e.querySelectorAll("[data-version-delete]").forEach(a=>{a.addEventListener("click",async()=>{const r=a.dataset.versionDelete;if(!r||!o.trackMenu.trackId||!await nt("Delete this track version?"))return;const s=C();if(s)try{await Bn(s.id,o.trackMenu.trackId,r);const c=ke(o.trackMenu.trackId);if(c&&(o.trackMenu.versions=Array.isArray(c.versions)?[...c.versions]:[],o.trackMenu.activeVersionId=c.activeVersionId||null,We(c)),o.player.track&&o.player.track.id===o.trackMenu.trackId&&c&&c.audioUrl!==o.player.track.audioUrl){const i=C()&&C().tracks||[],l=i.findIndex(p=>p.id===c.id);l>=0&&K(i[l],i,l)}Pe(),le(o.trackMenu.trackId),M("Track version deleted")}catch(c){M(c.message||"Could not delete version")}})}))}function gt(){const e=document.getElementById("track-todo-input");if(!e)return;const t=Be(e.value);t&&(o.trackMenu.todos.push({id:Te("todo"),text:t,done:!1}),e.value="",Ae(),V(),F())}function _n(e){me({flush:!0,fireAndForget:!0});const t=ke(e);if(!t)return;o.trackMenu.trackId=t.id,o.trackMenu.notes=String(t.notes||""),o.trackMenu.lyrics=String(t.lyrics||""),o.trackMenu.todos=tt(t.todos),o.trackMenu.versions=Array.isArray(t.versions)?[...t.versions]:[],o.trackMenu.activeVersionId=t.activeVersionId||null,o.trackMenu.bpm=t.bpm??null,o.trackMenu.key=t.key||null,o.trackMenu.trackStatus=t.trackStatus||null,o.trackMenu.moodTags=Array.isArray(t.moodTags)?[...t.moodTags]:[],o.trackMenu.listenCount=t.listenCount||0,o.trackMenu.lufs=t.lufs??null,o.trackMenu.peakDb=t.peakDb??null;const n=document.getElementById("track-menu-title"),a=document.getElementById("track-menu-subtitle"),r=document.getElementById("track-menu-notes"),s=document.getElementById("track-menu-lyrics"),c=document.getElementById("track-todo-input"),i=document.getElementById("track-menu-overlay");if(!i||!n||!a||!r||!s)return;const l=[];t.trackNumber!==null&&t.trackNumber!==void 0&&t.trackNumber!==""&&l.push(`Track ${t.trackNumber}`),t.originalName&&l.push(t.originalName),t.versionCount>1&&l.push(`${t.versionCount} versions`),n.textContent=t.title||t.originalName||"Untitled track",a.textContent=l.join(" | "),r.value=o.trackMenu.notes,s.value=o.trackMenu.lyrics,c&&(c.value=""),i.classList.remove("hidden","is-closing"),i.setAttribute("aria-hidden","false"),Ae(),Pe(),ot();const p=C();G()&&p&&p.id&&Sn(p.id),G()&&t.audioUrl&&t.bpm===null&&t.key===null&&t.lufs===null&&setTimeout(()=>gn(t.id,t.audioUrl),300)}async function Dn(e){if(!o.trackMenu.trackId||!await nt("Delete this track from the project?"))return;const t=A()?`/api/share/${encodeURIComponent(W())}/tracks/${encodeURIComponent(o.trackMenu.trackId)}`:`/api/projects/${encodeURIComponent(e)}/tracks/${encodeURIComponent(o.trackMenu.trackId)}`,n=await T(t,{method:"DELETE"});H(n.project),Ge({flushAutosave:!1}),N()}function ot(){const e=G(),t=document.getElementById("track-bpm-input");t&&(t.value=o.trackMenu.bpm!==null?String(o.trackMenu.bpm):"",t.disabled=!e);const n=document.getElementById("track-key-select");n&&(n.value=o.trackMenu.key||"",n.disabled=!e,Ut(n));const a=document.getElementById("track-camelot-badge");if(a){const i=o.trackMenu.key?Ze[o.trackMenu.key]:null,l=i?Xe[i]||"#888":null;i&&l?(a.textContent=i,a.style.cssText=`background:${l}26;color:${l};border-color:${l}55`,a.hidden=!1):(a.textContent="",a.style.cssText="",a.hidden=!0)}const r=document.getElementById("track-status-select");r&&(r.value=o.trackMenu.trackStatus||"",r.disabled=!e,Dt(r));const s=document.getElementById("track-mood-tags");s&&Rt(s,e,()=>{V(),F()});const c=document.getElementById("track-listen-count");if(c){const i=o.trackMenu.listenCount||0;c.textContent=`Played ${i} time${i!==1?"s":""}`}rt()}function Dt(e){if(!e)return;const t=e.value,n=t&&It[t]||"";e.style.borderColor=n?n+"88":"",e.style.color=n||"",e.style.boxShadow=n?`0 0 0 1px ${n}44`:""}function Ut(e){e&&e.classList.toggle("is-empty",!e.value)}function Un(e){if(!e)return"";const t=Ze[e];if(!t)return"";const n=Xe[t]||"#888";return`<span class="camelot-badge" style="background:${n}26;color:${n};border-color:${n}55">${u(t)}</span>`}function Rt(e,t,n){const a=o.trackMenu.moodTags||[];e.innerHTML=Jt.map(r=>{const s=a.includes(r),c=St[r]||"#555",i=s?`background:${c}33;border-color:${c};color:${c}`:"";return`<button
      class="mood-chip${s?" active":""}"
      type="button"
      data-mood="${u(r)}"
      style="${i}"
      ${t?"":"disabled"}
    >${u(r)}</button>`}).join(""),t&&e.querySelectorAll("[data-mood]").forEach(r=>{r.addEventListener("click",()=>{const s=r.dataset.mood,c=o.trackMenu.moodTags.indexOf(s);c>=0?o.trackMenu.moodTags.splice(c,1):o.trackMenu.moodTags.push(s),Rt(e,t,n),typeof n=="function"&&n()})})}function rt(){const e=document.getElementById("track-lufs-display"),t=document.getElementById("track-lufs-analyze");if(!e)return;const n=o.trackMenu.lufs,a=o.trackMenu.peakDb;n!==null||a!==null?e.innerHTML=[n!==null?`<span class="lufs-value"><span class="lufs-label">LUFS</span> ${n} dBFS</span>`:"",a!==null?`<span class="lufs-value"><span class="lufs-label">Peak</span> ${a} dBFS</span>`:""].filter(Boolean).join(""):e.innerHTML='<span class="lufs-empty">Not analyzed</span>',t&&(t.textContent=n!==null?"Re-analyze":"Analyze")}function Rn(e,t={}){const{canEdit:n=!1}=t,a=document.getElementById("track-menu-overlay"),r=document.getElementById("track-menu-close"),s=document.getElementById("track-menu-delete"),c=document.getElementById("track-menu-play"),i=document.getElementById("track-todo-add"),l=document.getElementById("track-todo-input"),p=document.getElementById("track-menu-notes"),h=document.getElementById("track-menu-lyrics"),m=document.getElementById("track-version-add"),d=document.getElementById("track-version-input");B.querySelectorAll("[data-track-menu]").forEach(f=>{f.addEventListener("click",()=>{_n(f.dataset.trackMenu)})}),a&&a.addEventListener("click",f=>{f.target===a&&Ge()}),r&&r.addEventListener("click",()=>{Ge()}),s&&s.addEventListener("click",async()=>{if(n)try{await Dn(e)}catch(f){M(f.message||"Could not delete track")}}),c&&c.addEventListener("click",()=>{if(!o.trackMenu.trackId)return;if(!Ue()){M("This share link cannot play audio");return}const f=C(),y=f&&f.tracks||[],b=y.findIndex(x=>x.id===o.trackMenu.trackId);b<0||K(y[b],y,b)}),i&&i.addEventListener("click",()=>{n&&gt()}),l&&l.addEventListener("keydown",f=>{n&&f.key==="Enter"&&(f.preventDefault(),gt())}),p&&n&&p.addEventListener("input",()=>{o.trackMenu.notes=String(p.value||"").slice(0,4e3),V(),F()}),h&&n&&h.addEventListener("input",()=>{o.trackMenu.lyrics=String(h.value||"").slice(0,12e3),V(),F()}),m&&d&&(m.addEventListener("click",()=>{!n||!o.trackMenu.trackId||d.click()}),d.addEventListener("change",async()=>{if(!n||!o.trackMenu.trackId)return;const f=d.files&&d.files[0];if(f)try{await Cn(e,o.trackMenu.trackId,f);const y=ke(o.trackMenu.trackId);y&&(o.trackMenu.versions=Array.isArray(y.versions)?[...y.versions]:[],o.trackMenu.activeVersionId=y.activeVersionId||null,We(y)),d.value="",Pe(),le(o.trackMenu.trackId),M("Track version uploaded")}catch(y){M(y.message||"Could not upload version")}}));const g=document.getElementById("track-lufs-analyze");g&&g.addEventListener("click",async()=>{const f=ke(o.trackMenu.trackId);if(!f||!f.audioUrl){M("No audio file available to analyze");return}const y=o.trackMenu.trackId;g.disabled=!0,g.textContent="Analyzing…";try{const b=await jt(f.audioUrl);if(o.trackMenu.trackId!==y)return;o.trackMenu.lufs=b.lufs,o.trackMenu.peakDb=b.peakDb,o.trackMenu.bpm=b.bpm??o.trackMenu.bpm,o.trackMenu.key=b.key??o.trackMenu.key,ot(),V(),F(),M("Audio analysis complete")}catch(b){M(b.message||"Analysis failed")}finally{if(o.trackMenu.trackId!==y)return;const b=document.getElementById("track-lufs-analyze");b&&(b.disabled=!1),rt()}});const w=document.getElementById("track-bpm-input");w&&n&&w.addEventListener("input",()=>{o.trackMenu.bpm=w.value===""?null:Number(w.value),V(),F()});const I=document.getElementById("track-status-select");I&&n&&I.addEventListener("change",()=>{o.trackMenu.trackStatus=I.value||null,Dt(I),V(),F()});const L=document.getElementById("track-key-select");L&&n&&L.addEventListener("change",()=>{o.trackMenu.key=L.value||null,Ut(L);const f=document.getElementById("track-camelot-badge");if(!f)return;const y=L.value?Ze[L.value]:null,b=y?Xe[y]||"#888":null;y&&b?(f.textContent=y,f.style.cssText=`background:${b}26;color:${b};border-color:${b}55`,f.hidden=!1):(f.textContent="",f.style.cssText="",f.hidden=!0),V(),F()})}function ye(e,t,n={}){if(!e)return;const{singleLine:a=!1}=n;e.addEventListener("focus",()=>{e.dataset.beforeEdit=Ce(e.innerText)}),a&&e.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),e.blur())}),e.addEventListener("blur",async()=>{const r=e.dataset.beforeEdit||"",s=Ce(e.innerText);if(r!==s)try{await t(s),N()}catch(c){M(c.message||"Failed to save changes"),e.innerText=r}})}function qn(e){return e.coverUrl?`<img src="${u(e.coverUrl)}" alt="Cover image" loading="lazy" />`:""}function Nn(e){const t=Math.max(0,Math.min(5,Math.round(e)));return Array.from({length:5},(n,a)=>`<span class="card-star${a<t?" filled":""}" aria-hidden="true">★</span>`).join("")}function Ye(e){if(!e)return"";const t=new Date;t.setHours(0,0,0,0);const a=new Date(e+"T00:00:00")-t,r=Math.ceil(a/(1e3*60*60*24));if(r<0)return`<span class="countdown-overdue">${Math.abs(r)} days overdue</span>`;if(r===0)return'<span class="countdown-red">Release day!</span>';let s;return r>30?s="countdown-green":r>7?s="countdown-yellow":s="countdown-red",`<span class="${s}">${r} day${r!==1?"s":""} remaining</span>`}function Hn(e){return!Array.isArray(e)||!e.length?"":e.map(t=>`<span class="project-palette-swatch" style="background:${u(t)}" title="${u(t)}"></span>`).join("")}const On=["January","February","March","April","May","June","July","August","September","October","November","December"],Vn=["Su","Mo","Tu","We","Th","Fr","Sa"],U=class U{static open(t,n,a,r={}){U.close();const s=new U(t,n,a,r);U._instance=s,s._mount()}static close(){U._instance&&(U._instance._destroy(),U._instance=null)}constructor(t,n,a,r){this._anchor=t,this._onChange=a,this._label=r.label||"";const s=U._parseValue(n),c=s||new Date;this._year=c.getFullYear(),this._month=c.getMonth(),this._day=s?c.getDate():null,this._el=null,this._boundKeydown=this._onKeydown.bind(this),this._boundOutsideClick=this._onOutsideClick.bind(this)}_mount(){const t=document.createElement("div");t.className="dp-popover",document.body.appendChild(t),this._el=t,this._render(),this._position(),this._anchor.classList.add("dp-open"),document.addEventListener("keydown",this._boundKeydown),setTimeout(()=>document.addEventListener("pointerdown",this._boundOutsideClick),0)}_render(){const t=this._el,n=this._year,a=this._month,r=new Date(n,a,1).getDay(),s=new Date(n,a+1,0).getDate();let c="";for(let i=0;i<r;i++)c+='<span class="dp-cell dp-blank"></span>';for(let i=1;i<=s;i++){const l=this._day===i,p=new Date,h=p.getFullYear()===n&&p.getMonth()===a&&p.getDate()===i;c+=`<button class="dp-cell dp-day${l?" dp-selected":""}${h?" dp-today":""}" type="button" data-day="${i}">${i}</button>`}t.innerHTML=`
      <div class="dp-header">
        <button class="dp-nav-btn" type="button" data-dp-prev aria-label="Previous month">‹</button>
        <span class="dp-month-label">${On[a]} ${n}</span>
        <button class="dp-nav-btn" type="button" data-dp-next aria-label="Next month">›</button>
      </div>
      <div class="dp-day-names">
        ${Vn.map(i=>`<span class="dp-day-name">${i}</span>`).join("")}
      </div>
      <div class="dp-grid">${c}</div>
      <div class="dp-footer">
        ${this._day!==null?'<button class="dp-clear-btn" type="button">Clear</button>':""}
        <button class="dp-today-btn" type="button">Today</button>
      </div>
    `,this._bindEvents()}_bindEvents(){const t=this._el;t.querySelector("[data-dp-prev]").addEventListener("click",()=>{this._month--,this._month<0&&(this._month=11,this._year--),this._render()}),t.querySelector("[data-dp-next]").addEventListener("click",()=>{this._month++,this._month>11&&(this._month=0,this._year++),this._render()}),t.querySelectorAll(".dp-day").forEach(a=>{a.addEventListener("click",()=>{this._day=Number(a.dataset.day),this._commitAndClose()})});const n=t.querySelector(".dp-clear-btn");n&&n.addEventListener("click",()=>{this._day=null,this._onChange&&this._onChange(""),U.close()}),t.querySelector(".dp-today-btn").addEventListener("click",()=>{const a=new Date;this._year=a.getFullYear(),this._month=a.getMonth(),this._day=a.getDate(),this._commitAndClose()})}_commitAndClose(){if(this._day!==null&&this._onChange){const t=String(this._month+1).padStart(2,"0"),n=String(this._day).padStart(2,"0");this._onChange(`${this._year}-${t}-${n}`)}U.close()}_position(){const t=this._el,n=this._anchor.getBoundingClientRect(),a=window.innerWidth,r=window.innerHeight,s=t.offsetWidth||240,c=t.offsetHeight||300;let i=n.bottom+8,l=n.left;i+c>r-12&&(i=n.top-c-8),l+s>a-12&&(l=a-s-12),l<8&&(l=8),t.style.top=i+"px",t.style.left=l+"px"}_onKeydown(t){t.key==="Escape"&&U.close()}_onOutsideClick(t){this._el&&!this._el.contains(t.target)&&t.target!==this._anchor&&U.close()}_destroy(){document.removeEventListener("keydown",this._boundKeydown),document.removeEventListener("pointerdown",this._boundOutsideClick),this._anchor&&this._anchor.classList.remove("dp-open"),this._el&&this._el.parentNode&&this._el.parentNode.removeChild(this._el),this._el=null}static _parseValue(t){if(!t)return null;const n=new Date(t+"T00:00:00");return isNaN(n.getTime())?null:n}static formatDisplay(t){const n=U._parseValue(t);return n?n.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"}):"Set date…"}};Ne(U,"_instance",null);let se=U;const j=class j{static open(t,n,a){j.close();const r=new j(t,n,a);j._instance=r,r._mount()}static close(){j._instance&&(j._instance._destroy(),j._instance=null)}constructor(t,n,a){this._anchor=t,this._onApply=a;const{h:r,s,v:c}=j._hexToHsv(n||"#a89eff");this._h=r,this._s=s,this._v=c,this._el=null,this._draggingGradient=!1,this._draggingHue=!1,this._boundKeydown=this._onKeydown.bind(this),this._boundOutsideClick=this._onOutsideClick.bind(this)}_mount(){const t=document.createElement("div");t.className="cp-popover",t.innerHTML=this._buildHtml(),document.body.appendChild(t),this._el=t,this._position(),this._update(),this._bindEvents(),this._anchor.classList.add("cp-open"),document.addEventListener("keydown",this._boundKeydown),setTimeout(()=>document.addEventListener("pointerdown",this._boundOutsideClick),0)}_buildHtml(){return`
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
    `}_position(){const t=this._el,n=this._anchor.getBoundingClientRect(),a=window.innerWidth,r=window.innerHeight,s=t.offsetWidth||224,c=t.offsetHeight||300;let i=n.bottom+8,l=n.left;i+c>r-12&&(i=n.top-c-8),l+s>a-12&&(l=a-s-12),l<8&&(l=8),t.style.top=i+"px",t.style.left=l+"px"}_update(){const t=this._el;if(!t)return;const n=j._hsvToHex(this._h,this._s,this._v),a=j._hsvToHex(this._h,1,1),r=t.querySelector(".cp-gradient-box");r.style.background=a;const s=t.querySelector(".cp-gradient-cursor");s.style.left=this._s*100+"%",s.style.top=(1-this._v)*100+"%";const c=t.querySelector(".cp-hue-track .cp-slider-thumb");c.style.left=this._h/360*100+"%",t.querySelector(".cp-preview").style.background=n;const i=t.querySelector(".cp-hex-input");document.activeElement!==i&&(i.value=n.toUpperCase())}_bindEvents(){const t=this._el,n=t.querySelector(".cp-gradient-box"),a=t.querySelector(".cp-hue-track"),r=t.querySelector(".cp-hex-input");n.addEventListener("pointerdown",s=>{s.preventDefault(),this._draggingGradient=!0,n.setPointerCapture(s.pointerId),this._updateFromGradientEvent(s,n)}),n.addEventListener("pointermove",s=>{this._draggingGradient&&this._updateFromGradientEvent(s,n)}),n.addEventListener("pointerup",()=>{this._draggingGradient=!1}),a.addEventListener("pointerdown",s=>{s.preventDefault(),this._draggingHue=!0,a.setPointerCapture(s.pointerId),this._updateFromHueEvent(s,a)}),a.addEventListener("pointermove",s=>{this._draggingHue&&this._updateFromHueEvent(s,a)}),a.addEventListener("pointerup",()=>{this._draggingHue=!1}),r.addEventListener("input",()=>{const s=r.value.trim(),c=s.startsWith("#")?s:"#"+s;if(/^#[0-9a-fA-F]{6}$/.test(c)){const{h:i,s:l,v:p}=j._hexToHsv(c);this._h=i,this._s=l,this._v=p,this._update()}}),t.querySelector(".cp-btn-apply").addEventListener("click",()=>{this._apply()}),t.querySelector(".cp-btn-cancel").addEventListener("click",()=>{j.close()})}_updateFromGradientEvent(t,n){const a=n.getBoundingClientRect(),r=Math.max(0,Math.min(1,(t.clientX-a.left)/a.width)),s=Math.max(0,Math.min(1,(t.clientY-a.top)/a.height));this._s=r,this._v=1-s,this._update()}_updateFromHueEvent(t,n){const a=n.getBoundingClientRect(),r=Math.max(0,Math.min(1,(t.clientX-a.left)/a.width));this._h=r*360,this._update()}_apply(){const t=j._hsvToHex(this._h,this._s,this._v);this._onApply&&this._onApply(t),j.close()}_onKeydown(t){t.key==="Escape"&&j.close(),t.key==="Enter"&&this._apply()}_onOutsideClick(t){this._el&&!this._el.contains(t.target)&&t.target!==this._anchor&&j.close()}_destroy(){document.removeEventListener("keydown",this._boundKeydown),document.removeEventListener("pointerdown",this._boundOutsideClick),this._anchor&&this._anchor.classList.remove("cp-open"),this._el&&this._el.parentNode&&this._el.parentNode.removeChild(this._el),this._el=null}static _hexToHsv(t){const n=parseInt(t.slice(1,3),16)/255,a=parseInt(t.slice(3,5),16)/255,r=parseInt(t.slice(5,7),16)/255,s=Math.max(n,a,r),c=Math.min(n,a,r),i=s-c,l=s,p=s===0?0:i/s;let h=0;return i!==0&&(s===n?h=((a-r)/i+(a<r?6:0))/6:s===a?h=((r-n)/i+2)/6:h=((n-a)/i+4)/6),{h:h*360,s:p,v:l}}static _hsvToHex(t,n,a){const r=Math.floor(t/60%6),s=t/60-Math.floor(t/60),c=a*(1-n),i=a*(1-s*n),l=a*(1-(1-s)*n);let p,h,m;switch(r){case 0:p=a,h=l,m=c;break;case 1:p=i,h=a,m=c;break;case 2:p=c,h=a,m=l;break;case 3:p=c,h=i,m=a;break;case 4:p=l,h=c,m=a;break;default:p=a,h=c,m=i;break}const d=g=>Math.round(g*255).toString(16).padStart(2,"0");return"#"+d(p)+d(h)+d(m)}};Ne(j,"_instance",null);let be=j;function qt(e,t){const n=e.map((r,s)=>`
      <div class="palette-swatch-wrap">
        <div class="palette-swatch" style="background:${u(r)}" data-palette-index="${s}" role="button" tabindex="0" aria-label="Edit color ${s+1}: ${u(r)}"></div>
        ${t?`<button class="palette-remove-btn" type="button" data-palette-remove="${s}" aria-label="Remove color">×</button>`:""}
      </div>
    `).join(""),a=t&&e.length<5?'<button id="palette-add-btn" class="palette-add-btn" type="button" aria-label="Add color">+</button>':"";return n+a}function je(e){const t=String(e||"").trim();if(!t||!/^https?:\/\//i.test(t))return"";try{return new URL(t).toString()}catch{return""}}function Nt(e){const t=je(e);if(!t)return null;let n;try{n=new URL(t)}catch{return null}const a=n.hostname.replace(/^www\./i,"").toLowerCase();let r="";if(a==="youtu.be")r=n.pathname.split("/").filter(Boolean)[0]||"";else if(a==="youtube.com"||a.endsWith(".youtube.com"))if(n.pathname==="/watch")r=n.searchParams.get("v")||"";else{const s=n.pathname.split("/").filter(Boolean);["embed","shorts","live"].includes(s[0])&&(r=s[1]||"")}if(/^[a-zA-Z0-9_-]{6,}$/.test(r))return{provider:"youtube",embedUrl:`https://www.youtube.com/embed/${r}`};if(a==="w.soundcloud.com"){const s=je(n.searchParams.get("url")||"");if(s)return{provider:"soundcloud",embedUrl:kt(s)}}return a==="soundcloud.com"||a.endsWith(".soundcloud.com")?{provider:"soundcloud",embedUrl:kt(t)}:null}function kt(e){return`https://w.soundcloud.com/player/?url=${encodeURIComponent(e)}&color=%23a89eff&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=false`}function Le(e){return Array.isArray(e&&e.moodboardItems)?e.moodboardItems:[]}function Fn(e){return!Array.isArray(e)||!e.length?'<p class="moodboard-empty">No palette yet.</p>':e.slice(0,5).map(t=>`
        <div
          class="moodboard-palette-swatch"
          style="background:${u(t)}"
          data-color="${u(String(t).toUpperCase())}"
          title="${u(t)}"
        ></div>
      `).join("")}function zn(e){const t=[e.artist,e.title].filter(Boolean).join(" - ");return`
    <article class="reference-row" data-moodboard-item="${u(e.id)}">
      <div class="reference-main">
        <div class="reference-title">${u(e.title||"Untitled reference")}</div>
        <div class="reference-artist">${u(e.artist||"Unknown artist")}</div>
      </div>
      <div class="reference-actions">
        ${e.url?`<a class="icon-button reference-open-button" href="${u(e.url)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${u(t||"reference")}">${k("external")}</a>`:""}
        <button class="icon-button moodboard-delete-button" type="button" data-moodboard-delete="${u(e.id)}" aria-label="Delete reference">${k("trash")}</button>
      </div>
    </article>
  `}function Kn(e){const t=Nt(e.url);return t?`
    <article class="embed-card" data-provider="${u(t.provider)}" data-moodboard-item="${u(e.id)}">
      <iframe
        src="${u(t.embedUrl)}"
        title="${u(t.provider)} inspiration"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div class="embed-card-actions">
        <a class="icon-button" href="${u(e.url)}" target="_blank" rel="noopener noreferrer" aria-label="Open original">${k("external")}</a>
        <button class="icon-button moodboard-delete-button" type="button" data-moodboard-delete="${u(e.id)}" aria-label="Delete embed">${k("trash")}</button>
      </div>
    </article>
  `:`
      <article class="embed-card embed-card-invalid" data-moodboard-item="${u(e.id)}">
        <div class="embed-invalid-copy">Unsupported URL</div>
        <button class="icon-button moodboard-delete-button" type="button" data-moodboard-delete="${u(e.id)}" aria-label="Delete embed">${k("trash")}</button>
      </article>
    `}function wt(e,t){const n=new Date().toISOString();return{id:Te(e),type:e,createdAt:n,updatedAt:n,...t}}function Gn(e,t,n){return"#"+[e,t,n].map(a=>Math.max(0,Math.min(255,a)).toString(16).padStart(2,"0")).join("")}function Wn(e,t,n){const a=e/255,r=t/255,s=n/255,c=Math.max(a,r,s),i=Math.min(a,r,s),l=(c+i)/2;if(c===i)return{hue:0,saturation:0,lightness:l};const p=c-i,h=l>.5?p/(2-c-i):p/(c+i);let m=0;return c===a?m=(r-s)/p+(r<s?6:0):c===r?m=(s-a)/p+2:m=(a-r)/p+4,{hue:m*60,saturation:h,lightness:l}}function Yn(e,t){const n=e.r-t.r,a=e.g-t.g,r=e.b-t.b;return Math.sqrt(n*n+a*a+r*r)}async function Qn(e,t=3){return new Promise(n=>{const a=new Image;a.crossOrigin="anonymous",a.onload=()=>{const r=document.createElement("canvas"),s=72;r.width=s,r.height=s;const c=r.getContext("2d",{willReadFrequently:!0});if(!c){n([]);return}c.drawImage(a,0,0,s,s);let i;try{i=c.getImageData(0,0,s,s).data}catch{n([]);return}const l=new Map;for(let m=0;m<i.length;m+=16){const d=i[m],g=i[m+1],w=i[m+2];if(i[m+3]<180)continue;const L=Wn(d,g,w);if(L.lightness<.08||L.lightness>.92)continue;const f=`${Math.round(d/24)}-${Math.round(g/24)}-${Math.round(w/24)}`,y=l.get(f)||{r:0,g:0,b:0,count:0,saturation:0};y.r+=d,y.g+=g,y.b+=w,y.count+=1,y.saturation+=L.saturation,l.set(f,y)}const p=[...l.values()].map(m=>{const d=Math.round(m.r/m.count),g=Math.round(m.g/m.count),w=Math.round(m.b/m.count),I=m.saturation/m.count;return{r:d,g,b:w,score:m.count*(.7+I)}}).sort((m,d)=>d.score-m.score),h=[];for(const m of p)if(h.every(d=>Yn(d,m)>48)&&h.push(m),h.length>=t)break;n(h.map(m=>Gn(m.r,m.g,m.b)))},a.onerror=()=>n([]),a.src=e})}async function Jn(e){if(!e||!e.coverUrl||A()||!G()||Array.isArray(e.colorPalette)&&e.colorPalette.length)return;const t=`${e.id}:${e.activeCoverId||e.coverUrl}`;if(pt.has(t))return;pt.add(t);const n=e.activeCoverId?`?palette=${encodeURIComponent(e.activeCoverId)}`:"",a=await Qn(`${e.coverUrl}${n}`,3);if(!a.length)return;await oe({colorPalette:a});const r=C();if(!(!r||r.id!==e.id)){if(o.route.type==="project"){const s=document.getElementById("moodboard-panel"),c=!!(s&&!s.classList.contains("hidden"));if(N(),c){const i=document.getElementById("open-moodboard-button");i&&i.click()}}M("Palette extracted from cover")}}const Et=[{key:"updatedAt",label:"Last Modified",dir:"desc"},{key:"createdAt",label:"Date Created",dir:"desc"},{key:"title",label:"Title A→Z",dir:"asc"},{key:"artist",label:"Artist A→Z",dir:"asc"},{key:"status",label:"Status",dir:"asc"},{key:"completionPercent",label:"% Complete",dir:"desc"},{key:"starRating",label:"Star Rating",dir:"desc"},{key:"releaseDate",label:"Release Date",dir:"asc"},{key:"startDate",label:"Start Date",dir:"asc"}];function Zn(){const{key:e,dir:t}=o.homeSort,n=[...o.projects];return n.sort((a,r)=>{let s=a[e],c=r[e];const i=s==null||s==="",l=c==null||c==="";return i&&l?0:i?1:l?-1:typeof s=="number"&&typeof c=="number"?t==="asc"?s-c:c-s:(s=String(s).toLowerCase(),c=String(c).toLowerCase(),s<c?t==="asc"?-1:1:s>c?t==="asc"?1:-1:0)}),n}function Ht(){const e=Zn(),t=Et.find(i=>i.key===o.homeSort.key),n=t?t.label:"Sort",a=e.map(i=>{const l=i.trackCount===1?"1 track":`${i.trackCount||0} tracks`,p=Ct(i.totalRuntimeSeconds||0),h=i.completionPercent||0,m=i.starRating||0;return`
        <article class="project-card" data-open-project="${u(i.id)}">
          <div class="card-cover">
            ${qn(i)}
            <span class="status-pill">${u(i.status||"In Progress")}</span>
          </div>
          <div class="card-body">
            <h3 class="card-title">${u(i.title||"Untitled Project")}</h3>
            <p class="card-artist">${u(i.artist||"Unknown Artist")}</p>
            <p class="card-meta">${u(`${l} • ${p}`)}</p>
            ${m>0?`<div class="card-rating">${Nn(m)}</div>`:""}
          </div>
          ${h>0?`<div class="card-progress-wrap"><div class="card-progress-bar" style="width:${h}%"></div></div>`:""}
        </article>
      `}).join(""),r=Et.map(i=>{const l=i.key===o.homeSort.key;return`<button class="sort-menu-item ui-dropdown-item${l?" sort-menu-item--active":""}" type="button" data-sort-key="${i.key}" data-sort-dir="${i.dir}">${i.label}${l?o.homeSort.dir==="asc"?" ↑":" ↓":""}</button>`}).join("");B.innerHTML=`
    <section class="view home-view">
      <header class="topbar">
        <div>
          <h1 class="brand">Studio</h1>
          <p class="brand-sub">Private workspace for works in progress</p>
        </div>
        <div class="topbar-actions">
          <button id="open-settings-button" class="circle-button" type="button" aria-label="Open settings" title="Settings">${k("settings")}</button>
          <button id="logout-button" class="text-button" type="button">${k("logout")} Log out</button>
        </div>
      </header>

      <section class="home-actions">
        <button id="create-project-button" class="primary-button" type="button">${k("plus")} New Project</button>
        <div class="sort-wrap">
          <button id="sort-button" class="sort-button ui-dropdown-trigger" type="button" aria-haspopup="true" aria-expanded="false">
            ${k("sort")} ${u(n)}
          </button>
          <div id="sort-menu" class="sort-menu ui-dropdown-menu hidden">
            ${r}
          </div>
        </div>
      </section>

      <section class="project-grid">
        ${a||'<div class="empty-state">No projects yet. Create one to start uploading tracks.</div>'}
      </section>
    </section>
  `,document.getElementById("open-settings-button").addEventListener("click",()=>{R("/settings")}),document.getElementById("logout-button").addEventListener("click",async()=>{try{await T("/api/logout",{method:"POST"}),o.authenticated=!1,o.currentProject=null,R("/")}catch(i){M(i.message||"Could not log out")}}),document.getElementById("create-project-button").addEventListener("click",async()=>{try{const i=await T("/api/projects",{method:"POST",body:{title:"Untitled Project",artist:"Unknown Artist",description:"",status:"In Progress"}});o.currentProject=i.project,Re(i.project),R(`/project/${i.project.id}`)}catch(i){M(i.message||"Failed to create project")}});const s=document.getElementById("sort-button"),c=document.getElementById("sort-menu");s.addEventListener("click",i=>{i.stopPropagation();const l=!c.classList.contains("hidden");c.classList.toggle("hidden",l),s.setAttribute("aria-expanded",String(!l))}),c.querySelectorAll(".sort-menu-item").forEach(i=>{i.addEventListener("click",()=>{const l=i.dataset.sortKey,p=i.dataset.sortDir;o.homeSort.key===l?o.homeSort.dir=o.homeSort.dir==="asc"?"desc":"asc":(o.homeSort.key=l,o.homeSort.dir=p),Ht()})}),document.addEventListener("click",function i(l){s.contains(l.target)||(c.classList.add("hidden"),s.setAttribute("aria-expanded","false"),document.removeEventListener("click",i))}),B.querySelectorAll("[data-open-project]").forEach(i=>{i.addEventListener("click",()=>{R(`/project/${i.dataset.openProject}`)})}),ce()}function Ot(e,t){const n=G(),a=n&&!A(),r=Ue(),s=De(o.settings.trackTagVisibility),c=Bt(e.createdAt)||"No date",i=tt(e.todos),l=i.filter(f=>!f.done).length,p=rn(e),h=[];s.contextBadges&&e.versionCount>1&&h.push(`<span class="track-badge">v${e.versionCount}</span>`),s.contextBadges&&p&&p.originalName&&h.push(`<span class="track-badge track-badge-filename marquee-wrap"><span class="marquee-inner">${u(p.originalName)}</span></span>`),s.contextBadges&&e.notes&&h.push('<span class="track-badge">Notes</span>'),s.contextBadges&&e.lyrics&&h.push('<span class="track-badge">Lyrics</span>'),s.contextBadges&&i.length&&h.push(`<span class="track-badge">Todos ${l}/${i.length}</span>`);const m=e.trackStatus?It[e.trackStatus]||"#8690a4":"",d=s.status&&e.trackStatus?`<span class="track-status-pill" style="--status-pill-color:${m}">${u(e.trackStatus)}</span>`:"",g=s.moodTags&&Array.isArray(e.moodTags)&&e.moodTags.length?e.moodTags.map(f=>{const y=St[f]||"#555";return`<span class="track-mood-chip" style="background:${y}22;color:${y};border-color:${y}55">${u(f)}</span>`}).join(""):"",w=[];s.date&&w.push(`<span class="track-date">${u(c)}</span>`),s.bpm&&e.bpm&&w.push(`<span class="track-inline-meta">${u(String(e.bpm))} BPM</span>`),s.key&&e.key&&w.push(`${Un(e.key)}<span class="track-inline-meta">${u(e.key)}</span>`),s.playCount&&e.listenCount&&w.push(`<span class="track-inline-meta">${u(String(e.listenCount))} plays</span>`);const I=w.map((f,y)=>y===0?f:`<span class="stats-dot track-meta-dot">&middot;</span>${f}`).join(""),L=h.length||d;return`
    <article class="track-row${r?" track-row--clickable":""}" data-track-id="${u(e.id)}" draggable="${a?"true":"false"}">
      <div class="track-index drag-handle" title="Drag to reorder">${t+1}</div>
      <div class="track-main">
        <div class="track-line">
          <div
            class="editable track-title-editable"
            contenteditable="${n?"true":"false"}"
            spellcheck="false"
            data-track-id="${u(e.id)}"
            data-track-field="title"
            data-placeholder="Untitled track"
          >${u(e.title||"")}</div>
        </div>

        <div class="track-meta-line">
          ${I}
        </div>

        ${g?`<div class="track-mood-chips-row">${g}</div>`:""}

        ${L?`<div class="track-bottom-row">
          <div class="track-badges">${h.join("")}</div>
          ${d}
        </div>`:""}
      </div>
      <button class="icon-button track-play-button" type="button" data-play-track="${u(e.id)}" title="Play track" ${r?"":"disabled"}>${k("play")}</button>
      <button class="icon-button track-menu-button" type="button" data-track-menu="${u(e.id)}" title="Track options">${k("more")}</button>
    </article>
  `}function Xn(e){return Yt.map(t=>{const n=t===e?"selected":"";return`<option value="${u(t)}" ${n}>${u(t)}</option>`}).join("")}function N(){me({flush:!1}),Ee({flush:!1});const e=C();if(!e){re("Project not found",!0);return}o.metadataPanel.colorPalette=Array.isArray(e.colorPalette)?[...e.colorPalette]:[];const t=G(),n=Ue(),a=!A(),r=e.tracks||[],s=r.map((d,g)=>Ot(d,g)).join(""),c=r.length===1?"1 track":`${r.length} tracks`,i=Ct(e.totalRuntimeSeconds||0),l=Array.isArray(e.shareLinks)?e.shareLinks:[],h=(Array.isArray(e.coverVersions)?e.coverVersions:[]).map(d=>`
        <div class="cover-thumb-wrap">
          <button
            class="cover-switcher-thumb ${d.id===e.activeCoverId?"active":""}"
            type="button"
            data-cover-version="${u(d.id)}"
            title="Switch cover"
          >
            <img src="${u(d.coverUrl)}" alt="Cover version" loading="lazy" />
          </button>
          ${t?`<button class="cover-thumb-delete" type="button" data-delete-cover="${u(d.id)}" title="Delete cover" aria-label="Delete cover">${k("close")}</button>`:""}
        </div>
      `).join(""),m=l.map(d=>{const g=`${window.location.origin}${d.shareUrl}`;return`
        <div class="share-link-item">
          <span class="share-link-type">${u(Tt(d.access))}</span>
          <input class="share-link-input" type="text" readonly value="${u(g)}" />
          <button class="secondary-button" type="button" data-copy-share="${u(d.shareUrl)}">Copy</button>
          <button class="secondary-button" type="button" data-delete-share="${u(d.id)}">Delete</button>
        </div>
      `}).join("");B.innerHTML=`
    <section class="view project-view">
      <header class="project-chrome">
          <button id="back-home-button" class="circle-button" type="button" aria-label="Back to library">${k("back")}</button>
        <div class="chrome-actions">
            ${a?`<button id="open-settings-button" class="circle-button" type="button" aria-label="Open settings" title="Settings">${k("settings")}</button><button id="delete-project-button" class="circle-button danger" type="button" aria-label="Delete project" title="Delete project">${k("trash")}</button><button id="logout-button" class="circle-button" type="button" aria-label="Log out">${k("logout")}</button>`:""}
        </div>
      </header>

      <section class="project-stage">
        <div class="cover-stack">
          <button id="cover-button" class="cover-editor stage-cover" type="button" aria-label="Upload cover image">
            ${e.coverUrl?`<img src="${u(e.coverUrl)}?v=${u(e.activeCoverId||"")}" alt="Project cover" />`:"Click to upload cover"}
          </button>
          <div class="cover-switcher-wrap">
            <p class="cover-switcher-label">Cover Versions</p>
            <div id="cover-switcher" class="cover-switcher">
              ${h||'<p class="todo-empty">No cover versions yet.</p>'}
            </div>
          </div>
        </div>

        <div class="project-column">
          <div class="project-head">
            <div class="project-headings">
              <h1 id="project-title" class="editable heading-editable" contenteditable="${t?"true":"false"}" spellcheck="false" data-placeholder="Project title">${u(e.title||"")}</h1>

              <div class="project-stats-row">
                <p id="project-artist" class="editable subheading-editable" contenteditable="${t?"true":"false"}" spellcheck="false" data-placeholder="Artist">${u(e.artist||"")}</p>
                  <span class="stats-dot">&middot;</span>
                <span class="project-track-count">${u(c)}</span>
                  <span class="stats-dot">&middot;</span>
                <span class="project-runtime">${u(i)}</span>
              </div>

              ${e.colorPalette&&e.colorPalette.length||e.releaseDate?`<div class="project-meta-chips">
                      ${e.colorPalette&&e.colorPalette.length?`<div class="project-palette-row">${Hn(e.colorPalette)}</div>`:""}
                      ${e.releaseDate?`<div class="project-deadline-chip">${Ye(e.releaseDate)}</div>`:""}
                    </div>`:""}
            </div>

            <div class="project-main-controls">
              <button id="shuffle-tracks-button" class="icon-button ghost-control" type="button" title="Shuffle queue">${k("shuffle")}</button>
              <button id="play-all-button" class="icon-button play-main-control" type="button" title="Play from start" ${n?"":"disabled"}>${k("play")}</button>
            </div>
          </div>

          <div class="project-tools">
            <button id="upload-tracks-button" class="add-tracks-button" type="button" ${t?"":"disabled"}>+ Add tracks</button>

            <div class="project-secondary-controls">
              <select id="project-status" class="project-status-select ui-select" title="Status" aria-label="Status" ${t?"":"disabled"}>${Xn(e.status)}</select>
              <button id="open-notes-button" class="secondary-button panel-trigger-btn" type="button">${k("notes")} Notes</button>
              ${a?`<button id="open-share-button" class="secondary-button panel-trigger-btn" type="button">${k("link")} Share</button>`:""}
              <div class="feature-menu-wrap">
                <button id="project-feature-menu-button" class="secondary-button panel-trigger-btn feature-menu-button" type="button" aria-haspopup="true" aria-expanded="false">${k("more")} More</button>
                <div id="project-feature-menu" class="feature-menu hidden">
                  <button id="open-metadata-button" class="feature-menu-item" type="button">${k("metadata")} Metadata</button>
                  ${a?`<button id="open-moodboard-button" class="feature-menu-item" type="button">${k("moodboard")} Moodboard</button>`:""}
                  ${a?`<button id="open-export-button" class="feature-menu-item" type="button">${k("export")} Export</button>`:""}
                  ${a?`<button id="open-collaborators-button" class="feature-menu-item" type="button">${k("users")} Collaborators</button>`:""}
                  ${a?`<button id="open-analytics-button" class="feature-menu-item" type="button">${k("analytics")} Analytics</button>`:""}
                </div>
              </div>
            </div>
          </div>

          <section class="tracks-panel">
            <div class="tracks-toolbar">
              <h2>Tracklist</h2>
            </div>

            <input id="cover-input" type="file" hidden accept=".jpg,.jpeg,.png,.webp" />
            <input id="track-input" type="file" hidden multiple accept=".wav,.mp3,.flac" />

            <div id="tracks-list" class="tracks-list">
              ${s||'<div class="empty-state">No tracks uploaded yet. Add WAV, MP3, or FLAC files.</div>'}
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
            <button id="track-menu-close" class="circle-button track-menu-close" type="button" aria-label="Close track details">${k("close")}</button>
          </header>

          <div class="track-menu-actions">
            <button id="track-menu-play" class="secondary-button track-menu-play" type="button" ${n?"":"disabled"}>${k("play")} Play</button>
          </div>

          <div class="track-menu-field">
            <div class="track-menu-todo-head">
              <label>Versions</label>
              <button id="track-version-add" class="secondary-button track-menu-todo-add" type="button" ${t?"":"disabled"}>${k("plus")} Upload</button>
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
                  ${Zt.map(d=>`<option value="${u(d)}">${u(d)}</option>`).join("")}
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
                ${Qt.map(d=>`<option value="${u(d)}">${u(d)}</option>`).join("")}
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
              <button id="track-todo-add" class="secondary-button track-menu-todo-add" type="button" ${t?"":"disabled"}>${k("plus")} Add</button>
            </div>

            <div class="track-menu-todo-add-row">
              <input id="track-todo-input" type="text" placeholder="Add todo item" maxlength="220" ${t?"":"disabled"} />
            </div>

            <div id="track-todo-list" class="track-menu-todo-list"></div>
          </div>

          <footer class="track-menu-footer">
            <button id="track-menu-delete" class="secondary-button track-menu-delete" type="button" ${t?"":"disabled"}>${k("trash")} Delete Track</button>
          </footer>
        </section>
      </div>

      <div id="notes-panel" class="panel-overlay hidden" role="dialog" aria-modal="true" aria-label="Project notes">
        <div class="panel-sheet">
          <header class="panel-header">
            <h3>Project Notes</h3>
            <button id="notes-panel-close" class="circle-button" type="button" aria-label="Close notes">${k("close")}</button>
          </header>
          <div class="panel-body">
            <div class="project-notes-shell">
              <div id="project-description" class="editable description-editable" contenteditable="${t?"true":"false"}" spellcheck="true" data-placeholder="Project notes">${u(e.description||"")}</div>
            </div>
          </div>
        </div>
      </div>

      ${a?`
      <div id="share-panel" class="panel-overlay hidden" role="dialog" aria-modal="true" aria-label="Share project">
        <div class="panel-sheet">
          <header class="panel-header">
            <h3>Share Project</h3>
            <button id="share-panel-close" class="circle-button" type="button" aria-label="Close share">${k("close")}</button>
          </header>
          <div class="panel-body">
            <div class="share-manager">
              <div class="share-create-row">
                <label for="share-access-select">Share Access</label>
                <select id="share-access-select" class="project-status-select ui-select">${nn("listen")}</select>
                <button id="share-create-button" class="secondary-button" type="button">Create Share Link</button>
              </div>
              <div id="share-links-list" class="share-links-list">
                ${m||'<p class="todo-empty">No share links yet.</p>'}
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
            <button id="metadata-panel-close" class="circle-button" type="button" aria-label="Close metadata">${k("close")}</button>
          </header>
          <div class="panel-body">

            <div class="meta-section meta-dates-row">
              <div class="meta-date-field">
                <label class="meta-section-label">Start Date</label>
                <button id="meta-start-date-btn" class="dp-trigger-btn${t?"":" dp-trigger-btn--readonly"}" type="button" data-value="${u(e.startDate||"")}" ${t?"":"disabled"}>
                  ${se.formatDisplay(e.startDate)}
                </button>
              </div>
              <div class="meta-date-field">
                <label class="meta-section-label">Release Date</label>
                <button id="meta-release-date-btn" class="dp-trigger-btn${t?"":" dp-trigger-btn--readonly"}" type="button" data-value="${u(e.releaseDate||"")}" ${t?"":"disabled"}>
                  ${se.formatDisplay(e.releaseDate)}
                </button>
                <div id="meta-deadline-countdown" class="deadline-countdown${e.releaseDate?"":" hidden"}">${e.releaseDate?Ye(e.releaseDate):""}</div>
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
                ${[1,2,3,4,5].map(d=>`<button class="star-btn${d<=(e.starRating||0)?" active":""}" type="button" data-star="${d}" aria-label="${d} star${d>1?"s":""}" ${t?"":"disabled"}>★</button>`).join("")}
              </div>
            </div>

            <div class="meta-section">
              <label class="meta-section-label">Color Palette</label>
              <div id="meta-color-palette" class="color-palette-row">
                ${qt(o.metadataPanel.colorPalette,t)}
              </div>
            </div>

            <div class="meta-section">
              <label class="meta-section-label">Streaming Platforms</label>
              <div class="streaming-checklist">
                ${[{key:"spotify",label:"Spotify"},{key:"appleMusic",label:"Apple Music"},{key:"bandcamp",label:"Bandcamp"},{key:"tidal",label:"Tidal"},{key:"youtubeMusic",label:"YouTube Music"},{key:"soundCloud",label:"SoundCloud"}].map(({key:d,label:g})=>`
                  <label class="stream-check-row">
                    <input type="checkbox" class="stream-checkbox" data-platform="${u(d)}" ${(e.streamingChecklist||{})[d]?"checked":""} ${t?"":"disabled"} />
                    <span>${u(g)}</span>
                  </label>
                `).join("")}
              </div>
            </div>

            <div class="meta-section">
              <label class="meta-section-label" for="meta-presave-link">Pre-Save Link</label>
              <input type="url" id="meta-presave-link" class="metadata-url-input" placeholder="https://..." value="${u(e.preSaveLink||"")}" ${t?"":"disabled"} />
              ${e.preSaveLink?`<a href="${u(e.preSaveLink)}" target="_blank" rel="noopener noreferrer" class="presave-link-preview">Open link ↗</a>`:""}
            </div>

            <div class="meta-section">
              <label class="meta-section-label" for="meta-distributor-notes">Distributor Notes</label>
              <textarea id="meta-distributor-notes" class="metadata-textarea" placeholder="DistroKid / TuneCore details, ISRC codes, release admin notes…" ${t?"":"disabled"}>${u(e.distributorNotes||"")}</textarea>
            </div>

          </div>
        </div>
      </div>

      ${a?`
      <div id="moodboard-panel" class="panel-overlay hidden" role="dialog" aria-modal="true" aria-label="Project moodboard">
        <div class="panel-sheet panel-sheet-moodboard">
          <header class="panel-header">
            <h3>Moodboard</h3>
            <button id="moodboard-panel-close" class="circle-button" type="button" aria-label="Close moodboard">${k("close")}</button>
          </header>
          <div class="panel-body moodboard-panel-body">
            <div id="moodboard-panel-content"></div>
          </div>
        </div>
      </div>
      `:""}
    </section>
  `,ta(),ce(),Jn(e),requestAnimationFrame(()=>{requestAnimationFrame(()=>{B.querySelectorAll(".track-badge.marquee-wrap").forEach(et)})})}function ea(e,t){Ee({flush:!1});const n=document.getElementById("metadata-panel"),a=document.getElementById("metadata-panel-close"),r=document.getElementById("open-metadata-button"),s=document.getElementById("meta-completion-range"),c=document.getElementById("meta-completion-num"),i=document.getElementById("meta-completion-display"),l=document.getElementById("meta-star-rating"),p=document.getElementById("meta-color-palette");if(!n)return;function h(){be.close(),se.close(),Ee({flush:!0,fireAndForget:!0}),te(n)}if(r&&r.addEventListener("click",()=>{n.classList.remove("hidden")}),a&&a.addEventListener("click",h),n.addEventListener("click",f=>{f.target===n&&h()}),!t)return;xn();function m(f,y){const b=document.getElementById(f);b&&b.addEventListener("click",()=>{se.open(b,b.dataset.value||"",x=>{b.dataset.value=x,b.textContent=se.formatDisplay(x),y(x)})})}function d(f){const y=document.getElementById("meta-deadline-countdown");if(y){if(!f){y.classList.add("hidden"),y.innerHTML="";return}y.classList.remove("hidden"),y.innerHTML=Ye(f)}}m("meta-start-date-btn",()=>{z()}),m("meta-release-date-btn",f=>{d(f),z()}),s&&c&&i&&(s.addEventListener("input",()=>{c.value=s.value,i.textContent=s.value+"%",z()}),c.addEventListener("input",()=>{const f=Math.max(0,Math.min(100,Math.round(Number(c.value)||0)));s.value=f,i.textContent=f+"%",z()})),l&&l.querySelectorAll(".star-btn").forEach(f=>{f.addEventListener("click",()=>{const y=Number(f.dataset.star),b=Number(l.dataset.rating)||0,x=y===b?0:y;l.dataset.rating=x,l.querySelectorAll(".star-btn").forEach((v,$)=>v.classList.toggle("active",$+1<=x)),z()})});function g(){p&&(p.innerHTML=qt(o.metadataPanel.colorPalette,t),w())}function w(){if(!p)return;p.querySelectorAll(".palette-swatch[data-palette-index]").forEach(y=>{const b=()=>{if(!t)return;const x=Number(y.dataset.paletteIndex),v=o.metadataPanel.colorPalette[x]||"#a89eff";be.open(y,v,$=>{o.metadataPanel.colorPalette[x]=$,y.style.background=$,y.setAttribute("aria-label",`Edit color ${x+1}: ${$}`),z()})};y.addEventListener("click",b),y.addEventListener("keydown",x=>{(x.key==="Enter"||x.key===" ")&&(x.preventDefault(),b())})}),p.querySelectorAll("[data-palette-remove]").forEach(y=>{y.addEventListener("click",()=>{const b=Number(y.dataset.paletteRemove);Number.isFinite(b)&&(be.close(),o.metadataPanel.colorPalette.splice(b,1),g(),z())})});const f=document.getElementById("palette-add-btn");f&&f.addEventListener("click",()=>{o.metadataPanel.colorPalette.length<5&&(o.metadataPanel.colorPalette.push("#a89eff"),g(),z())})}w(),B.querySelectorAll(".stream-checkbox").forEach(f=>{f.addEventListener("change",()=>{z()})});const I=document.getElementById("meta-presave-link");I&&I.addEventListener("input",()=>{z()});const L=document.getElementById("meta-distributor-notes");L&&L.addEventListener("input",()=>{z()})}function ta(){const e=C();if(!e)return;const t=G(),n=Ue(),a=!A();document.getElementById("back-home-button").addEventListener("click",()=>{R("/")});const r=document.getElementById("notes-panel"),s=document.getElementById("notes-panel-close"),c=document.getElementById("open-notes-button");c&&r&&c.addEventListener("click",()=>{r.classList.remove("hidden")}),s&&r&&s.addEventListener("click",()=>{te(r)}),r&&r.addEventListener("click",v=>{v.target===r&&te(r)});const i=document.getElementById("share-panel"),l=document.getElementById("share-panel-close"),p=document.getElementById("open-share-button");p&&i&&p.addEventListener("click",()=>{i.classList.remove("hidden")}),l&&i&&l.addEventListener("click",()=>{te(i)}),i&&i.addEventListener("click",v=>{v.target===i&&te(i)});const h=document.getElementById("project-feature-menu-button"),m=document.getElementById("project-feature-menu");if(h&&m){const v=()=>{m.classList.add("hidden"),h.setAttribute("aria-expanded","false")};h.addEventListener("click",$=>{$.stopPropagation();const S=!m.classList.contains("hidden");m.classList.toggle("hidden",S),h.setAttribute("aria-expanded",String(!S))}),m.addEventListener("click",$=>{$.target.closest("button")&&v()}),document.addEventListener("click",function(S){!m.classList.contains("hidden")&&!m.contains(S.target)&&S.target!==h&&v()})}[["open-collaborators-button","Collaborators"],["open-analytics-button","Analytics"],["open-export-button","Export"]].forEach(([v,$])=>{const S=document.getElementById(v);S&&S.addEventListener("click",()=>{M(`${$} will be added in a later phase`)})});const g=document.getElementById("logout-button"),w=document.getElementById("open-settings-button");w&&w.addEventListener("click",()=>{R("/settings")}),g&&g.addEventListener("click",async()=>{try{await T("/api/logout",{method:"POST"}),o.authenticated=!1,o.currentProject=null,R("/")}catch(v){M(v.message||"Could not log out")}});const I=document.getElementById("delete-project-button");I&&I.addEventListener("click",async()=>{const v=e.title||"this project";if(await nt(`Delete "${v}" and all its tracks/covers?`))try{await T(`/api/projects/${encodeURIComponent(e.id)}`,{method:"DELETE"}),dn(e.id),o.currentProject=null,o.player.wavesurfer&&o.player.wavesurfer.stop(),o.player.queue=[],o.player.index=-1,o.player.track=null,o.player.autoplayOnReady=!1,ae.classList.add("hidden"),document.title="Studio",ge(Mt,"No track loaded"),ge($t,""),Qe.textContent="0:00",Je.textContent="0:00",R("/"),M("Project deleted")}catch($){M($.message||"Could not delete project")}}),t&&(ye(document.getElementById("project-title"),async v=>{await oe({title:v||"Untitled Project"})},{singleLine:!0}),ye(document.getElementById("project-artist"),async v=>{await oe({artist:v||"Unknown Artist"})},{singleLine:!0}),ye(document.getElementById("project-description"),async v=>{await oe({description:v})}));const L=document.getElementById("project-status");L&&t&&L.addEventListener("change",async()=>{try{await oe({status:L.value}),N()}catch(v){M(v.message||"Failed to save status")}});const f=document.getElementById("cover-input");document.getElementById("cover-button").addEventListener("click",()=>{t&&f.click()}),f.addEventListener("change",async()=>{if(t&&!(!f.files||!f.files[0]))try{await Pn(e.id,f.files[0]),N(),M("Cover version uploaded")}catch(v){M(v.message||"Cover upload failed")}}),B.querySelectorAll("[data-cover-version]").forEach(v=>{v.addEventListener("click",async()=>{if(!t)return;const $=v.dataset.coverVersion;if($)try{await jn(e.id,$),N()}catch(S){M(S.message||"Could not switch cover")}})}),t&&B.querySelectorAll("[data-delete-cover]").forEach(v=>{v.addEventListener("click",async $=>{$.stopPropagation();const S=v.dataset.deleteCover;if(S)try{await An(e.id,S),N(),M("Cover deleted")}catch(P){M(P.message||"Could not delete cover")}})});const y=document.getElementById("track-input");document.getElementById("upload-tracks-button").addEventListener("click",()=>{t&&y.click()});const b=document.getElementById("play-all-button");b&&b.addEventListener("click",()=>{if(!n){M("This share link cannot play audio");return}const v=C(),$=v&&v.tracks||[];if(!$.length){M("No tracks available");return}const S=o.player.track?o.player.track.id:null;if(!!(S&&$.some(D=>D.id===S))&&o.player.wavesurfer){o.player.wavesurfer.playPause();return}K($[0],$,0)});const x=document.getElementById("shuffle-tracks-button");if(x&&x.addEventListener("click",()=>{if(!n){M("This share link cannot play audio");return}const v=C(),$=v&&v.tracks||[];if(!$.length){M("No tracks available");return}const S=sn($);K(S[0],S,0),M("Shuffle queue ready")}),y.addEventListener("change",async()=>{if(!t||A())return;const v=Array.from(y.files||[]);if(!v.length)return;const $=new FormData;v.forEach(S=>{$.append("tracks",S)});try{const S=await T(`/api/projects/${encodeURIComponent(e.id)}/tracks`,{method:"POST",body:$});H(S.project),N(),M("Tracks uploaded")}catch(S){M(S.message||"Track upload failed")}}),a){const v=document.getElementById("share-create-button"),$=document.getElementById("share-access-select");v&&$&&v.addEventListener("click",async()=>{try{const S=await T(`/api/projects/${encodeURIComponent(e.id)}/share`,{method:"POST",body:{access:$.value}});H(S.project),N(),S.shareLink&&S.shareLink.shareUrl&&await ft(`${window.location.origin}${S.shareLink.shareUrl}`)}catch(S){M(S.message||"Could not create share link")}}),B.querySelectorAll("[data-copy-share]").forEach(S=>{S.addEventListener("click",async()=>{const P=S.dataset.copyShare;P&&await ft(`${window.location.origin}${P}`)})}),B.querySelectorAll("[data-delete-share]").forEach(S=>{S.addEventListener("click",async()=>{const P=S.dataset.deleteShare;if(P)try{const D=await T(`/api/projects/${encodeURIComponent(e.id)}/share/${encodeURIComponent(P)}`,{method:"DELETE"});H(D.project),N(),M("Share link deleted")}catch(D){M(D.message||"Could not delete share link")}})})}B.querySelectorAll("[data-play-track]").forEach(v=>{v.addEventListener("click",()=>{if(!n){M("This share link cannot play audio");return}const $=v.dataset.playTrack,S=C(),P=S&&S.tracks||[],D=P.findIndex(Z=>Z.id===$);D<0||K(P[D],P,D)})}),B.querySelectorAll(".track-row[data-track-id]").forEach(v=>{v.addEventListener("click",$=>{var E;if(!n||$.target.closest("button,a,input,select,textarea,label,[contenteditable='true'],.drag-handle")||((E=window.getSelection)==null?void 0:E.call(window).toString().trim()))return;const P=v.dataset.trackId;if(!P)return;const D=C(),Z=D&&D.tracks||[],ne=Z.findIndex(_=>_.id===P);ne<0||K(Z[ne],Z,ne)})}),t&&B.querySelectorAll("[data-track-field]").forEach(v=>{const $=v.dataset.trackField,S=v.dataset.trackId;ye(v,async P=>{await at(e.id,S,{[$]:P})},{singleLine:!0})}),Rn(e.id,{canEdit:t}),ea(e.id,t),aa(e.id,t&&!A()),!A()&&t&&oa(e.id)}function na(e,t){const n=Le(e),a=n.filter(s=>s.type==="reference"),r=n.filter(s=>s.type==="embed");return`
    <div class="moodboard-panel-content">
      <section class="moodboard-palette">
        ${Fn(e.colorPalette||[])}
      </section>

      <section class="moodboard-layout">
        <div class="moodboard-column">
          <div class="moodboard-section-head">
            <h2>Reference Tracks</h2>
          </div>

          <form id="moodboard-reference-form" class="moodboard-form">
            <input id="moodboard-reference-artist" type="text" placeholder="Artist" maxlength="140" ${t?"":"disabled"} />
            <input id="moodboard-reference-title" type="text" placeholder="Track title" maxlength="180" ${t?"":"disabled"} />
            <input id="moodboard-reference-url" type="url" placeholder="https://..." maxlength="600" ${t?"":"disabled"} />
            <button class="secondary-button" type="submit" ${t?"":"disabled"}>${k("plus")} Add</button>
          </form>

          <div class="reference-list">
            ${a.length?a.map(zn).join(""):'<p class="moodboard-empty">No reference tracks yet.</p>'}
          </div>
        </div>

        <div class="moodboard-column moodboard-column-wide">
          <div class="moodboard-section-head">
            <h2>Inspiration Board</h2>
          </div>

          <form id="moodboard-embed-form" class="moodboard-form moodboard-form-inline">
            <input id="moodboard-embed-url" type="url" placeholder="YouTube or SoundCloud URL" maxlength="600" ${t?"":"disabled"} />
            <button class="secondary-button" type="submit" ${t?"":"disabled"}>${k("plus")} Add</button>
          </form>

          <div class="embed-grid">
            ${r.length?r.map(Kn).join(""):'<p class="moodboard-empty">No inspiration links yet.</p>'}
          </div>
        </div>
      </section>
    </div>
  `}function aa(e,t){const n=document.getElementById("moodboard-panel"),a=document.getElementById("open-moodboard-button"),r=document.getElementById("moodboard-panel-close"),s=document.getElementById("moodboard-panel-content");if(!n||!s)return;const c=()=>{const l=C();if(!l||l.id!==e||(s.innerHTML=na(l,t),!t))return;const p=async(d,g)=>{await oe({moodboardItems:d}),c(),g&&M(g)},h=s.querySelector("#moodboard-reference-form");h&&h.addEventListener("submit",async d=>{d.preventDefault();const g=s.querySelector("#moodboard-reference-artist"),w=s.querySelector("#moodboard-reference-title"),I=s.querySelector("#moodboard-reference-url"),L=Ce(g.value),f=Ce(w.value),y=String(I.value||"").trim(),b=y?je(y):"";if(!L||!f){M("Artist and track title are required");return}if(y&&!b){M("Enter a valid URL");return}try{await p([wt("reference",{artist:L,title:f,url:b}),...Le(C())],"Reference track added")}catch(x){M(x.message||"Could not add reference")}});const m=s.querySelector("#moodboard-embed-form");m&&m.addEventListener("submit",async d=>{d.preventDefault();const g=s.querySelector("#moodboard-embed-url"),w=String(g.value||"").trim(),I=je(w),L=Nt(I);if(!L){M("Use a YouTube or SoundCloud URL");return}try{await p([wt("embed",{url:I,provider:L.provider}),...Le(C())],"Inspiration added")}catch(f){M(f.message||"Could not add inspiration")}}),s.querySelectorAll("[data-moodboard-delete]").forEach(d=>{d.addEventListener("click",async()=>{const g=d.dataset.moodboardDelete;if(g)try{await p(Le(C()).filter(w=>w.id!==g),"Moodboard item deleted")}catch(w){M(w.message||"Could not delete item")}})})},i=()=>{te(n)};a&&a.addEventListener("click",()=>{c(),n.classList.remove("hidden")}),r&&r.addEventListener("click",i),n.addEventListener("click",l=>{l.target===n&&i()})}function oa(e){const t=Array.from(B.querySelectorAll(".track-row[data-track-id]"));if(!t.length)return;let n=null;t.forEach(a=>{a.addEventListener("dragstart",r=>{n=a.dataset.trackId,a.classList.add("dragging"),r.dataTransfer.effectAllowed="move"}),a.addEventListener("dragend",()=>{n=null,a.classList.remove("dragging"),t.forEach(r=>r.classList.remove("drag-target"))}),a.addEventListener("dragover",r=>{r.preventDefault(),n&&n!==a.dataset.trackId&&a.classList.add("drag-target")}),a.addEventListener("dragleave",()=>{a.classList.remove("drag-target")}),a.addEventListener("drop",async r=>{if(r.preventDefault(),a.classList.remove("drag-target"),!n)return;const s=a.dataset.trackId;if(n===s)return;const c=C(),i=[...c&&c.tracks||[]],l=i.findIndex(d=>d.id===n),p=i.findIndex(d=>d.id===s);if(l<0||p<0)return;const[h]=i.splice(l,1);i.splice(p,0,h);const m=i.map(d=>d.id);try{const d=await T(`/api/projects/${encodeURIComponent(e)}/tracks/reorder`,{method:"PATCH",body:{trackIds:m}});H(d.project),N()}catch(d){M(d.message||"Failed to reorder tracks")}})})}function Vt(){const e=De(o.settings.trackTagVisibility);o.settings.trackTagVisibility={...e};const t=Xt.map(s=>{const c=e[s.key]?"checked":"";return`
      <label class="settings-toggle-row" for="setting-${u(s.key)}">
        <span class="settings-toggle-copy">
          <span class="settings-toggle-label">${u(s.label)}</span>
          <span class="settings-toggle-desc">${u(s.description)}</span>
        </span>
        <input id="setting-${u(s.key)}" class="settings-toggle-input" type="checkbox" data-track-tag-setting="${u(s.key)}" ${c} />
      </label>
    `}).join("");B.innerHTML=`
    <section class="view settings-view">
      <header class="project-chrome settings-chrome">
        <button id="settings-back-button" class="circle-button" type="button" aria-label="Back">${k("back")}</button>
        <div class="chrome-actions">
          <button id="settings-logout-button" class="circle-button" type="button" aria-label="Log out">${k("logout")}</button>
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
  `;const n=document.getElementById("settings-back-button");n&&n.addEventListener("click",()=>{const s=o.settings.previousPath||"/";R(s==="/settings"?"/":s)});const a=document.getElementById("settings-logout-button");a&&a.addEventListener("click",async()=>{try{await T("/api/logout",{method:"POST"}),o.authenticated=!1,o.currentProject=null,o.sharedProject=null,R("/")}catch(s){M(s.message||"Could not log out")}}),B.querySelectorAll("[data-track-tag-setting]").forEach(s=>{s.addEventListener("change",()=>{const c=s.dataset.trackTagSetting;Object.prototype.hasOwnProperty.call(ie,c)&&(o.settings.trackTagVisibility[c]=!!s.checked,mt())})});const r=document.getElementById("settings-reset-tags");r&&r.addEventListener("click",()=>{o.settings.trackTagVisibility={...ie},mt(),Vt(),M("Tag visibility reset")})}function ra(){const e=o.sharedProject;if(!e){re("Shared project not found",!0);return}const t=!!e.canListen;!t&&ae&&ae.classList.add("hidden");const a=(e.tracks||[]).map((r,s)=>{const c=r.trackNumber===null||r.trackNumber===void 0?"-":u(r.trackNumber),i=tt(r.todos),l=i.filter(h=>!h.done).length,p=i.length?`${l} open / ${i.length} total`:"-";return`
        <article class="track-row readonly shared-track-row" data-track-id="${u(r.id)}">
          <div class="track-index">${s+1}</div>
          <button class="icon-button track-play-button" type="button" data-share-play-track="${u(r.id)}" aria-label="Play track" ${t?"":"disabled"}>${k("play")}</button>
          <div class="track-main">
            <div class="track-line">
              <div class="readonly-text shared-track-title">${u(r.title||"Untitled track")}</div>
            </div>

            <div class="track-meta-line">
              <span class="track-number-chip"># ${c}</span>
              <span class="track-date">${u(Bt(r.createdAt)||"No date")}</span>
              <span class="track-file-name">${u(r.originalName||"")}</span>
            </div>

            <div class="track-aux-grid readonly-aux-grid">
              <div class="track-aux-field">
                <span class="track-aux-label">Notes</span>
                <div class="track-aux-static">${u(r.notes||"-")}</div>
              </div>
              <div class="track-aux-field">
                <span class="track-aux-label">Lyrics</span>
                <div class="track-aux-static">${u(r.lyrics||"-")}</div>
              </div>
              <div class="track-aux-field">
                <span class="track-aux-label">Todos</span>
                <div class="track-aux-static">${u(p)}</div>
              </div>
            </div>
          </div>
          <div class="track-menu-placeholder"></div>
        </article>
      `}).join("");B.innerHTML=`
    <section class="view share-view">
      <header class="topbar">
        <div>
          <h1 class="brand">${u(e.title||"Shared Project")}</h1>
          <p class="brand-sub">by ${u(e.artist||"Unknown Artist")} • ${u(Tt(e.shareAccess))}</p>
        </div>
        <button id="open-studio-button" class="text-button" type="button">Open Studio</button>
      </header>

      <section class="project-hero readonly">
        <div class="cover-editor">
          ${e.coverUrl?`<img src="${u(e.coverUrl)}" alt="Project cover" />`:"No cover"}
        </div>

        <div class="project-meta">
          <p class="readonly-text">Status: ${u(e.status||"In Progress")}</p>
          <div class="description-editable">${u(e.description||"")}</div>
        </div>
      </section>

      <section class="tracks-panel">
        <div class="tracks-toolbar">
          <h2>Tracks</h2>
        </div>
        ${t?"":'<p class="todo-empty">This link can view project data but cannot play audio.</p>'}
        <div class="tracks-list">
          ${a||'<div class="empty-state">No tracks available.</div>'}
        </div>
      </section>
    </section>
  `,document.getElementById("open-studio-button").addEventListener("click",()=>{R("/")}),t&&B.querySelectorAll("[data-share-play-track]").forEach(r=>{r.addEventListener("click",()=>{const s=r.dataset.sharePlayTrack,c=o.sharedProject.tracks||[],i=c.findIndex(l=>l.id===s);i<0||K(c[i],c,i)})}),ce()}function Oe(){B.innerHTML=`
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
  `;const e=document.getElementById("login-form"),t=document.getElementById("password-input");e.addEventListener("submit",async n=>{n.preventDefault();try{await T("/api/login",{method:"POST",body:{password:t.value},allowUnauthorized:!0}),o.authenticated=!0,t.value="",_e()}catch(a){M(a.message||"Login failed")}})}async function sa(e){if(!e){re("Invalid share token",!0);return}try{const t=await T(`/api/share/${encodeURIComponent(e)}`,{allowUnauthorized:!0});if(o.sharedProject=t.project,o.currentProject=t.project,t.project&&t.project.canEdit){N();return}ra()}catch(t){re(t.message||"Share link not found",!0)}}async function _e(){me({flush:!0,fireAndForget:!0}),Ee({flush:!0,fireAndForget:!0});const e=cn();if(o.route=e,e.type==="share"){await sa(e.token);return}try{const t=await T("/api/session",{allowUnauthorized:!0});o.authenticated=!!t.authenticated}catch{re("Could not connect to the Studio server");return}if(!o.authenticated){Oe();return}if(e.type==="settings"){Vt();return}if(e.type==="project"){try{await wn(e.projectId),N()}catch(t){if(t.code==="AUTH_REQUIRED"){Oe();return}re(t.message||"Project not found",!0)}return}try{await kn(),Ht()}catch(t){if(t.code==="AUTH_REQUIRED"){Oe();return}re(t.message||"Could not load projects")}}function ia(){an(),hn(),window.addEventListener("popstate",()=>{_e()}),_e()}ia();
