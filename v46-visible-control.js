(function(){
'use strict';
function start(){
 if(document.getElementById('fm-v46-launcher'))return;
 const root=document.createElement('div');root.id='fm-v46-launcher';
 root.style.cssText='position:fixed!important;top:72px!important;right:12px!important;z-index:2147483647!important;font:14px Arial,sans-serif!important;';
 const open=document.createElement('button');open.type='button';open.textContent='☁ Cloud Transfer V46';
 open.style.cssText='display:block!important;background:#075d80!important;color:white!important;border:2px solid white!important;border-radius:10px!important;padding:12px!important;box-shadow:0 3px 16px #0008!important;font-weight:bold!important;cursor:pointer!important;pointer-events:auto!important;';
 const panel=document.createElement('div');panel.id='fm-v46-panel';
 panel.style.cssText='display:none!important;position:relative!important;background:white!important;color:#152c3c!important;width:min(380px,calc(100vw - 24px))!important;max-height:75vh!important;overflow:auto!important;padding:16px!important;border:2px solid #075d80!important;border-radius:12px!important;box-shadow:0 8px 30px #0006!important;margin-top:8px!important;pointer-events:auto!important;';
 panel.innerHTML='<strong>V46 — Safe Firestore Test</strong><p id="fm-v46-status" role="status" style="white-space:pre-wrap">Ready. No client data will be accessed.</p><button type="button" id="fm-v46-check" style="padding:9px;margin:4px 0">Test dummy upload, read & delete</button> <button type="button" id="fm-v46-close" style="padding:9px">Close</button><p style="font-size:12px">Test writes one random dummy record under your own account, reads it, and deletes it. No programme or client data is touched. Automatic syncing and restore remain disabled.</p>';
 root.append(open,panel);document.body.appendChild(root);
 let shown=false, busy=false;
 function toggle(value){shown=value;panel.style.setProperty('display',shown?'block':'none','important');open.textContent=shown?'☁ Close Cloud Transfer':'☁ Cloud Transfer V46';}
 open.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();toggle(!shown);});
 panel.querySelector('#fm-v46-close').addEventListener('click',function(e){e.preventDefault();toggle(false);});
 panel.querySelector('#fm-v46-check').addEventListener('click',async function(e){
  e.preventDefault();if(busy)return;busy=true;const btn=e.currentTarget;btn.disabled=true;
  const status=panel.querySelector('#fm-v46-status');const say=t=>status.textContent=t;
  let ref=null, db=null, deleteDoc=null;
  try{
   say('Loading Firebase...');
   const [appMod,authMod,dbMod]=await Promise.all([
    import('https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js'),
    import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js'),
    import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js')
   ]);
   const cfg={apiKey:'AIzaSyBtX4hOQ2Zq2-M9r9v-5mGe0WGeu1p1NTM',authDomain:'fitness-master-hub-86a01.firebaseapp.com',projectId:'fitness-master-hub-86a01',storageBucket:'fitness-master-hub-86a01.firebasestorage.app',messagingSenderId:'58749101761',appId:'1:58749101761:web:7c1e8a1ff61eaf0e335640'};
   const app=appMod.getApps().find(a=>a.name==='fm-v46-probe')||appMod.initializeApp(cfg,'fm-v46-probe');
   const auth=authMod.getAuth(app);db=dbMod.getFirestore(app);deleteDoc=dbMod.deleteDoc;
   await auth.authStateReady();
   let user=auth.currentUser;
   if(!user){
    say('Google sign-in required. Opening sign-in window...');
    const provider=new authMod.GoogleAuthProvider();
    // Popup initiated by the user's tap. Browsers may block it; if so, show actionable error.
    const result=await authMod.signInWithPopup(auth,provider);user=result.user;
   }
   if(!user)throw new Error('Google sign-in did not complete.');
   say('Signed in. Writing a dummy test record...');
   const nonce=Array.from(crypto.getRandomValues(new Uint8Array(12)),b=>b.toString(16).padStart(2,'0')).join('');
   ref=dbMod.doc(db,'users',user.uid,'syncDiagnostics','probe-'+nonce);
   const payload={kind:'dummy-firestore-test',nonce,createdAt:dbMod.serverTimestamp()};
   await dbMod.setDoc(ref,payload);
   say('Dummy upload succeeded. Reading it back...');
   const snapshot=await dbMod.getDocFromServer(ref);
   if(!snapshot.exists()||snapshot.data().nonce!==nonce)throw new Error('Read-back verification failed.');
   say('Dummy upload and read succeeded. Removing test record...');
   await deleteDoc(ref);ref=null;
   say('SUCCESS ✓\nGoogle authentication: working\nFirestore write: working\nFirestore read: working\nTest record deleted: yes\n\nNo real client data was accessed.');
  }catch(err){
   let msg=String(err&&err.code||err&&err.message||err);
   if(msg.includes('popup-blocked'))msg+=' — Open Test Hub directly in Chrome and try again.';
   say('TEST NOT COMPLETED\n'+msg+'\n\nNo existing client or programme data was modified.');
  }finally{
   if(ref&&db&&deleteDoc){try{await deleteDoc(ref);say(status.textContent+'\nTest-record cleanup attempted.');}catch(e){say(status.textContent+'\nCleanup could not be confirmed; only a dummy test record may remain.');}}
   busy=false;btn.disabled=false;
  }
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
