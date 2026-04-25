var Dt=Object.defineProperty;var Ut=(e,t,a)=>t in e?Dt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var Be=(e,t,a)=>Ut(e,typeof t!="symbol"?t+"":t,a);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function a(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=a(r);fetch(r.href,s)}})();const x=document.getElementById("app"),X=document.getElementById("player"),Xe=document.getElementById("waveform"),Me=document.getElementById("player-play"),Ze=document.getElementById("player-prev"),et=document.getElementById("player-next"),Ve=document.getElementById("player-current-time"),Fe=document.getElementById("player-duration"),pt=document.getElementById("player-track-title"),mt=document.getElementById("player-track-subtitle"),V=document.getElementById("player-cover-art"),pe=document.getElementById("player-volume"),F=document.getElementById("player-volume-toggle"),tt=document.getElementById("player-album-title"),at=document.querySelector(".player-track"),ge=document.getElementById("player-queue-btn"),z=document.getElementById("player-queue-popover"),ke=document.getElementById("player-queue-list"),ne=document.getElementById("player-shuffle-btn"),R=document.getElementById("player-loop-btn"),be=document.getElementById("toast"),we=document.createElement("audio");we.preload="auto";const Rt=["In Progress","Mastering","Done"],Nt=["Idea","Demo","Recording","Mixing","Mastering","Done"],yt={Idea:"#6e6e8a",Demo:"#4a9eff",Recording:"#ff8c42",Mixing:"#f5c518",Mastering:"#a89eff",Done:"#3ecf8e"},qt=["Dark","Energetic","Melancholic","Hype","Chill","Aggressive","Euphoric","Nostalgic"],ht={Dark:"#5a4a6e",Energetic:"#ff5e3a",Melancholic:"#4a7ebd",Hype:"#ff3cac",Chill:"#38b2ac",Aggressive:"#e53e3e",Euphoric:"#d69e2e",Nostalgic:"#744210"},Ht=["C Major","C Minor","C# Major","C# Minor","D Major","D Minor","D# Major","D# Minor","E Major","E Minor","F Major","F Minor","F# Major","F# Minor","G Major","G Minor","G# Major","G# Minor","A Major","A Minor","A# Major","A# Minor","B Major","B Minor"],ze={"C Major":"8B","C Minor":"5A","C# Major":"3B","C# Minor":"12A","D Major":"10B","D Minor":"7A","D# Major":"5B","D# Minor":"2A","E Major":"12B","E Minor":"9A","F Major":"7B","F Minor":"4A","F# Major":"2B","F# Minor":"11A","G Major":"9B","G Minor":"6A","G# Major":"4B","G# Minor":"1A","A Major":"11B","A Minor":"8A","A# Major":"6B","A# Minor":"3A","B Major":"1B","B Minor":"10A"},Ke={"1A":"#3ecfb8","1B":"#3abfaa","2A":"#5dd87c","2B":"#52cc6e","3A":"#a0d84a","3B":"#b4e040","4A":"#e8d03a","4B":"#f0c828","5A":"#f0a030","5B":"#e89020","6A":"#e86040","6B":"#e05038","7A":"#e84878","7B":"#d83868","8A":"#c840c8","8B":"#b830b8","9A":"#9040e0","9B":"#8030d0","10A":"#5060e8","10B":"#4050d8","11A":"#3898d8","11B":"#30a8e0","12A":"#30bce0","12B":"#30ccd4"},ft=[{value:"listen",label:"See + Listen"},{value:"view",label:"See Only"},{value:"edit",label:"See + Edit + Listen"}],ae={date:!0,bpm:!0,key:!0,playCount:!0,status:!0,moodTags:!0,contextBadges:!0},Ot=[{key:"date",label:"Track date",description:"Show the date tag in each track row"},{key:"bpm",label:"BPM tag",description:"Show BPM inline tags"},{key:"key",label:"Key + Camelot tag",description:"Show musical key and Camelot badge"},{key:"playCount",label:"Play count tag",description:"Show listen count tags"},{key:"status",label:"Status tag",description:"Show track status pill"},{key:"moodTags",label:"Mood tags",description:"Show mood chips below metadata"},{key:"contextBadges",label:"Context badges",description:"Show version, notes, lyrics, and todos badges"}],vt="studio.uiSettings.v1",Vt={back:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"></path><path d="M9 12h11"></path></svg>',logout:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><path d="M16 17l5-5-5-5"></path><path d="M21 12H9"></path></svg>',shuffle:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 3h5v5"></path><path d="M4 20l6-6"></path><path d="M21 3l-7 7"></path><path d="M4 4l6 6"></path><path d="M14 14l7 7"></path><path d="M16 21h5v-5"></path></svg>',play:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"></path></svg>',pause:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="5" width="4" height="14" rx="1" fill="currentColor"></rect><rect x="13" y="5" width="4" height="14" rx="1" fill="currentColor"></rect></svg>',more:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="12" r="1.7" fill="currentColor"></circle><circle cx="12" cy="12" r="1.7" fill="currentColor"></circle><circle cx="18" cy="12" r="1.7" fill="currentColor"></circle></svg>',prev:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h2v14H6zM19 5l-9 7 9 7V5z" fill="currentColor"></path></svg>',next:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 5h2v14h-2zM5 5l9 7-9 7V5z" fill="currentColor"></path></svg>',close:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6L6 18"></path><path d="M6 6l12 12"></path></svg>',trash:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path></svg>',plus:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>',check:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5"></path></svg>',volume:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l5 4V6L8 10H4z" fill="currentColor"></path><path d="M16 9a5 5 0 0 1 0 6"></path><path d="M18.8 6.2a9 9 0 0 1 0 11.6"></path></svg>',mute:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l5 4V6L8 10H4z" fill="currentColor"></path><path d="M22 9l-6 6"></path><path d="M16 9l6 6"></path></svg>',queue:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M3 11h18"></path><path d="M3 16h10"></path><polygon points="17,13 22,16 17,19" fill="currentColor" stroke="none"></polygon></svg>',repeat:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2l4 4-4 4"></path><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><path d="M7 22l-4-4 4-4"></path><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>',repeatOne:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2l4 4-4 4"></path><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><path d="M7 22l-4-4 4-4"></path><path d="M21 13v2a4 4 0 0 1-4 4H3"></path><text x="12" y="15" text-anchor="middle" font-size="7" font-weight="bold" fill="currentColor" stroke="none">1</text></svg>',link:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',notes:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 3 14 8 19 8"></polyline><line x1="8" y1="13" x2="16" y2="13"></line><line x1="8" y1="17" x2="13" y2="17"></line></svg>',metadata:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"></path></svg>',settings:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 0-.33 1v.17a2 2 0 1 1-4 0V21a1.65 1.65 0 0 0-.33-1 1.65 1.65 0 0 0-1-.6 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 0-1-.33H2.83a2 2 0 1 1 0-4H3a1.65 1.65 0 0 0 1-.33 1.65 1.65 0 0 0 .6-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-.6 1.65 1.65 0 0 0 .33-1V2.83a2 2 0 1 1 4 0V3a1.65 1.65 0 0 0 .33 1 1.65 1.65 0 0 0 1 .6 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.1.31.1.65 0 1a1.65 1.65 0 0 0 .6 1 1.65 1.65 0 0 0 1 .33h.17a2 2 0 1 1 0 4H21a1.65 1.65 0 0 0-1 .33 1.65 1.65 0 0 0-.6 1z"></path></svg>',sort:'<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="6" y1="12" x2="18" y2="12"></line><line x1="9" y1="18" x2="15" y2="18"></line></svg>'},n={authenticated:!1,route:{type:"home"},projects:[],currentProject:null,sharedProject:null,player:{wavesurfer:null,queue:[],index:-1,track:null,sourceContext:null,autoplayOnReady:!1,volume:1,previousVolume:1,loop:"none",shuffle:!1},trackMenu:{trackId:null,notes:"",lyrics:"",todos:[],versions:[],activeVersionId:null,bpm:null,key:null,trackStatus:null,moodTags:[],listenCount:0,lufs:null,peakDb:null},metadataPanel:{colorPalette:[]},homeSort:{key:"updatedAt",dir:"desc"},settings:{trackTagVisibility:{...ae},previousPath:"/"}};let je=null,oe=null,re=null;function w(e){return Vt[e]||""}function _e(e,t,a){return Math.max(t,Math.min(a,e))}function m(e){return String(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#39;")}function nt(e){return String(e||"").replace(/\u00a0/g," ").replace(/\r/g,"").trim()}function De(e){if(!Number.isFinite(e)||e<0)return"0:00";const t=Math.floor(e),a=Math.floor(t/60),o=String(t%60).padStart(2,"0");return`${a}:${o}`}function gt(e){if(!Number.isFinite(e)||e<=0)return"0m";const t=Math.max(0,Math.round(e)),a=Math.floor(t/3600),o=Math.floor(t%3600/60),r=t%60;return a>0?`${a}h ${String(o).padStart(2,"0")}m`:o>0?`${o}m ${String(r).padStart(2,"0")}s`:`${r}s`}function Ft(e){const t=Number(e);if(!Number.isFinite(t)||t<=0)return"-";const a=t/(1024*1024);if(a>=1)return`${a.toFixed(1)} MB`;const o=t/1024;return`${Math.max(1,Math.round(o))} KB`}function kt(e){const t=String(e||"listen"),a=ft.find(o=>o.value===t);return a?a.label:"See + Listen"}function zt(e="listen"){return ft.map(t=>{const a=t.value===e?"selected":"";return`<option value="${m(t.value)}" ${a}>${m(t.label)}</option>`}).join("")}function bt(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleDateString(void 0,{month:"short",day:"numeric"})}function Ue(e){const t=Math.random().toString(36).slice(2,9);return`${e}-${Date.now()}-${t}`}function ye(e,t){if(!e)return;const a=e.querySelector(".marquee-inner")||e;a.textContent=t,e.classList.remove("is-scrolling"),e.style.removeProperty("--marquee-offset"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{Et(e)})})}function Et(e){if(!e)return;const t=e.querySelector(".marquee-inner")||e;e.classList.remove("is-scrolling"),e.style.removeProperty("--marquee-offset");const a=t.scrollWidth-e.clientWidth;a>2&&(e.style.setProperty("--marquee-offset",`-${a}px`),e.classList.add("is-scrolling"))}function $e(e){return String(e||"").replace(/\r/g,"").trim().slice(0,220)}function Re(e){if(typeof e=="string"){const o=$e(e);return o?{id:Ue("todo"),text:o,done:!1}:null}if(!e||typeof e!="object")return null;const t=$e(e.text);return t?{id:String(e.id||"").trim().slice(0,80)||Ue("todo"),text:t,done:!!e.done}:null}function Ge(e){return Array.isArray(e)?e.map(t=>Re(t)).filter(t=>t!==null):typeof e=="string"?e.split(`
`).map(t=>Re(t)).filter(t=>t!==null):[]}function Te(e){const t=e&&typeof e=="object"?e:{},a={};return Object.keys(ae).forEach(o=>{a[o]=typeof t[o]=="boolean"?t[o]:ae[o]}),a}function Kt(){try{const e=window.localStorage.getItem(vt);if(!e){n.settings.trackTagVisibility={...ae};return}const t=JSON.parse(e);n.settings.trackTagVisibility=Te(t&&t.trackTagVisibility)}catch{n.settings.trackTagVisibility={...ae}}}function ot(){try{const e={trackTagVisibility:Te(n.settings.trackTagVisibility)};window.localStorage.setItem(vt,JSON.stringify(e))}catch{}}function wt(e={}){const{delayMs:t=650,getSnapshot:a,saveSnapshot:o,onError:r}=e;let s=null,c=!1,i=!1,d=null;function y(){if(typeof a!="function")return null;const $=a();return $?{snapshot:$,key:JSON.stringify($)}:null}async function v(){const $=y();if(!(!$||$.key===d)){if(c){i=!0;return}c=!0;try{await o($.snapshot),d=$.key}catch(L){typeof r=="function"&&r(L)}finally{c=!1,i&&(i=!1,v())}}}function k(){s&&window.clearTimeout(s),s=window.setTimeout(()=>{s=null,v()},t)}async function u(){s&&(window.clearTimeout(s),s=null),await v()}function b(){const $=y();d=$?$.key:null}function E($={}){const{flush:L=!1,fireAndForget:h=!1}=$;return s&&(window.clearTimeout(s),s=null),L?h?(v(),Promise.resolve()):v():Promise.resolve()}return b(),{schedule:k,flush:u,destroy:E,markCurrentAsSaved:b}}function A(){return n.route&&n.route.type==="share"}function G(){return A()?n.route.token:null}function T(){return A()?n.sharedProject:n.currentProject}function Gt(){const e=T();return(e&&e.artist?String(e.artist).trim():"")||"Unknown Artist"}function Y(){const e=T();return e?A()?!!e.canEdit:!0:!1}function Ce(){const e=T();return e?A()?!!e.canListen:!0:!1}function Wt(e){return!e||!Array.isArray(e.versions)||!e.versions.length?null:e.versions.find(t=>t.id===e.activeVersionId)||e.versions[0]}function Ie(e){const t=T();return(t&&Array.isArray(t.tracks)?t.tracks:[]).find(o=>o.id===e)||null}function Qt(e){const t=[...e];for(let a=t.length-1;a>0;a-=1){const o=Math.floor(Math.random()*(a+1));[t[a],t[o]]=[t[o],t[a]]}return t}function M(e){be&&(be.textContent=e,be.classList.remove("hidden"),je&&window.clearTimeout(je),je=window.setTimeout(()=>{be.classList.add("hidden")},2600))}function Z(e,t){!e||e.classList.contains("hidden")||(e.classList.add("is-closing"),window.setTimeout(()=>{e.classList.add("hidden"),e.classList.remove("is-closing")},200))}function Mt(e){return new Promise(t=>{const a=document.getElementById("confirm-dialog"),o=document.getElementById("confirm-dialog-message"),r=document.getElementById("confirm-dialog-ok"),s=document.getElementById("confirm-dialog-cancel");o.textContent=e,a.classList.remove("hidden");function c(){Z(a),r.removeEventListener("click",i),s.removeEventListener("click",d)}function i(){c(),t(!0)}function d(){c(),t(!1)}r.addEventListener("click",i),s.addEventListener("click",d)})}async function C(e,t={}){const{method:a="GET",body:o,allowUnauthorized:r=!1}=t,s={method:a,credentials:"include",headers:{}};o instanceof FormData?s.body=o:o!==void 0&&(s.body=JSON.stringify(o),s.headers["Content-Type"]="application/json");const c=await fetch(e,s),d=(c.headers.get("content-type")||"").includes("application/json")?await c.json().catch(()=>({})):await c.text();if(!c.ok){if(c.status===401&&!r){const v=new Error("Authentication required");throw v.code="AUTH_REQUIRED",v}const y=new Error(d&&d.error?d.error:`Request failed (${c.status})`);throw y.code=c.status===401?"AUTH_REQUIRED":"REQUEST_FAILED",y}return d}function Yt(){const t=(window.location.pathname.replace(/\/+$/,"")||"/").split("/").filter(Boolean);return t[0]==="settings"?{type:"settings"}:t[0]==="share"&&t[1]?{type:"share",token:decodeURIComponent(t[1])}:t[0]==="project"&&t[1]?{type:"project",projectId:decodeURIComponent(t[1])}:{type:"home"}}function D(e){const t=window.location.pathname.replace(/\/+$/,"")||"/";e==="/settings"&&t!=="/settings"&&(n.settings.previousPath=t),window.location.pathname!==e&&window.history.pushState({},"",e),Le()}function Jt(e){return{id:e.id,title:e.title,artist:e.artist,description:e.description,status:e.status,coverUrl:e.coverUrl,trackCount:Array.isArray(e.tracks)?e.tracks.length:0,totalRuntimeSeconds:Number(e.totalRuntimeSeconds)||0,shareUrl:e.shareUrl,shareLinks:Array.isArray(e.shareLinks)?e.shareLinks:[],completionPercent:e.completionPercent||0,starRating:e.starRating||0,startDate:e.startDate||null,releaseDate:e.releaseDate||null,createdAt:e.createdAt,updatedAt:e.updatedAt}}function We(e){const t=Jt(e),a=n.projects.findIndex(o=>o.id===t.id);if(a>=0){n.projects.splice(a,1,t);return}n.projects.unshift(t)}function Xt(e){n.projects=n.projects.filter(t=>t.id!==e)}async function rt(e){if(e)try{await navigator.clipboard.writeText(e),M("Share link copied");return}catch{const a=document.createElement("input");a.value=e,document.body.appendChild(a),a.select(),document.execCommand("copy"),document.body.removeChild(a),M("Share link copied")}}function ee(e,t=!1){x.innerHTML=`
    <section class="view">
      <div class="empty-state">
        <h2>Studio</h2>
        <p>${m(e||"Something went wrong")}</p>
        ${t?'<button id="error-home-button" class="primary-button" type="button">Back Home</button>':""}
      </div>
    </section>
  `;const a=document.getElementById("error-home-button");a&&a.addEventListener("click",()=>D("/"))}function de(){if(!n.player.wavesurfer||!Me)return;const e=n.player.wavesurfer.isPlaying();Me.innerHTML=w(e?"pause":"play"),V&&V.classList.toggle("is-playing",e)}function $t(e){pe&&(pe.value=String(e)),F&&(F.innerHTML=e>0?w("volume"):w("mute"))}function st(){if(!R)return;const e=n.player.loop;e==="one"?(R.innerHTML=w("repeatOne"),R.classList.add("is-active"),R.title="Loop: one"):e==="all"?(R.innerHTML=w("repeat"),R.classList.add("is-active"),R.title="Loop: all"):(R.innerHTML=w("repeat"),R.classList.remove("is-active"),R.title="Loop: off")}function it(){ne&&(ne.classList.toggle("is-active",n.player.shuffle),ne.title=n.player.shuffle?"Shuffle: on":"Shuffle: off")}function Zt(){if(!ke)return;const e=n.player.queue||[];if(!e.length){ke.innerHTML='<p class="player-queue-empty">No tracks in queue</p>';return}ke.innerHTML=e.map((t,a)=>`
    <button class="player-queue-item${a===n.player.index?" is-active":""}" type="button" data-queue-index="${a}">
      <span class="player-queue-num">${a+1}</span>
      <span class="player-queue-name">${m(t.title||t.originalName||"Untitled")}</span>
    </button>
  `).join(""),ke.querySelectorAll("[data-queue-index]").forEach(t=>{t.addEventListener("click",()=>{const a=parseInt(t.dataset.queueIndex,10);he(a),Ne()})})}function Ne(){z&&(z.classList.remove("is-open"),z.setAttribute("aria-hidden","true"))}function le(e){const t=_e(Number(e),0,1);n.player.volume=t,t>0&&(n.player.previousVolume=t),n.player.wavesurfer&&n.player.wavesurfer.setVolume(t),$t(t)}function ea(){if(!V)return;const e=n.route.type==="share"?n.sharedProject:n.currentProject;if(tt&&ye(tt,e&&e.title?e.title:""),e&&e.coverUrl){V.style.backgroundImage=`url("${e.coverUrl}?v=${e.activeCoverId||""}")`,V.classList.add("has-image"),V.textContent="";return}V.style.backgroundImage="",V.classList.remove("has-image");const t=e&&e.title?String(e.title).charAt(0).toUpperCase():"S";V.textContent=t}function se(){const e=n.player.track?n.player.track.id:null,t=!!(n.player.wavesurfer&&n.player.wavesurfer.isPlaying());x.querySelectorAll(".track-row[data-track-id]").forEach(r=>{const s=!!(e&&r.dataset.trackId===e);r.classList.toggle("is-active",s);const c=r.querySelector(".track-play-button");c&&(c.innerHTML=w(s&&t?"pause":"play"),c.title=s&&t?"Pause track":"Play track")});const o=document.getElementById("play-all-button");if(o){const r=T()&&T().tracks||[],s=!!(e&&r.some(c=>c.id===e));o.innerHTML=w(s&&t?"pause":"play"),o.title=s&&t?"Pause":"Play from start"}}function he(e){const t=n.player.queue||[];if(!t.length)return;let a=e;a<0&&(a=t.length-1),a>=t.length&&(a=0);const o=t[a];K(o,t,a)}function ct(){const e=n.player.queue||[];if(n.player.shuffle&&e.length>1){let t;do t=Math.floor(Math.random()*e.length);while(t===n.player.index);he(t)}else he(n.player.index+1)}function ta(){if(!n.player.track)return;if((n.player.wavesurfer?n.player.wavesurfer.getCurrentTime():0)<2){if(n.player.index<=0){n.player.wavesurfer&&n.player.wavesurfer.pause();return}he(n.player.index-1);return}n.player.wavesurfer&&n.player.wavesurfer.seekTo(0)}function lt(){const e=n.player.queue||[];if(!e.length)return;let t=-1;if(n.player.shuffle&&e.length>1)t=(n.player.index+1)%e.length;else if(t=n.player.index+1,t>=e.length)if(n.player.loop==="all")t=0;else return;const a=e[t];!a||!a.audioUrl||we.src!==a.audioUrl&&(we.src=a.audioUrl,we.load())}function K(e,t,a){var s;if(!n.player.wavesurfer||!e){M("Waveform player is unavailable");return}if(!e.audioUrl){M("This link cannot play audio");return}if(n.player.track&&n.player.track.id===e.id&&n.player.track.audioUrl===e.audioUrl){n.player.wavesurfer.playPause();return}n.player.queue=t,n.player.index=a,n.player.track=e,n.player.sourceContext=A()?{type:"share",token:G()}:{type:"project",projectId:((s=T())==null?void 0:s.id)||null},n.player.autoplayOnReady=!0,e.id&&T()&&oa(e.id);const o=e.title||e.originalName||"Untitled Track";document.title=o+" — Studio",ye(pt,o),ye(mt,Gt()),Ve.textContent="0:00",Fe.textContent="0:00",ea();const r=X.classList.contains("hidden");X.classList.remove("hidden"),r&&(X.classList.add("player-entering"),window.setTimeout(()=>X.classList.remove("player-entering"),360)),n.player.wavesurfer.load(e.audioUrl),se(),de()}function aa(){if(!n.player.track||!n.player.sourceContext)return;const e=n.player.sourceContext;if(e.type==="share"&&e.token){if(n.route.type==="share"&&n.route.token===e.token)return;D(`/share/${encodeURIComponent(e.token)}`);return}if(e.type==="project"&&e.projectId){if(n.route.type==="project"&&n.route.projectId===e.projectId)return;D(`/project/${encodeURIComponent(e.projectId)}`)}}function na(){if(!window.WaveSurfer||!Xe){M("Could not initialize waveform renderer");return}const e=document.createElement("audio");e.preload="auto",n.player.wavesurfer=WaveSurfer.create({container:Xe,media:e,waveColor:"rgba(255, 255, 255, 0.18)",progressColor:"#A89EFF",cursorColor:"#d9d4ff",barWidth:1.2,barGap:1.2,barRadius:2,height:30,normalize:!0,hideScrollbar:!0}),e.addEventListener("canplay",()=>{n.player.autoplayOnReady&&(n.player.autoplayOnReady=!1,e.volume=_e(n.player.volume,0,1),e.play().catch(()=>{}),de(),lt())}),Ze.innerHTML=w("prev"),et.innerHTML=w("next"),Me.innerHTML=w("play"),$t(n.player.volume);const t=r=>{Ve.textContent=De(r)};n.player.wavesurfer.on("ready",()=>{var r,s;Fe.textContent=De(n.player.wavesurfer.getDuration()),n.player.autoplayOnReady&&(n.player.autoplayOnReady=!1,(s=(r=n.player.wavesurfer.play()).catch)==null||s.call(r,()=>{}),lt()),le(n.player.volume),de()}),n.player.wavesurfer.on("audioprocess",()=>{t(n.player.wavesurfer.getCurrentTime())}),n.player.wavesurfer.on("timeupdate",r=>{t(r)}),n.player.wavesurfer.on("interaction",()=>{t(n.player.wavesurfer.getCurrentTime())}),n.player.wavesurfer.on("play",()=>{de(),se()}),n.player.wavesurfer.on("pause",()=>{de(),se()}),n.player.wavesurfer.on("finish",()=>{const r=n.player.loop;if(r==="one")n.player.wavesurfer.seekTo(0),n.player.wavesurfer.play();else if(r==="all")ct();else{const s=n.player.index+1;s<(n.player.queue||[]).length&&he(s)}}),n.player.wavesurfer.on("error",()=>{M("Could not load track")}),Me.addEventListener("click",()=>{if(!n.player.track){const r=n.player.queue||[];r.length&&K(r[0],r,0);return}n.player.wavesurfer.playPause()}),Ze.addEventListener("click",ta),et.addEventListener("click",ct),at&&at.addEventListener("click",aa),pe&&pe.addEventListener("input",()=>{le(pe.value)});const a=F?F.nextElementSibling:null;F&&F.addEventListener("click",()=>{if(window.matchMedia("(pointer: coarse)").matches){a&&a.classList.toggle("is-open");return}if(n.player.volume<=.001){le(n.player.previousVolume||.85);return}n.player.previousVolume=n.player.volume,le(0)});const o=F?F.closest(".player-volume"):null;o&&o.addEventListener("wheel",r=>{r.preventDefault();const s=r.deltaY<0?.05:-.05;le(_e(n.player.volume+s,0,1))},{passive:!1}),document.addEventListener("click",r=>{a&&a.classList.contains("is-open")&&!a.contains(r.target)&&r.target!==F&&a.classList.remove("is-open")}),ne&&(ne.innerHTML=w("shuffle"),it(),ne.addEventListener("click",()=>{n.player.shuffle=!n.player.shuffle,it()})),R&&(st(),R.addEventListener("click",()=>{const r=["none","all","one"],s=r.indexOf(n.player.loop);n.player.loop=r[(s+1)%r.length],st()})),ge&&(ge.innerHTML=w("queue"),ge.addEventListener("click",()=>{z.classList.contains("is-open")?Ne():(Zt(),z.classList.add("is-open"),z.setAttribute("aria-hidden","false"))})),document.addEventListener("click",r=>{z&&z.classList.contains("is-open")&&!z.contains(r.target)&&r.target!==ge&&Ne()})}async function oa(e){try{const t=A()?`/api/share/${encodeURIComponent(G())}/tracks/${encodeURIComponent(e)}/play`:`/api/projects/${encodeURIComponent(T().id)}/tracks/${encodeURIComponent(e)}/play`,a=await C(t,{method:"POST"}),o=T();if(o&&Array.isArray(o.tracks)){const r=o.tracks.find(s=>s.id===e);r&&(r.listenCount=a.listenCount)}if(n.trackMenu.trackId===e){n.trackMenu.listenCount=a.listenCount;const r=document.getElementById("track-listen-count");r&&(r.textContent=`Played ${a.listenCount} time${a.listenCount!==1?"s":""}`)}}catch{}}function ra(e,t){const a=Math.min(e.length,t*180);if(a<t*6)return null;const r=Math.max(1,Math.floor(t/22050)),s=t/r,c=Math.floor(a/r);if(c<4096)return null;const i=new Float32Array(c);for(let g=0;g<c;g++)i[g]=e[g*r]||0;for(let g=c-1;g>=1;g--)i[g]=i[g]-.97*i[g-1];i[0]=0;const d=Math.max(1,Math.round(s/200)),y=Math.floor(c/d);if(y<256)return null;const v=new Float32Array(y);for(let g=0;g<y;g++){const j=g*d;let U=0;for(let W=0;W<d;W++)U+=Math.abs(i[j+W]||0);v[g]=U/d}const k=new Float32Array(y),u=7;let b=0;for(let g=0;g<y;g++)b+=v[g],g>=u&&(b-=v[g-u]),k[g]=b/Math.min(u,g+1);const E=new Float32Array(y);let $=0;for(let g=1;g<y;g++){const j=k[g]-k[g-1],U=j>0?j:0;E[g]=U,$+=U}$/=Math.max(1,y-1);const L=$*1.55,l=Math.max(1,Math.round(60/220*(s/d))),p=[];let f=-l;for(let g=1;g<y-1;g++){const j=E[g];j<L||j>=E[g-1]&&j>=E[g+1]&&g-f>=l&&(p.push(g),f=g)}if(p.length<8)return null;const I=s/d,S=new Map,O=12;for(let g=0;g<p.length;g++){const j=p[g],U=Math.min(p.length,g+O);for(let W=g+1;W<U;W++){const Je=p[W]-j;if(Je<=0)continue;let Q=60*I/Je;for(;Q<70;)Q*=2;for(;Q>180;)Q/=2;if(Q<70||Q>180)continue;const Ae=Math.round(Q),jt=O-(W-g)+1,Pt=Math.max(0,1-Math.abs(Q-Ae)),_t=jt*(.7+.3*Pt);S.set(Ae,(S.get(Ae)||0)+_t)}}if(!S.size)return null;let J=0,ce=-1/0;for(const[g,j]of S.entries()){const U=j+(S.get(g-1)||0)+(S.get(g+1)||0);U>ce&&(ce=U,J=g)}let ve=0,xe=0;for(let g=-1;g<=1;g++){const j=J+g,U=S.get(j)||0;ve+=j*U,xe+=U}return xe>0?Math.round(ve/xe):J}function sa(e,t){const a=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],o=new Float32Array(12),r=Math.min(e.length,t*30),s=8192;for(let u=0;u<12;u++)for(let b=2;b<=5;b++){const E=36+u+(b-2)*12,$=440*Math.pow(2,(E-69)/12);if($>=t/2||$<20)continue;const L=2*Math.cos(2*Math.PI*$/t);let h=0,l=0;for(let p=0;p+s<=r;p+=s){let f=0,I=0;for(let S=0;S<s;S++){const O=e[p+S]+L*f-I;I=f,f=O}h+=f*f+I*I-L*f*I,l++}o[u]+=l>0?h/l:0}const c=Math.max(...o);if(c>0)for(let u=0;u<12;u++)o[u]/=c;const i=[6.35,2.23,3.48,2.33,4.38,4.09,2.52,5.19,2.39,3.66,2.29,2.88],d=[6.33,2.68,3.52,5.38,2.6,3.53,2.54,4.75,3.98,2.69,3.34,3.17];function y(u,b){let E=0,$=0;for(let p=0;p<12;p++)E+=o[p],$+=u[(p+b)%12];E/=12,$/=12;let L=0,h=0,l=0;for(let p=0;p<12;p++){const f=o[p]-E,I=u[(p+b)%12]-$;L+=f*I,h+=f*f,l+=I*I}return h*l>0?L/Math.sqrt(h*l):0}let v=null,k=-1/0;for(let u=0;u<12;u++){const b=y(i,u),E=y(d,u);b>k&&(k=b,v=a[u]+" Major"),E>k&&(k=E,v=a[u]+" Minor")}return v}async function It(e){const t=await fetch(e,{credentials:"include"});if(!t.ok)throw new Error("Could not fetch audio file for analysis");const a=await t.arrayBuffer(),o=new(window.AudioContext||window.webkitAudioContext);let r;try{r=await new Promise((E,$)=>{o.decodeAudioData(a,E,$)})}finally{o.close()}const s=r.numberOfChannels,c=r.length,i=new Float32Array(c);let d=0,y=0;for(let E=0;E<s;E++){const $=r.getChannelData(E);let L=0;for(let h=0;h<c;h++){const l=$[h];i[h]+=l;const p=l<0?-l:l;p>y&&(y=p),L+=l*l}d+=L/c}for(let E=0;E<c;E++)i[E]/=s;const v=d>0?Math.round((-.691+10*Math.log10(d))*10)/10:null,k=y>0?Math.round(20*Math.log10(y)*10)/10:null,u=ra(i,r.sampleRate),b=sa(i,r.sampleRate);return{lufs:v,peakDb:k,bpm:u,key:b}}async function ia(e,t){if(n.trackMenu.trackId!==e)return;const a=document.getElementById("track-lufs-analyze");a&&(a.disabled=!0,a.textContent="Detecting…");try{const o=await It(t);if(n.trackMenu.trackId!==e)return;n.trackMenu.lufs=o.lufs,n.trackMenu.peakDb=o.peakDb,n.trackMenu.bpm===null&&(n.trackMenu.bpm=o.bpm),n.trackMenu.key===null&&(n.trackMenu.key=o.key),Qe(),N()}catch{}finally{if(n.trackMenu.trackId===e){const o=document.getElementById("track-lufs-analyze");o&&(o.disabled=!1),Ye()}}}async function ca(){const e=await C("/api/projects");n.projects=e.projects||[]}async function la(e){const t=await C(`/api/projects/${encodeURIComponent(e)}`);n.currentProject=t.project,We(t.project)}function q(e){A()&&(n.sharedProject=e),n.currentProject=e,We(e)}async function ue(e){const t=T();if(!t)return;const a=A()?`/api/share/${encodeURIComponent(G())}/project`:`/api/projects/${encodeURIComponent(t.id)}`,o=await C(a,{method:"PATCH",body:e});q(o.project)}async function St(e,t,a){const o=A()?`/api/share/${encodeURIComponent(G())}/tracks/${encodeURIComponent(t)}`:`/api/projects/${encodeURIComponent(e)}/tracks/${encodeURIComponent(t)}`,r=await C(o,{method:"PATCH",body:a});q(r.project)}function da(){if(!n.trackMenu.trackId)return null;const e=document.getElementById("track-menu-notes"),t=document.getElementById("track-menu-lyrics"),a=document.getElementById("track-bpm-input"),o=document.getElementById("track-key-select"),r=document.getElementById("track-status-select"),s=String(e?e.value:n.trackMenu.notes).slice(0,4e3),c=String(t?t.value:n.trackMenu.lyrics).slice(0,12e3),i=a?a.value!==""?Number(a.value):null:n.trackMenu.bpm,d=o?o.value||null:n.trackMenu.key,y=r?r.value||null:n.trackMenu.trackStatus,v=(n.trackMenu.todos||[]).map(k=>Re(k)).filter(k=>k!==null);return{trackId:n.trackMenu.trackId,notes:s,lyrics:c,todos:v,bpm:i,key:d,trackStatus:y,moodTags:[...n.trackMenu.moodTags||[]],lufs:n.trackMenu.lufs,peakDb:n.trackMenu.peakDb}}async function ua(e,t){!t||!t.trackId||await St(e,t.trackId,{notes:t.notes,lyrics:t.lyrics,todos:t.todos,bpm:t.bpm,key:t.key,trackStatus:t.trackStatus,moodTags:t.moodTags,lufs:t.lufs,peakDb:t.peakDb})}function pa(e){ie({flush:!0,fireAndForget:!0}),oe=wt({delayMs:700,getSnapshot:da,saveSnapshot:async t=>{await ua(e,t)},onError:t=>{M(t.message||"Could not autosave track details")}})}function N(){oe&&oe.schedule()}function ie(e={}){if(!oe)return Promise.resolve();const t=oe;return oe=null,t.destroy(e)}function ma(){var i,d,y,v,k,u;const e=((i=document.getElementById("meta-start-date-btn"))==null?void 0:i.dataset.value)||"",t=((d=document.getElementById("meta-release-date-btn"))==null?void 0:d.dataset.value)||"",a=Math.max(0,Math.min(100,Math.round(Number(((y=document.getElementById("meta-completion-range"))==null?void 0:y.value)||0)))),o=Number((v=document.getElementById("meta-star-rating"))==null?void 0:v.dataset.rating)||0,r=String(((k=document.getElementById("meta-presave-link"))==null?void 0:k.value)||"").trim(),s=String(((u=document.getElementById("meta-distributor-notes"))==null?void 0:u.value)||""),c={};return x.querySelectorAll(".stream-checkbox").forEach(b=>{c[b.dataset.platform]=b.checked}),{startDate:e||null,releaseDate:t||null,completionPercent:a,starRating:o,colorPalette:[...n.metadataPanel.colorPalette],streamingChecklist:c,preSaveLink:r,distributorNotes:s}}function ya(){fe({flush:!1}),re=wt({delayMs:700,getSnapshot:ma,saveSnapshot:async e=>{await ue(e)},onError:e=>{M(e.message||"Could not autosave metadata")}})}function H(){re&&re.schedule()}function fe(e={}){if(!re)return Promise.resolve();const t=re;return re=null,t.destroy(e)}async function ha(e,t,a){const o=new FormData;o.append("track",a);const r=A()?`/api/share/${encodeURIComponent(G())}/tracks/${encodeURIComponent(t)}/versions`:`/api/projects/${encodeURIComponent(e)}/tracks/${encodeURIComponent(t)}/versions`,s=await C(r,{method:"POST",body:o});q(s.project)}async function fa(e,t,a){const o=A()?`/api/share/${encodeURIComponent(G())}/tracks/${encodeURIComponent(t)}/versions/${encodeURIComponent(a)}/select`:`/api/projects/${encodeURIComponent(e)}/tracks/${encodeURIComponent(t)}/versions/${encodeURIComponent(a)}/select`,r=await C(o,{method:"POST"});q(r.project)}async function va(e,t){const a=`/api/projects/${encodeURIComponent(e)}/covers/${encodeURIComponent(t)}`,o=await C(a,{method:"DELETE"});q(o.project)}async function ga(e,t){const a=new FormData;a.append("cover",t);const o=A()?`/api/share/${encodeURIComponent(G())}/cover`:`/api/projects/${encodeURIComponent(e)}/cover`,r=await C(o,{method:"POST",body:a});q(r.project)}async function ka(e,t){const a=A()?`/api/share/${encodeURIComponent(G())}/covers/${encodeURIComponent(t)}/select`:`/api/projects/${encodeURIComponent(e)}/covers/${encodeURIComponent(t)}/select`,o=await C(a,{method:"POST"});q(o.project)}function qe(e={}){const{flushAutosave:t=!0}=e;ie(t?{flush:!0,fireAndForget:!0}:{flush:!1});const a=document.getElementById("track-menu-overlay");a&&(Z(a),a.setAttribute("aria-hidden","true")),n.trackMenu={trackId:null,notes:"",lyrics:"",todos:[],versions:[],activeVersionId:null,bpm:null,key:null,trackStatus:null,moodTags:[],listenCount:0,lufs:null,peakDb:null}}function Se(){const e=document.getElementById("track-todo-list");if(!e)return;const t=Y(),a=n.trackMenu.todos||[];if(!a.length){e.innerHTML='<p class="todo-empty">No todos yet.</p>';return}e.innerHTML=a.map((o,r)=>`
        <div class="todo-row ${o.done?"done":""}" data-todo-row="${r}">
          <label class="todo-toggle" aria-label="Toggle todo">
            <input type="checkbox" data-todo-toggle="${r}" ${o.done?"checked":""} ${t?"":"disabled"} />
            <span>${w("check")}</span>
          </label>
          <input
            class="todo-text-input"
            type="text"
            value="${m(o.text)}"
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
          >${w("close")}</button>
        </div>
      `).join(""),t&&(e.querySelectorAll("[data-todo-toggle]").forEach(o=>{o.addEventListener("change",()=>{const r=Number.parseInt(o.dataset.todoToggle,10);!Number.isFinite(r)||!n.trackMenu.todos[r]||(n.trackMenu.todos[r].done=o.checked,Se(),N())})}),e.querySelectorAll("[data-todo-text]").forEach(o=>{o.addEventListener("input",()=>{const r=Number.parseInt(o.dataset.todoText,10);!Number.isFinite(r)||!n.trackMenu.todos[r]||(n.trackMenu.todos[r].text=$e(o.value),N())})}),e.querySelectorAll("[data-todo-remove]").forEach(o=>{o.addEventListener("click",()=>{const r=Number.parseInt(o.dataset.todoRemove,10);Number.isFinite(r)&&(n.trackMenu.todos.splice(r,1),Se(),N())})}))}function ba(){const e=document.getElementById("track-version-list");if(!e)return;const t=Y(),a=Array.isArray(n.trackMenu.versions)?n.trackMenu.versions:[];if(!a.length){e.innerHTML='<p class="todo-empty">No versions yet.</p>';return}e.innerHTML=a.map(o=>{const r=o.id===n.trackMenu.activeVersionId,s=[];return Number.isFinite(o.durationSeconds)&&s.push(De(o.durationSeconds)),Number.isFinite(o.sizeBytes)&&s.push(Ft(o.sizeBytes)),`
        <div class="version-row ${r?"active":""}" data-version-row="${m(o.id)}">
          <div class="version-main">
            <div class="version-title">${m(o.originalName||"Untitled version")}</div>
            <div class="version-meta">${m(s.join(" • ")||"No metadata")}</div>
          </div>
          <button class="secondary-button version-use-button" type="button" data-version-select="${m(o.id)}" ${t?"":"disabled"}>${r?"Active":"Use"}</button>
        </div>
      `}).join(""),t&&e.querySelectorAll("[data-version-select]").forEach(o=>{o.addEventListener("click",async()=>{const r=o.dataset.versionSelect;if(!r||!n.trackMenu.trackId)return;const s=T();if(s)try{await fa(s.id,n.trackMenu.trackId,r);const c=Ie(n.trackMenu.trackId);if(c&&(n.trackMenu.versions=Array.isArray(c.versions)?[...c.versions]:[],n.trackMenu.activeVersionId=c.activeVersionId||null),n.player.track&&n.player.track.id===n.trackMenu.trackId&&c){const i=T()&&T().tracks||[],d=i.findIndex(y=>y.id===c.id);d>=0&&K(i[d],i,d)}_(),He(n.trackMenu.trackId),M("Switched track version")}catch(c){M(c.message||"Could not switch version")}})})}function dt(){const e=document.getElementById("track-todo-input");if(!e)return;const t=$e(e.value);t&&(n.trackMenu.todos.push({id:Ue("todo"),text:t,done:!1}),e.value="",Se(),N())}function He(e){ie({flush:!0,fireAndForget:!0});const t=Ie(e);if(!t)return;n.trackMenu.trackId=t.id,n.trackMenu.notes=String(t.notes||""),n.trackMenu.lyrics=String(t.lyrics||""),n.trackMenu.todos=Ge(t.todos),n.trackMenu.versions=Array.isArray(t.versions)?[...t.versions]:[],n.trackMenu.activeVersionId=t.activeVersionId||null,n.trackMenu.bpm=t.bpm??null,n.trackMenu.key=t.key||null,n.trackMenu.trackStatus=t.trackStatus||null,n.trackMenu.moodTags=Array.isArray(t.moodTags)?[...t.moodTags]:[],n.trackMenu.listenCount=t.listenCount||0,n.trackMenu.lufs=t.lufs??null,n.trackMenu.peakDb=t.peakDb??null;const a=document.getElementById("track-menu-title"),o=document.getElementById("track-menu-subtitle"),r=document.getElementById("track-menu-notes"),s=document.getElementById("track-menu-lyrics"),c=document.getElementById("track-todo-input"),i=document.getElementById("track-menu-overlay");if(!i||!a||!o||!r||!s)return;const d=[];t.trackNumber!==null&&t.trackNumber!==void 0&&t.trackNumber!==""&&d.push(`Track ${t.trackNumber}`),t.originalName&&d.push(t.originalName),t.versionCount>1&&d.push(`${t.versionCount} versions`),a.textContent=t.title||t.originalName||"Untitled track",o.textContent=d.join(" | "),r.value=n.trackMenu.notes,s.value=n.trackMenu.lyrics,c&&(c.value=""),i.classList.remove("hidden","is-closing"),i.setAttribute("aria-hidden","false"),Se(),ba(),Qe();const y=T();Y()&&y&&y.id&&pa(y.id),Y()&&t.audioUrl&&t.bpm===null&&t.key===null&&t.lufs===null&&setTimeout(()=>ia(t.id,t.audioUrl),300)}async function Ea(e){if(!n.trackMenu.trackId||!await Mt("Delete this track from the project?"))return;const t=A()?`/api/share/${encodeURIComponent(G())}/tracks/${encodeURIComponent(n.trackMenu.trackId)}`:`/api/projects/${encodeURIComponent(e)}/tracks/${encodeURIComponent(n.trackMenu.trackId)}`,a=await C(t,{method:"DELETE"});q(a.project),qe({flushAutosave:!1}),_()}function Qe(){const e=Y(),t=document.getElementById("track-bpm-input");t&&(t.value=n.trackMenu.bpm!==null?String(n.trackMenu.bpm):"",t.disabled=!e);const a=document.getElementById("track-key-select");a&&(a.value=n.trackMenu.key||"",a.disabled=!e,Tt(a));const o=document.getElementById("track-camelot-badge");if(o){const i=n.trackMenu.key?ze[n.trackMenu.key]:null,d=i?Ke[i]||"#888":null;i&&d?(o.textContent=i,o.style.cssText=`background:${d}26;color:${d};border-color:${d}55`,o.hidden=!1):(o.textContent="",o.style.cssText="",o.hidden=!0)}const r=document.getElementById("track-status-select");r&&(r.value=n.trackMenu.trackStatus||"",r.disabled=!e,Lt(r));const s=document.getElementById("track-mood-tags");s&&Ct(s,e,()=>{N()});const c=document.getElementById("track-listen-count");if(c){const i=n.trackMenu.listenCount||0;c.textContent=`Played ${i} time${i!==1?"s":""}`}Ye()}function Lt(e){if(!e)return;const t=e.value,a=t&&yt[t]||"";e.style.borderColor=a?a+"88":"",e.style.color=a||"",e.style.boxShadow=a?`0 0 0 1px ${a}44`:""}function Tt(e){e&&e.classList.toggle("is-empty",!e.value)}function wa(e){if(!e)return"";const t=ze[e];if(!t)return"";const a=Ke[t]||"#888";return`<span class="camelot-badge" style="background:${a}26;color:${a};border-color:${a}55">${m(t)}</span>`}function Ct(e,t,a){const o=n.trackMenu.moodTags||[];e.innerHTML=qt.map(r=>{const s=o.includes(r),c=ht[r]||"#555",i=s?`background:${c}33;border-color:${c};color:${c}`:"";return`<button
      class="mood-chip${s?" active":""}"
      type="button"
      data-mood="${m(r)}"
      style="${i}"
      ${t?"":"disabled"}
    >${m(r)}</button>`}).join(""),t&&e.querySelectorAll("[data-mood]").forEach(r=>{r.addEventListener("click",()=>{const s=r.dataset.mood,c=n.trackMenu.moodTags.indexOf(s);c>=0?n.trackMenu.moodTags.splice(c,1):n.trackMenu.moodTags.push(s),Ct(e,t,a),typeof a=="function"&&a()})})}function Ye(){const e=document.getElementById("track-lufs-display"),t=document.getElementById("track-lufs-analyze");if(!e)return;const a=n.trackMenu.lufs,o=n.trackMenu.peakDb;a!==null||o!==null?e.innerHTML=[a!==null?`<span class="lufs-value"><span class="lufs-label">LUFS</span> ${a} dBFS</span>`:"",o!==null?`<span class="lufs-value"><span class="lufs-label">Peak</span> ${o} dBFS</span>`:""].filter(Boolean).join(""):e.innerHTML='<span class="lufs-empty">Not analyzed</span>',t&&(t.textContent=a!==null?"Re-analyze":"Analyze")}function Ma(e,t={}){const{canEdit:a=!1}=t,o=document.getElementById("track-menu-overlay"),r=document.getElementById("track-menu-close"),s=document.getElementById("track-menu-delete"),c=document.getElementById("track-menu-play"),i=document.getElementById("track-todo-add"),d=document.getElementById("track-todo-input"),y=document.getElementById("track-menu-notes"),v=document.getElementById("track-menu-lyrics"),k=document.getElementById("track-version-add"),u=document.getElementById("track-version-input");x.querySelectorAll("[data-track-menu]").forEach(h=>{h.addEventListener("click",()=>{He(h.dataset.trackMenu)})}),o&&o.addEventListener("click",h=>{h.target===o&&qe()}),r&&r.addEventListener("click",()=>{qe()}),s&&s.addEventListener("click",async()=>{if(a)try{await Ea(e)}catch(h){M(h.message||"Could not delete track")}}),c&&c.addEventListener("click",()=>{if(!n.trackMenu.trackId)return;if(!Ce()){M("This share link cannot play audio");return}const h=T(),l=h&&h.tracks||[],p=l.findIndex(f=>f.id===n.trackMenu.trackId);p<0||K(l[p],l,p)}),i&&i.addEventListener("click",()=>{a&&dt()}),d&&d.addEventListener("keydown",h=>{a&&h.key==="Enter"&&(h.preventDefault(),dt())}),y&&a&&y.addEventListener("input",()=>{n.trackMenu.notes=String(y.value||"").slice(0,4e3),N()}),v&&a&&v.addEventListener("input",()=>{n.trackMenu.lyrics=String(v.value||"").slice(0,12e3),N()}),k&&u&&(k.addEventListener("click",()=>{!a||!n.trackMenu.trackId||u.click()}),u.addEventListener("change",async()=>{if(!a||!n.trackMenu.trackId)return;const h=u.files&&u.files[0];if(h)try{await ha(e,n.trackMenu.trackId,h);const l=Ie(n.trackMenu.trackId);l&&(n.trackMenu.versions=Array.isArray(l.versions)?[...l.versions]:[],n.trackMenu.activeVersionId=l.activeVersionId||null),u.value="",_(),He(n.trackMenu.trackId),M("Track version uploaded")}catch(l){M(l.message||"Could not upload version")}}));const b=document.getElementById("track-lufs-analyze");b&&b.addEventListener("click",async()=>{const h=Ie(n.trackMenu.trackId);if(!h||!h.audioUrl){M("No audio file available to analyze");return}const l=n.trackMenu.trackId;b.disabled=!0,b.textContent="Analyzing…";try{const p=await It(h.audioUrl);if(n.trackMenu.trackId!==l)return;n.trackMenu.lufs=p.lufs,n.trackMenu.peakDb=p.peakDb,n.trackMenu.bpm=p.bpm??n.trackMenu.bpm,n.trackMenu.key=p.key??n.trackMenu.key,Qe(),N(),M("Audio analysis complete")}catch(p){M(p.message||"Analysis failed")}finally{if(n.trackMenu.trackId!==l)return;const p=document.getElementById("track-lufs-analyze");p&&(p.disabled=!1),Ye()}});const E=document.getElementById("track-bpm-input");E&&a&&E.addEventListener("input",()=>{n.trackMenu.bpm=E.value===""?null:Number(E.value),N()});const $=document.getElementById("track-status-select");$&&a&&$.addEventListener("change",()=>{n.trackMenu.trackStatus=$.value||null,Lt($),N()});const L=document.getElementById("track-key-select");L&&a&&L.addEventListener("change",()=>{n.trackMenu.key=L.value||null,Tt(L);const h=document.getElementById("track-camelot-badge");if(!h)return;const l=L.value?ze[L.value]:null,p=l?Ke[l]||"#888":null;l&&p?(h.textContent=l,h.style.cssText=`background:${p}26;color:${p};border-color:${p}55`,h.hidden=!1):(h.textContent="",h.style.cssText="",h.hidden=!0),N()})}function Ee(e,t,a={}){if(!e)return;const{singleLine:o=!1}=a;e.addEventListener("focus",()=>{e.dataset.beforeEdit=nt(e.innerText)}),o&&e.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),e.blur())}),e.addEventListener("blur",async()=>{const r=e.dataset.beforeEdit||"",s=nt(e.innerText);if(r!==s)try{await t(s),_()}catch(c){M(c.message||"Failed to save changes"),e.innerText=r}})}function $a(e){return e.coverUrl?`<img src="${m(e.coverUrl)}" alt="Cover image" loading="lazy" />`:""}function Ia(e){const t=Math.max(0,Math.min(5,Math.round(e)));return Array.from({length:5},(a,o)=>`<span class="card-star${o<t?" filled":""}" aria-hidden="true">★</span>`).join("")}function Oe(e){if(!e)return"";const t=new Date;t.setHours(0,0,0,0);const o=new Date(e+"T00:00:00")-t,r=Math.ceil(o/(1e3*60*60*24));if(r<0)return`<span class="countdown-overdue">${Math.abs(r)} days overdue</span>`;if(r===0)return'<span class="countdown-red">Release day!</span>';let s;return r>30?s="countdown-green":r>7?s="countdown-yellow":s="countdown-red",`<span class="${s}">${r} day${r!==1?"s":""} remaining</span>`}function Sa(e){return!Array.isArray(e)||!e.length?"":e.map(t=>`<span class="project-palette-swatch" style="background:${m(t)}" title="${m(t)}"></span>`).join("")}const La=["January","February","March","April","May","June","July","August","September","October","November","December"],Ta=["Su","Mo","Tu","We","Th","Fr","Sa"],P=class P{static open(t,a,o,r={}){P.close();const s=new P(t,a,o,r);P._instance=s,s._mount()}static close(){P._instance&&(P._instance._destroy(),P._instance=null)}constructor(t,a,o,r){this._anchor=t,this._onChange=o,this._label=r.label||"";const s=P._parseValue(a),c=s||new Date;this._year=c.getFullYear(),this._month=c.getMonth(),this._day=s?c.getDate():null,this._el=null,this._boundKeydown=this._onKeydown.bind(this),this._boundOutsideClick=this._onOutsideClick.bind(this)}_mount(){const t=document.createElement("div");t.className="dp-popover",document.body.appendChild(t),this._el=t,this._render(),this._position(),this._anchor.classList.add("dp-open"),document.addEventListener("keydown",this._boundKeydown),setTimeout(()=>document.addEventListener("pointerdown",this._boundOutsideClick),0)}_render(){const t=this._el,a=this._year,o=this._month,r=new Date(a,o,1).getDay(),s=new Date(a,o+1,0).getDate();let c="";for(let i=0;i<r;i++)c+='<span class="dp-cell dp-blank"></span>';for(let i=1;i<=s;i++){const d=this._day===i,y=new Date,v=y.getFullYear()===a&&y.getMonth()===o&&y.getDate()===i;c+=`<button class="dp-cell dp-day${d?" dp-selected":""}${v?" dp-today":""}" type="button" data-day="${i}">${i}</button>`}t.innerHTML=`
      <div class="dp-header">
        <button class="dp-nav-btn" type="button" data-dp-prev aria-label="Previous month">‹</button>
        <span class="dp-month-label">${La[o]} ${a}</span>
        <button class="dp-nav-btn" type="button" data-dp-next aria-label="Next month">›</button>
      </div>
      <div class="dp-day-names">
        ${Ta.map(i=>`<span class="dp-day-name">${i}</span>`).join("")}
      </div>
      <div class="dp-grid">${c}</div>
      <div class="dp-footer">
        ${this._day!==null?'<button class="dp-clear-btn" type="button">Clear</button>':""}
        <button class="dp-today-btn" type="button">Today</button>
      </div>
    `,this._bindEvents()}_bindEvents(){const t=this._el;t.querySelector("[data-dp-prev]").addEventListener("click",()=>{this._month--,this._month<0&&(this._month=11,this._year--),this._render()}),t.querySelector("[data-dp-next]").addEventListener("click",()=>{this._month++,this._month>11&&(this._month=0,this._year++),this._render()}),t.querySelectorAll(".dp-day").forEach(o=>{o.addEventListener("click",()=>{this._day=Number(o.dataset.day),this._commitAndClose()})});const a=t.querySelector(".dp-clear-btn");a&&a.addEventListener("click",()=>{this._day=null,this._onChange&&this._onChange(""),P.close()}),t.querySelector(".dp-today-btn").addEventListener("click",()=>{const o=new Date;this._year=o.getFullYear(),this._month=o.getMonth(),this._day=o.getDate(),this._commitAndClose()})}_commitAndClose(){if(this._day!==null&&this._onChange){const t=String(this._month+1).padStart(2,"0"),a=String(this._day).padStart(2,"0");this._onChange(`${this._year}-${t}-${a}`)}P.close()}_position(){const t=this._el,a=this._anchor.getBoundingClientRect(),o=window.innerWidth,r=window.innerHeight,s=t.offsetWidth||240,c=t.offsetHeight||300;let i=a.bottom+8,d=a.left;i+c>r-12&&(i=a.top-c-8),d+s>o-12&&(d=o-s-12),d<8&&(d=8),t.style.top=i+"px",t.style.left=d+"px"}_onKeydown(t){t.key==="Escape"&&P.close()}_onOutsideClick(t){this._el&&!this._el.contains(t.target)&&t.target!==this._anchor&&P.close()}_destroy(){document.removeEventListener("keydown",this._boundKeydown),document.removeEventListener("pointerdown",this._boundOutsideClick),this._anchor&&this._anchor.classList.remove("dp-open"),this._el&&this._el.parentNode&&this._el.parentNode.removeChild(this._el),this._el=null}static _parseValue(t){if(!t)return null;const a=new Date(t+"T00:00:00");return isNaN(a.getTime())?null:a}static formatDisplay(t){const a=P._parseValue(t);return a?a.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"}):"Set date…"}};Be(P,"_instance",null);let te=P;const B=class B{static open(t,a,o){B.close();const r=new B(t,a,o);B._instance=r,r._mount()}static close(){B._instance&&(B._instance._destroy(),B._instance=null)}constructor(t,a,o){this._anchor=t,this._onApply=o;const{h:r,s,v:c}=B._hexToHsv(a||"#a89eff");this._h=r,this._s=s,this._v=c,this._el=null,this._draggingGradient=!1,this._draggingHue=!1,this._boundKeydown=this._onKeydown.bind(this),this._boundOutsideClick=this._onOutsideClick.bind(this)}_mount(){const t=document.createElement("div");t.className="cp-popover",t.innerHTML=this._buildHtml(),document.body.appendChild(t),this._el=t,this._position(),this._update(),this._bindEvents(),this._anchor.classList.add("cp-open"),document.addEventListener("keydown",this._boundKeydown),setTimeout(()=>document.addEventListener("pointerdown",this._boundOutsideClick),0)}_buildHtml(){return`
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
    `}_position(){const t=this._el,a=this._anchor.getBoundingClientRect(),o=window.innerWidth,r=window.innerHeight,s=t.offsetWidth||224,c=t.offsetHeight||300;let i=a.bottom+8,d=a.left;i+c>r-12&&(i=a.top-c-8),d+s>o-12&&(d=o-s-12),d<8&&(d=8),t.style.top=i+"px",t.style.left=d+"px"}_update(){const t=this._el;if(!t)return;const a=B._hsvToHex(this._h,this._s,this._v),o=B._hsvToHex(this._h,1,1),r=t.querySelector(".cp-gradient-box");r.style.background=o;const s=t.querySelector(".cp-gradient-cursor");s.style.left=this._s*100+"%",s.style.top=(1-this._v)*100+"%";const c=t.querySelector(".cp-hue-track .cp-slider-thumb");c.style.left=this._h/360*100+"%",t.querySelector(".cp-preview").style.background=a;const i=t.querySelector(".cp-hex-input");document.activeElement!==i&&(i.value=a.toUpperCase())}_bindEvents(){const t=this._el,a=t.querySelector(".cp-gradient-box"),o=t.querySelector(".cp-hue-track"),r=t.querySelector(".cp-hex-input");a.addEventListener("pointerdown",s=>{s.preventDefault(),this._draggingGradient=!0,a.setPointerCapture(s.pointerId),this._updateFromGradientEvent(s,a)}),a.addEventListener("pointermove",s=>{this._draggingGradient&&this._updateFromGradientEvent(s,a)}),a.addEventListener("pointerup",()=>{this._draggingGradient=!1}),o.addEventListener("pointerdown",s=>{s.preventDefault(),this._draggingHue=!0,o.setPointerCapture(s.pointerId),this._updateFromHueEvent(s,o)}),o.addEventListener("pointermove",s=>{this._draggingHue&&this._updateFromHueEvent(s,o)}),o.addEventListener("pointerup",()=>{this._draggingHue=!1}),r.addEventListener("input",()=>{const s=r.value.trim(),c=s.startsWith("#")?s:"#"+s;if(/^#[0-9a-fA-F]{6}$/.test(c)){const{h:i,s:d,v:y}=B._hexToHsv(c);this._h=i,this._s=d,this._v=y,this._update()}}),t.querySelector(".cp-btn-apply").addEventListener("click",()=>{this._apply()}),t.querySelector(".cp-btn-cancel").addEventListener("click",()=>{B.close()})}_updateFromGradientEvent(t,a){const o=a.getBoundingClientRect(),r=Math.max(0,Math.min(1,(t.clientX-o.left)/o.width)),s=Math.max(0,Math.min(1,(t.clientY-o.top)/o.height));this._s=r,this._v=1-s,this._update()}_updateFromHueEvent(t,a){const o=a.getBoundingClientRect(),r=Math.max(0,Math.min(1,(t.clientX-o.left)/o.width));this._h=r*360,this._update()}_apply(){const t=B._hsvToHex(this._h,this._s,this._v);this._onApply&&this._onApply(t),B.close()}_onKeydown(t){t.key==="Escape"&&B.close(),t.key==="Enter"&&this._apply()}_onOutsideClick(t){this._el&&!this._el.contains(t.target)&&t.target!==this._anchor&&B.close()}_destroy(){document.removeEventListener("keydown",this._boundKeydown),document.removeEventListener("pointerdown",this._boundOutsideClick),this._anchor&&this._anchor.classList.remove("cp-open"),this._el&&this._el.parentNode&&this._el.parentNode.removeChild(this._el),this._el=null}static _hexToHsv(t){const a=parseInt(t.slice(1,3),16)/255,o=parseInt(t.slice(3,5),16)/255,r=parseInt(t.slice(5,7),16)/255,s=Math.max(a,o,r),c=Math.min(a,o,r),i=s-c,d=s,y=s===0?0:i/s;let v=0;return i!==0&&(s===a?v=((o-r)/i+(o<r?6:0))/6:s===o?v=((r-a)/i+2)/6:v=((a-o)/i+4)/6),{h:v*360,s:y,v:d}}static _hsvToHex(t,a,o){const r=Math.floor(t/60%6),s=t/60-Math.floor(t/60),c=o*(1-a),i=o*(1-s*a),d=o*(1-(1-s)*a);let y,v,k;switch(r){case 0:y=o,v=d,k=c;break;case 1:y=i,v=o,k=c;break;case 2:y=c,v=o,k=d;break;case 3:y=c,v=i,k=o;break;case 4:y=d,v=c,k=o;break;default:y=o,v=c,k=i;break}const u=b=>Math.round(b*255).toString(16).padStart(2,"0");return"#"+u(y)+u(v)+u(k)}};Be(B,"_instance",null);let me=B;function xt(e,t){const a=e.map((r,s)=>`
      <div class="palette-swatch-wrap">
        <div class="palette-swatch" style="background:${m(r)}" data-palette-index="${s}" role="button" tabindex="0" aria-label="Edit color ${s+1}: ${m(r)}"></div>
        ${t?`<button class="palette-remove-btn" type="button" data-palette-remove="${s}" aria-label="Remove color">×</button>`:""}
      </div>
    `).join(""),o=t&&e.length<5?'<button id="palette-add-btn" class="palette-add-btn" type="button" aria-label="Add color">+</button>':"";return a+o}const ut=[{key:"updatedAt",label:"Last Modified",dir:"desc"},{key:"createdAt",label:"Date Created",dir:"desc"},{key:"title",label:"Title A→Z",dir:"asc"},{key:"artist",label:"Artist A→Z",dir:"asc"},{key:"status",label:"Status",dir:"asc"},{key:"completionPercent",label:"% Complete",dir:"desc"},{key:"starRating",label:"Star Rating",dir:"desc"},{key:"releaseDate",label:"Release Date",dir:"asc"},{key:"startDate",label:"Start Date",dir:"asc"}];function Ca(){const{key:e,dir:t}=n.homeSort,a=[...n.projects];return a.sort((o,r)=>{let s=o[e],c=r[e];const i=s==null||s==="",d=c==null||c==="";return i&&d?0:i?1:d?-1:typeof s=="number"&&typeof c=="number"?t==="asc"?s-c:c-s:(s=String(s).toLowerCase(),c=String(c).toLowerCase(),s<c?t==="asc"?-1:1:s>c?t==="asc"?1:-1:0)}),a}function At(){const e=Ca(),t=ut.find(i=>i.key===n.homeSort.key),a=t?t.label:"Sort",o=e.map(i=>{const d=i.trackCount===1?"1 track":`${i.trackCount||0} tracks`,y=gt(i.totalRuntimeSeconds||0),v=i.completionPercent||0,k=i.starRating||0;return`
        <article class="project-card" data-open-project="${m(i.id)}">
          <div class="card-cover">
            ${$a(i)}
            <span class="status-pill">${m(i.status||"In Progress")}</span>
          </div>
          <div class="card-body">
            <h3 class="card-title">${m(i.title||"Untitled Project")}</h3>
            <p class="card-artist">${m(i.artist||"Unknown Artist")}</p>
            <p class="card-meta">${m(`${d} • ${y}`)}</p>
            ${k>0?`<div class="card-rating">${Ia(k)}</div>`:""}
          </div>
          ${v>0?`<div class="card-progress-wrap"><div class="card-progress-bar" style="width:${v}%"></div></div>`:""}
        </article>
      `}).join(""),r=ut.map(i=>{const d=i.key===n.homeSort.key;return`<button class="sort-menu-item ui-dropdown-item${d?" sort-menu-item--active":""}" type="button" data-sort-key="${i.key}" data-sort-dir="${i.dir}">${i.label}${d?n.homeSort.dir==="asc"?" ↑":" ↓":""}</button>`}).join("");x.innerHTML=`
    <section class="view home-view">
      <header class="topbar">
        <div>
          <h1 class="brand">Studio</h1>
          <p class="brand-sub">Private workspace for works in progress</p>
        </div>
        <div class="topbar-actions">
          <button id="open-settings-button" class="circle-button" type="button" aria-label="Open settings" title="Settings">${w("settings")}</button>
          <button id="logout-button" class="text-button" type="button">${w("logout")} Log out</button>
        </div>
      </header>

      <section class="home-actions">
        <button id="create-project-button" class="primary-button" type="button">${w("plus")} New Project</button>
        <div class="sort-wrap">
          <button id="sort-button" class="sort-button ui-dropdown-trigger" type="button" aria-haspopup="true" aria-expanded="false">
            ${w("sort")} ${m(a)}
          </button>
          <div id="sort-menu" class="sort-menu ui-dropdown-menu hidden">
            ${r}
          </div>
        </div>
      </section>

      <section class="project-grid">
        ${o||'<div class="empty-state">No projects yet. Create one to start uploading tracks.</div>'}
      </section>
    </section>
  `,document.getElementById("open-settings-button").addEventListener("click",()=>{D("/settings")}),document.getElementById("logout-button").addEventListener("click",async()=>{try{await C("/api/logout",{method:"POST"}),n.authenticated=!1,n.currentProject=null,D("/")}catch(i){M(i.message||"Could not log out")}}),document.getElementById("create-project-button").addEventListener("click",async()=>{try{const i=await C("/api/projects",{method:"POST",body:{title:"Untitled Project",artist:"Unknown Artist",description:"",status:"In Progress"}});n.currentProject=i.project,We(i.project),D(`/project/${i.project.id}`)}catch(i){M(i.message||"Failed to create project")}});const s=document.getElementById("sort-button"),c=document.getElementById("sort-menu");s.addEventListener("click",i=>{i.stopPropagation();const d=!c.classList.contains("hidden");c.classList.toggle("hidden",d),s.setAttribute("aria-expanded",String(!d))}),c.querySelectorAll(".sort-menu-item").forEach(i=>{i.addEventListener("click",()=>{const d=i.dataset.sortKey,y=i.dataset.sortDir;n.homeSort.key===d?n.homeSort.dir=n.homeSort.dir==="asc"?"desc":"asc":(n.homeSort.key=d,n.homeSort.dir=y),At()})}),document.addEventListener("click",function i(d){s.contains(d.target)||(c.classList.add("hidden"),s.setAttribute("aria-expanded","false"),document.removeEventListener("click",i))}),x.querySelectorAll("[data-open-project]").forEach(i=>{i.addEventListener("click",()=>{D(`/project/${i.dataset.openProject}`)})}),se()}function xa(e,t){const a=Y(),o=a&&!A(),r=Ce(),s=Te(n.settings.trackTagVisibility),c=bt(e.createdAt)||"No date",i=Ge(e.todos),d=i.filter(h=>!h.done).length,y=Wt(e),v=[];s.contextBadges&&e.versionCount>1&&v.push(`<span class="track-badge">v${e.versionCount}</span>`),s.contextBadges&&y&&y.originalName&&v.push(`<span class="track-badge track-badge-filename marquee-wrap"><span class="marquee-inner">${m(y.originalName)}</span></span>`),s.contextBadges&&e.notes&&v.push('<span class="track-badge">Notes</span>'),s.contextBadges&&e.lyrics&&v.push('<span class="track-badge">Lyrics</span>'),s.contextBadges&&i.length&&v.push(`<span class="track-badge">Todos ${d}/${i.length}</span>`);const k=e.trackStatus?yt[e.trackStatus]||"#8690a4":"",u=s.status&&e.trackStatus?`<span class="track-status-pill" style="--status-pill-color:${k}">${m(e.trackStatus)}</span>`:"",b=s.moodTags&&Array.isArray(e.moodTags)&&e.moodTags.length?e.moodTags.map(h=>{const l=ht[h]||"#555";return`<span class="track-mood-chip" style="background:${l}22;color:${l};border-color:${l}55">${m(h)}</span>`}).join(""):"",E=[];s.date&&E.push(`<span class="track-date">${m(c)}</span>`),s.bpm&&e.bpm&&E.push(`<span class="track-inline-meta">${m(String(e.bpm))} BPM</span>`),s.key&&e.key&&E.push(`${wa(e.key)}<span class="track-inline-meta">${m(e.key)}</span>`),s.playCount&&e.listenCount&&E.push(`<span class="track-inline-meta">${m(String(e.listenCount))} plays</span>`);const $=E.map((h,l)=>l===0?h:`<span class="stats-dot track-meta-dot">&middot;</span>${h}`).join(""),L=v.length||u;return`
    <article class="track-row${r?" track-row--clickable":""}" data-track-id="${m(e.id)}" draggable="${o?"true":"false"}">
      <div class="track-index drag-handle" title="Drag to reorder">${t+1}</div>
      <div class="track-main">
        <div class="track-line">
          <div
            class="editable track-title-editable"
            contenteditable="${a?"true":"false"}"
            spellcheck="false"
            data-track-id="${m(e.id)}"
            data-track-field="title"
            data-placeholder="Untitled track"
          >${m(e.title||"")}</div>
        </div>

        <div class="track-meta-line">
          ${$}
        </div>

        ${b?`<div class="track-mood-chips-row">${b}</div>`:""}

        ${L?`<div class="track-bottom-row">
          <div class="track-badges">${v.join("")}</div>
          ${u}
        </div>`:""}
      </div>
      <button class="icon-button track-play-button" type="button" data-play-track="${m(e.id)}" title="Play track" ${r?"":"disabled"}>${w("play")}</button>
      <button class="icon-button track-menu-button" type="button" data-track-menu="${m(e.id)}" title="Track options">${w("more")}</button>
    </article>
  `}function Aa(e){return Rt.map(t=>{const a=t===e?"selected":"";return`<option value="${m(t)}" ${a}>${m(t)}</option>`}).join("")}function _(){ie({flush:!1}),fe({flush:!1});const e=T();if(!e){ee("Project not found",!0);return}n.metadataPanel.colorPalette=Array.isArray(e.colorPalette)?[...e.colorPalette]:[];const t=Y(),a=Ce(),o=!A(),r=e.tracks||[],s=r.map((u,b)=>xa(u,b)).join(""),c=r.length===1?"1 track":`${r.length} tracks`,i=gt(e.totalRuntimeSeconds||0),d=Array.isArray(e.shareLinks)?e.shareLinks:[],v=(Array.isArray(e.coverVersions)?e.coverVersions:[]).map(u=>`
        <div class="cover-thumb-wrap">
          <button
            class="cover-switcher-thumb ${u.id===e.activeCoverId?"active":""}"
            type="button"
            data-cover-version="${m(u.id)}"
            title="Switch cover"
          >
            <img src="${m(u.coverUrl)}" alt="Cover version" loading="lazy" />
          </button>
          ${t?`<button class="cover-thumb-delete" type="button" data-delete-cover="${m(u.id)}" title="Delete cover" aria-label="Delete cover">${w("close")}</button>`:""}
        </div>
      `).join(""),k=d.map(u=>{const b=`${window.location.origin}${u.shareUrl}`;return`
        <div class="share-link-item">
          <span class="share-link-type">${m(kt(u.access))}</span>
          <input class="share-link-input" type="text" readonly value="${m(b)}" />
          <button class="secondary-button" type="button" data-copy-share="${m(u.shareUrl)}">Copy</button>
          <button class="secondary-button" type="button" data-delete-share="${m(u.id)}">Delete</button>
        </div>
      `}).join("");x.innerHTML=`
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
            ${e.coverUrl?`<img src="${m(e.coverUrl)}?v=${m(e.activeCoverId||"")}" alt="Project cover" />`:"Click to upload cover"}
          </button>
          <div class="cover-switcher-wrap">
            <p class="cover-switcher-label">Cover Versions</p>
            <div id="cover-switcher" class="cover-switcher">
              ${v||'<p class="todo-empty">No cover versions yet.</p>'}
            </div>
          </div>
        </div>

        <div class="project-column">
          <div class="project-head">
            <div class="project-headings">
              <h1 id="project-title" class="editable heading-editable" contenteditable="${t?"true":"false"}" spellcheck="false" data-placeholder="Project title">${m(e.title||"")}</h1>

              <div class="project-stats-row">
                <p id="project-artist" class="editable subheading-editable" contenteditable="${t?"true":"false"}" spellcheck="false" data-placeholder="Artist">${m(e.artist||"")}</p>
                  <span class="stats-dot">&middot;</span>
                <span class="project-track-count">${m(c)}</span>
                  <span class="stats-dot">&middot;</span>
                <span class="project-runtime">${m(i)}</span>
              </div>

              ${e.colorPalette&&e.colorPalette.length||e.releaseDate?`<div class="project-meta-chips">
                      ${e.colorPalette&&e.colorPalette.length?`<div class="project-palette-row">${Sa(e.colorPalette)}</div>`:""}
                      ${e.releaseDate?`<div class="project-deadline-chip">${Oe(e.releaseDate)}</div>`:""}
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
              <select id="project-status" class="project-status-select ui-select" title="Status" aria-label="Status" ${t?"":"disabled"}>${Aa(e.status)}</select>
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
            <button id="track-menu-close" class="circle-button track-menu-close" type="button" aria-label="Close track details">${w("close")}</button>
          </header>

          <div class="track-menu-actions">
            <button id="track-menu-play" class="secondary-button track-menu-play" type="button" ${a?"":"disabled"}>${w("play")} Play</button>
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
                  ${Ht.map(u=>`<option value="${m(u)}">${m(u)}</option>`).join("")}
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
                ${Nt.map(u=>`<option value="${m(u)}">${m(u)}</option>`).join("")}
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
              <div id="project-description" class="editable description-editable" contenteditable="${t?"true":"false"}" spellcheck="true" data-placeholder="Project notes">${m(e.description||"")}</div>
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
                <select id="share-access-select" class="project-status-select ui-select">${zt("listen")}</select>
                <button id="share-create-button" class="secondary-button" type="button">Create Share Link</button>
              </div>
              <div id="share-links-list" class="share-links-list">
                ${k||'<p class="todo-empty">No share links yet.</p>'}
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
                <button id="meta-start-date-btn" class="dp-trigger-btn${t?"":" dp-trigger-btn--readonly"}" type="button" data-value="${m(e.startDate||"")}" ${t?"":"disabled"}>
                  ${te.formatDisplay(e.startDate)}
                </button>
              </div>
              <div class="meta-date-field">
                <label class="meta-section-label">Release Date</label>
                <button id="meta-release-date-btn" class="dp-trigger-btn${t?"":" dp-trigger-btn--readonly"}" type="button" data-value="${m(e.releaseDate||"")}" ${t?"":"disabled"}>
                  ${te.formatDisplay(e.releaseDate)}
                </button>
                <div id="meta-deadline-countdown" class="deadline-countdown${e.releaseDate?"":" hidden"}">${e.releaseDate?Oe(e.releaseDate):""}</div>
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
                ${[1,2,3,4,5].map(u=>`<button class="star-btn${u<=(e.starRating||0)?" active":""}" type="button" data-star="${u}" aria-label="${u} star${u>1?"s":""}" ${t?"":"disabled"}>★</button>`).join("")}
              </div>
            </div>

            <div class="meta-section">
              <label class="meta-section-label">Color Palette</label>
              <div id="meta-color-palette" class="color-palette-row">
                ${xt(n.metadataPanel.colorPalette,t)}
              </div>
            </div>

            <div class="meta-section">
              <label class="meta-section-label">Streaming Platforms</label>
              <div class="streaming-checklist">
                ${[{key:"spotify",label:"Spotify"},{key:"appleMusic",label:"Apple Music"},{key:"bandcamp",label:"Bandcamp"},{key:"tidal",label:"Tidal"},{key:"youtubeMusic",label:"YouTube Music"},{key:"soundCloud",label:"SoundCloud"}].map(({key:u,label:b})=>`
                  <label class="stream-check-row">
                    <input type="checkbox" class="stream-checkbox" data-platform="${m(u)}" ${(e.streamingChecklist||{})[u]?"checked":""} ${t?"":"disabled"} />
                    <span>${m(b)}</span>
                  </label>
                `).join("")}
              </div>
            </div>

            <div class="meta-section">
              <label class="meta-section-label" for="meta-presave-link">Pre-Save Link</label>
              <input type="url" id="meta-presave-link" class="metadata-url-input" placeholder="https://..." value="${m(e.preSaveLink||"")}" ${t?"":"disabled"} />
              ${e.preSaveLink?`<a href="${m(e.preSaveLink)}" target="_blank" rel="noopener noreferrer" class="presave-link-preview">Open link ↗</a>`:""}
            </div>

            <div class="meta-section">
              <label class="meta-section-label" for="meta-distributor-notes">Distributor Notes</label>
              <textarea id="meta-distributor-notes" class="metadata-textarea" placeholder="DistroKid / TuneCore details, ISRC codes, release admin notes…" ${t?"":"disabled"}>${m(e.distributorNotes||"")}</textarea>
            </div>

          </div>
        </div>
      </div>
    </section>
  `,ja(),se(),requestAnimationFrame(()=>{requestAnimationFrame(()=>{x.querySelectorAll(".track-badge.marquee-wrap").forEach(Et)})})}function Ba(e,t){fe({flush:!1});const a=document.getElementById("metadata-panel"),o=document.getElementById("metadata-panel-close"),r=document.getElementById("open-metadata-button"),s=document.getElementById("meta-completion-range"),c=document.getElementById("meta-completion-num"),i=document.getElementById("meta-completion-display"),d=document.getElementById("meta-star-rating"),y=document.getElementById("meta-color-palette");if(!a)return;function v(){me.close(),te.close(),fe({flush:!0,fireAndForget:!0}),Z(a)}if(r&&r.addEventListener("click",()=>{a.classList.remove("hidden")}),o&&o.addEventListener("click",v),a.addEventListener("click",h=>{h.target===a&&v()}),!t)return;ya();function k(h,l){const p=document.getElementById(h);p&&p.addEventListener("click",()=>{te.open(p,p.dataset.value||"",f=>{p.dataset.value=f,p.textContent=te.formatDisplay(f),l(f)})})}function u(h){const l=document.getElementById("meta-deadline-countdown");if(l){if(!h){l.classList.add("hidden"),l.innerHTML="";return}l.classList.remove("hidden"),l.innerHTML=Oe(h)}}k("meta-start-date-btn",()=>{H()}),k("meta-release-date-btn",h=>{u(h),H()}),s&&c&&i&&(s.addEventListener("input",()=>{c.value=s.value,i.textContent=s.value+"%",H()}),c.addEventListener("input",()=>{const h=Math.max(0,Math.min(100,Math.round(Number(c.value)||0)));s.value=h,i.textContent=h+"%",H()})),d&&d.querySelectorAll(".star-btn").forEach(h=>{h.addEventListener("click",()=>{const l=Number(h.dataset.star),p=Number(d.dataset.rating)||0,f=l===p?0:l;d.dataset.rating=f,d.querySelectorAll(".star-btn").forEach((I,S)=>I.classList.toggle("active",S+1<=f)),H()})});function b(){y&&(y.innerHTML=xt(n.metadataPanel.colorPalette,t),E())}function E(){if(!y)return;y.querySelectorAll(".palette-swatch[data-palette-index]").forEach(l=>{const p=()=>{if(!t)return;const f=Number(l.dataset.paletteIndex),I=n.metadataPanel.colorPalette[f]||"#a89eff";me.open(l,I,S=>{n.metadataPanel.colorPalette[f]=S,l.style.background=S,l.setAttribute("aria-label",`Edit color ${f+1}: ${S}`),H()})};l.addEventListener("click",p),l.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),p())})}),y.querySelectorAll("[data-palette-remove]").forEach(l=>{l.addEventListener("click",()=>{const p=Number(l.dataset.paletteRemove);Number.isFinite(p)&&(me.close(),n.metadataPanel.colorPalette.splice(p,1),b(),H())})});const h=document.getElementById("palette-add-btn");h&&h.addEventListener("click",()=>{n.metadataPanel.colorPalette.length<5&&(n.metadataPanel.colorPalette.push("#a89eff"),b(),H())})}E(),x.querySelectorAll(".stream-checkbox").forEach(h=>{h.addEventListener("change",()=>{H()})});const $=document.getElementById("meta-presave-link");$&&$.addEventListener("input",()=>{H()});const L=document.getElementById("meta-distributor-notes");L&&L.addEventListener("input",()=>{H()})}function ja(){const e=T();if(!e)return;const t=Y(),a=Ce(),o=!A();document.getElementById("back-home-button").addEventListener("click",()=>{D("/")});const r=document.getElementById("notes-panel"),s=document.getElementById("notes-panel-close"),c=document.getElementById("open-notes-button");c&&r&&c.addEventListener("click",()=>{r.classList.remove("hidden")}),s&&r&&s.addEventListener("click",()=>{Z(r)}),r&&r.addEventListener("click",l=>{l.target===r&&Z(r)});const i=document.getElementById("share-panel"),d=document.getElementById("share-panel-close"),y=document.getElementById("open-share-button");y&&i&&y.addEventListener("click",()=>{i.classList.remove("hidden")}),d&&i&&d.addEventListener("click",()=>{Z(i)}),i&&i.addEventListener("click",l=>{l.target===i&&Z(i)});const v=document.getElementById("logout-button"),k=document.getElementById("open-settings-button");k&&k.addEventListener("click",()=>{D("/settings")}),v&&v.addEventListener("click",async()=>{try{await C("/api/logout",{method:"POST"}),n.authenticated=!1,n.currentProject=null,D("/")}catch(l){M(l.message||"Could not log out")}});const u=document.getElementById("delete-project-button");u&&u.addEventListener("click",async()=>{const l=e.title||"this project";if(await Mt(`Delete "${l}" and all its tracks/covers?`))try{await C(`/api/projects/${encodeURIComponent(e.id)}`,{method:"DELETE"}),Xt(e.id),n.currentProject=null,n.player.wavesurfer&&n.player.wavesurfer.stop(),n.player.queue=[],n.player.index=-1,n.player.track=null,n.player.autoplayOnReady=!1,X.classList.add("hidden"),document.title="Studio",ye(pt,"No track loaded"),ye(mt,""),Ve.textContent="0:00",Fe.textContent="0:00",D("/"),M("Project deleted")}catch(p){M(p.message||"Could not delete project")}}),t&&(Ee(document.getElementById("project-title"),async l=>{await ue({title:l||"Untitled Project"})},{singleLine:!0}),Ee(document.getElementById("project-artist"),async l=>{await ue({artist:l||"Unknown Artist"})},{singleLine:!0}),Ee(document.getElementById("project-description"),async l=>{await ue({description:l})}));const b=document.getElementById("project-status");b&&t&&b.addEventListener("change",async()=>{try{await ue({status:b.value}),_()}catch(l){M(l.message||"Failed to save status")}});const E=document.getElementById("cover-input");document.getElementById("cover-button").addEventListener("click",()=>{t&&E.click()}),E.addEventListener("change",async()=>{if(t&&!(!E.files||!E.files[0]))try{await ga(e.id,E.files[0]),_(),M("Cover version uploaded")}catch(l){M(l.message||"Cover upload failed")}}),x.querySelectorAll("[data-cover-version]").forEach(l=>{l.addEventListener("click",async()=>{if(!t)return;const p=l.dataset.coverVersion;if(p)try{await ka(e.id,p),_()}catch(f){M(f.message||"Could not switch cover")}})}),t&&x.querySelectorAll("[data-delete-cover]").forEach(l=>{l.addEventListener("click",async p=>{p.stopPropagation();const f=l.dataset.deleteCover;if(f)try{await va(e.id,f),_(),M("Cover deleted")}catch(I){M(I.message||"Could not delete cover")}})});const $=document.getElementById("track-input");document.getElementById("upload-tracks-button").addEventListener("click",()=>{t&&$.click()});const L=document.getElementById("play-all-button");L&&L.addEventListener("click",()=>{if(!a){M("This share link cannot play audio");return}const l=T(),p=l&&l.tracks||[];if(!p.length){M("No tracks available");return}const f=n.player.track?n.player.track.id:null;if(!!(f&&p.some(S=>S.id===f))&&n.player.wavesurfer){n.player.wavesurfer.playPause();return}K(p[0],p,0)});const h=document.getElementById("shuffle-tracks-button");if(h&&h.addEventListener("click",()=>{if(!a){M("This share link cannot play audio");return}const l=T(),p=l&&l.tracks||[];if(!p.length){M("No tracks available");return}const f=Qt(p);K(f[0],f,0),M("Shuffle queue ready")}),$.addEventListener("change",async()=>{if(!t||A())return;const l=Array.from($.files||[]);if(!l.length)return;const p=new FormData;l.forEach(f=>{p.append("tracks",f)});try{const f=await C(`/api/projects/${encodeURIComponent(e.id)}/tracks`,{method:"POST",body:p});q(f.project),_(),M("Tracks uploaded")}catch(f){M(f.message||"Track upload failed")}}),o){const l=document.getElementById("share-create-button"),p=document.getElementById("share-access-select");l&&p&&l.addEventListener("click",async()=>{try{const f=await C(`/api/projects/${encodeURIComponent(e.id)}/share`,{method:"POST",body:{access:p.value}});q(f.project),_(),f.shareLink&&f.shareLink.shareUrl&&await rt(`${window.location.origin}${f.shareLink.shareUrl}`)}catch(f){M(f.message||"Could not create share link")}}),x.querySelectorAll("[data-copy-share]").forEach(f=>{f.addEventListener("click",async()=>{const I=f.dataset.copyShare;I&&await rt(`${window.location.origin}${I}`)})}),x.querySelectorAll("[data-delete-share]").forEach(f=>{f.addEventListener("click",async()=>{const I=f.dataset.deleteShare;if(I)try{const S=await C(`/api/projects/${encodeURIComponent(e.id)}/share/${encodeURIComponent(I)}`,{method:"DELETE"});q(S.project),_(),M("Share link deleted")}catch(S){M(S.message||"Could not delete share link")}})})}x.querySelectorAll("[data-play-track]").forEach(l=>{l.addEventListener("click",()=>{if(!a){M("This share link cannot play audio");return}const p=l.dataset.playTrack,f=T(),I=f&&f.tracks||[],S=I.findIndex(O=>O.id===p);S<0||K(I[S],I,S)})}),x.querySelectorAll(".track-row[data-track-id]").forEach(l=>{l.addEventListener("click",p=>{var ce;if(!a||p.target.closest("button,a,input,select,textarea,label,[contenteditable='true'],.drag-handle")||((ce=window.getSelection)==null?void 0:ce.call(window).toString().trim()))return;const I=l.dataset.trackId;if(!I)return;const S=T(),O=S&&S.tracks||[],J=O.findIndex(ve=>ve.id===I);J<0||K(O[J],O,J)})}),t&&x.querySelectorAll("[data-track-field]").forEach(l=>{const p=l.dataset.trackField,f=l.dataset.trackId;Ee(l,async I=>{await St(e.id,f,{[p]:I})},{singleLine:!0})}),Ma(e.id,{canEdit:t}),Ba(e.id,t),!A()&&t&&Pa(e.id)}function Pa(e){const t=Array.from(x.querySelectorAll(".track-row[data-track-id]"));if(!t.length)return;let a=null;t.forEach(o=>{o.addEventListener("dragstart",r=>{a=o.dataset.trackId,o.classList.add("dragging"),r.dataTransfer.effectAllowed="move"}),o.addEventListener("dragend",()=>{a=null,o.classList.remove("dragging"),t.forEach(r=>r.classList.remove("drag-target"))}),o.addEventListener("dragover",r=>{r.preventDefault(),a&&a!==o.dataset.trackId&&o.classList.add("drag-target")}),o.addEventListener("dragleave",()=>{o.classList.remove("drag-target")}),o.addEventListener("drop",async r=>{if(r.preventDefault(),o.classList.remove("drag-target"),!a)return;const s=o.dataset.trackId;if(a===s)return;const c=T(),i=[...c&&c.tracks||[]],d=i.findIndex(u=>u.id===a),y=i.findIndex(u=>u.id===s);if(d<0||y<0)return;const[v]=i.splice(d,1);i.splice(y,0,v);const k=i.map(u=>u.id);try{const u=await C(`/api/projects/${encodeURIComponent(e)}/tracks/reorder`,{method:"PATCH",body:{trackIds:k}});q(u.project),_()}catch(u){M(u.message||"Failed to reorder tracks")}})})}function Bt(){const e=Te(n.settings.trackTagVisibility);n.settings.trackTagVisibility={...e};const t=Ot.map(s=>{const c=e[s.key]?"checked":"";return`
      <label class="settings-toggle-row" for="setting-${m(s.key)}">
        <span class="settings-toggle-copy">
          <span class="settings-toggle-label">${m(s.label)}</span>
          <span class="settings-toggle-desc">${m(s.description)}</span>
        </span>
        <input id="setting-${m(s.key)}" class="settings-toggle-input" type="checkbox" data-track-tag-setting="${m(s.key)}" ${c} />
      </label>
    `}).join("");x.innerHTML=`
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
  `;const a=document.getElementById("settings-back-button");a&&a.addEventListener("click",()=>{const s=n.settings.previousPath||"/";D(s==="/settings"?"/":s)});const o=document.getElementById("settings-logout-button");o&&o.addEventListener("click",async()=>{try{await C("/api/logout",{method:"POST"}),n.authenticated=!1,n.currentProject=null,n.sharedProject=null,D("/")}catch(s){M(s.message||"Could not log out")}}),x.querySelectorAll("[data-track-tag-setting]").forEach(s=>{s.addEventListener("change",()=>{const c=s.dataset.trackTagSetting;Object.prototype.hasOwnProperty.call(ae,c)&&(n.settings.trackTagVisibility[c]=!!s.checked,ot())})});const r=document.getElementById("settings-reset-tags");r&&r.addEventListener("click",()=>{n.settings.trackTagVisibility={...ae},ot(),Bt(),M("Tag visibility reset")})}function _a(){const e=n.sharedProject;if(!e){ee("Shared project not found",!0);return}const t=!!e.canListen;!t&&X&&X.classList.add("hidden");const o=(e.tracks||[]).map((r,s)=>{const c=r.trackNumber===null||r.trackNumber===void 0?"-":m(r.trackNumber),i=Ge(r.todos),d=i.filter(v=>!v.done).length,y=i.length?`${d} open / ${i.length} total`:"-";return`
        <article class="track-row readonly shared-track-row" data-track-id="${m(r.id)}">
          <div class="track-index">${s+1}</div>
          <button class="icon-button track-play-button" type="button" data-share-play-track="${m(r.id)}" aria-label="Play track" ${t?"":"disabled"}>${w("play")}</button>
          <div class="track-main">
            <div class="track-line">
              <div class="readonly-text shared-track-title">${m(r.title||"Untitled track")}</div>
            </div>

            <div class="track-meta-line">
              <span class="track-number-chip"># ${c}</span>
              <span class="track-date">${m(bt(r.createdAt)||"No date")}</span>
              <span class="track-file-name">${m(r.originalName||"")}</span>
            </div>

            <div class="track-aux-grid readonly-aux-grid">
              <div class="track-aux-field">
                <span class="track-aux-label">Notes</span>
                <div class="track-aux-static">${m(r.notes||"-")}</div>
              </div>
              <div class="track-aux-field">
                <span class="track-aux-label">Lyrics</span>
                <div class="track-aux-static">${m(r.lyrics||"-")}</div>
              </div>
              <div class="track-aux-field">
                <span class="track-aux-label">Todos</span>
                <div class="track-aux-static">${m(y)}</div>
              </div>
            </div>
          </div>
          <div class="track-menu-placeholder"></div>
        </article>
      `}).join("");x.innerHTML=`
    <section class="view share-view">
      <header class="topbar">
        <div>
          <h1 class="brand">${m(e.title||"Shared Project")}</h1>
          <p class="brand-sub">by ${m(e.artist||"Unknown Artist")} • ${m(kt(e.shareAccess))}</p>
        </div>
        <button id="open-studio-button" class="text-button" type="button">Open Studio</button>
      </header>

      <section class="project-hero readonly">
        <div class="cover-editor">
          ${e.coverUrl?`<img src="${m(e.coverUrl)}" alt="Project cover" />`:"No cover"}
        </div>

        <div class="project-meta">
          <p class="readonly-text">Status: ${m(e.status||"In Progress")}</p>
          <div class="description-editable">${m(e.description||"")}</div>
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
  `,document.getElementById("open-studio-button").addEventListener("click",()=>{D("/")}),t&&x.querySelectorAll("[data-share-play-track]").forEach(r=>{r.addEventListener("click",()=>{const s=r.dataset.sharePlayTrack,c=n.sharedProject.tracks||[],i=c.findIndex(d=>d.id===s);i<0||K(c[i],c,i)})}),se()}function Pe(){x.innerHTML=`
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
  `;const e=document.getElementById("login-form"),t=document.getElementById("password-input");e.addEventListener("submit",async a=>{a.preventDefault();try{await C("/api/login",{method:"POST",body:{password:t.value},allowUnauthorized:!0}),n.authenticated=!0,t.value="",Le()}catch(o){M(o.message||"Login failed")}})}async function Da(e){if(!e){ee("Invalid share token",!0);return}try{const t=await C(`/api/share/${encodeURIComponent(e)}`,{allowUnauthorized:!0});if(n.sharedProject=t.project,n.currentProject=t.project,t.project&&t.project.canEdit){_();return}_a()}catch(t){ee(t.message||"Share link not found",!0)}}async function Le(){ie({flush:!0,fireAndForget:!0}),fe({flush:!0,fireAndForget:!0});const e=Yt();if(n.route=e,e.type==="share"){await Da(e.token);return}try{const t=await C("/api/session",{allowUnauthorized:!0});n.authenticated=!!t.authenticated}catch{ee("Could not connect to the Studio server");return}if(!n.authenticated){Pe();return}if(e.type==="settings"){Bt();return}if(e.type==="project"){try{await la(e.projectId),_()}catch(t){if(t.code==="AUTH_REQUIRED"){Pe();return}ee(t.message||"Project not found",!0)}return}try{await ca(),At()}catch(t){if(t.code==="AUTH_REQUIRED"){Pe();return}ee(t.message||"Could not load projects")}}function Ua(){Kt(),na(),window.addEventListener("popstate",()=>{Le()}),Le()}Ua();
