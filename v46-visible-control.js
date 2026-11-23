(function(){
'use strict';
function start(){
 if(document.getElementById('fm-v46-launcher'))return;
 const root=document.createElement('div');root.id='fm-v46-launcher';
 root.style.cssText='position:fixed!important;top:72px!important;right:12px!important;z-index:2147483647!important;font:14px Arial,sans-serif!important;';
 const open=document.createElement('button');open.type='button';open.textContent='☁ Cloud Transfer V46';
 open.style.cssText='display:block!important;background:#075d80!important;color:white!important;border:2px solid white!important;border-radius:10px!important;padding:12px!important;box-shadow:0 3px 16px #0008!important;font-weight:bold!important;cursor:pointer!important;pointer-events:auto!important;';
 const panel=document.createElement('div');panel.id='fm-v46-panel';
 panel.style.cssText='display:none!important;position:relative!important;background:white!important;color:#152c3c!important;width:min(350px,calc(100vw - 24px))!important;max-height:70vh!important;overflow:auto!important;padding:16px!important;border:2px solid #075d80!important;border-radius:12px!important;box-shadow:0 8px 30px #0006!important;margin-top:8px!important;pointer-events:auto!important;';
 panel.innerHTML='<strong>V46 Cloud Transfer — connection test</strong><p id="fm-v46-status">Panel opened successfully. Firebase not yet checked.</p><button type="button" id="fm-v46-check" style="padding:9px">Check Firebase connection</button> <button type="button" id="fm-v46-close" style="padding:9px">Close</button><p style="font-size:12px">Uploads and restores are disabled in this diagnostic build.</p>';
 root.append(open,panel);document.body.appendChild(root);
 let shown=false;
 open.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();shown=!shown;panel.style.setProperty('display',shown?'block':'none','important');open.textContent=shown?'☁ Close Cloud Transfer':'☁ Cloud Transfer V46';});
 panel.querySelector('#fm-v46-close').addEventListener('click',function(e){e.preventDefault();shown=false;panel.style.setProperty('display','none','important');open.textContent='☁ Cloud Transfer V46';});
 panel.querySelector('#fm-v46-check').addEventListener('click',async function(e){e.preventDefault();const s=panel.querySelector('#fm-v46-status');s.textContent='Checking Firebase SDK...';try{await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js');s.textContent='Firebase SDK loaded successfully. This is not yet a database or login test.';}catch(err){s.textContent='Firebase SDK loading error: '+String(err&&err.message||err);}});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
