(function(){
'use strict';
function start(){
 if(document.getElementById('fm-v46-launcher'))return;
 var root=document.createElement('div');root.id='fm-v46-launcher';
 root.style.cssText='position:fixed!important;top:72px!important;right:12px!important;z-index:2147483647!important;font:14px Arial,sans-serif!important;';
 root.innerHTML='<button id="fm-v46-open" style="display:block!important;background:#075d80!important;color:white!important;border:2px solid white!important;border-radius:10px!important;padding:12px!important;box-shadow:0 3px 16px #0008!important;font-weight:bold!important;cursor:pointer!important">☁ Cloud Transfer V46</button><section id="fm-v46-panel" hidden style="background:white;color:#152c3c;width:min(350px,calc(100vw - 24px));max-height:70vh;overflow:auto;padding:16px;border:2px solid #075d80;border-radius:12px;box-shadow:0 8px 30px #0006;margin-top:8px"><strong>V46 Cloud Transfer — connection test</strong><p id="fm-v46-status">Panel is working. Firebase not yet checked.</p><button id="fm-v46-check" style="padding:9px">Check Firebase connection</button> <button id="fm-v46-close" style="padding:9px">Close</button><p style="font-size:12px">Uploads and restores are disabled in this diagnostic build. Your existing data is untouched.</p></section>';
 document.body.appendChild(root);
 var panel=document.getElementById('fm-v46-panel');
 document.getElementById('fm-v46-open').onclick=function(){panel.hidden=!panel.hidden};
 document.getElementById('fm-v46-close').onclick=function(){panel.hidden=true};
 document.getElementById('fm-v46-check').onclick=async function(){var s=document.getElementById('fm-v46-status');s.textContent='Checking Firebase SDK...';try{var m=await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js');s.textContent='Firebase SDK loaded successfully. Cloud controls are visible. Next step: safely enable data preview.';}catch(e){s.textContent='Firebase loading error: '+String(e&&e.message||e)}};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();