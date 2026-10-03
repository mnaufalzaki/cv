export const INTRO_WELCOME_DURATION_MS = 1800;
export const INTRO_DURATION_MS = INTRO_WELCOME_DURATION_MS + 4800;
export const PAGE_REVEAL_START_MS = INTRO_DURATION_MS - 500;
export const BACKGROUND_REVEAL_DELAY_MS = 1000;
export const BACKGROUND_REVEAL_DURATION_MS = 3000;
export const INTRO_RUNNING_TIMEOUT_MS = 12000;
export const INTRO_FONT_WAIT_MS = 250;
export const INTRO_SESSION_KEY = "portfolio-intro-seen-v2-gsap";

// Runs in the document head before paint. Any unavailable browser capability
// leaves the server-rendered website visible, including blocked session storage.
export const introBootstrap = `(()=>{try{if(location.pathname==="/"&&!location.hash&&!matchMedia("(prefers-reduced-motion: reduce)").matches&&!sessionStorage.getItem("${INTRO_SESSION_KEY}")){
sessionStorage.setItem("${INTRO_SESSION_KEY}","1");
var r=document.documentElement;r.dataset.intro="pending";
var timeout,previous;
function release(){var site=document.querySelector(".intro-site");if(site)site.inert=false;r.removeAttribute("data-intro");r.removeAttribute("data-intro-reveal");r.removeAttribute("data-intro-keyboard");clearTimeout(timeout);observer.disconnect();document.removeEventListener("keydown",earlyKey,true)}
function sync(){var mode=r.dataset.intro;var site=document.querySelector(".intro-site");if(site)site.inert=!!mode;if(!mode){release();return}if(mode!==previous){previous=mode;clearTimeout(timeout);timeout=setTimeout(release,mode==="running"?${INTRO_RUNNING_TIMEOUT_MS}:4500)}}
function earlyKey(e){if(r.dataset.intro!=="pending")return;r.dataset.introKeyboard="true";if(e.key==="Escape"||e.key==="Tab"){e.preventDefault();e.stopImmediatePropagation();release();document.querySelector(".skip-link")?.focus({preventScroll:true})}}
var observer=new MutationObserver(sync);observer.observe(r,{subtree:true,childList:true,attributes:true,attributeFilter:["data-intro"]});document.addEventListener("keydown",earlyKey,true);sync();
}}catch{}})();`;
