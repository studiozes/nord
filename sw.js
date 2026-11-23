/* Nord v7: versioned local app-shell; external live sources are never cached. */
const SHELL_CACHE='nord-shell-2026-11-v7';
const absolute=path=>new URL(path,self.registration.scope).toString();
const SHELL_URL=absolute('./index.html');
const ASSETS=['./assets/nord-v7.css','./assets/plan-v7.js','./assets/core-v7.js','./assets/app-v7.js','./assets/icon-v7.png'].map(absolute);
self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(SHELL_CACHE);
    await cache.addAll([SHELL_URL,...ASSETS].map(url=>new Request(url,{cache:'reload'})));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const names=await caches.keys();
    await Promise.all(names.filter(name=>name.startsWith('nord-shell-')&&name!==SHELL_CACHE).map(name=>caches.delete(name)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const target=new URL(event.request.url),scope=new URL(self.registration.scope);
  if(target.origin!==scope.origin)return;
  if(ASSETS.includes(target.href)){
    event.respondWith((async()=>{
      const cache=await caches.open(SHELL_CACHE);
      return await cache.match(event.request)||fetch(event.request);
    })());
    return;
  }
  if(event.request.mode!=='navigate'||!target.pathname.startsWith(scope.pathname))return;
  event.respondWith((async()=>{
    const cache=await caches.open(SHELL_CACHE);
    try{
      const response=await fetch(event.request);
      // Keep the installed, coherent offline shell. A new worker installs its own version.
      if(response.ok)return response;
    }catch{}
    return await cache.match(SHELL_URL)||Response.error();
  })());
});
