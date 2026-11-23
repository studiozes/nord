/* Nord offline-basis: alleen de eigen routepagina, nooit externe live-bronnen. */
const SHELL_CACHE='nord-shell-2026-11-v5';
const SHELL_URL=new URL('./index.html',self.registration.scope).toString();

self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(SHELL_CACHE);
    await cache.add(new Request(SHELL_URL,{cache:'reload'}));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const names=await caches.keys();
    await Promise.all(names.filter(name=>name.startsWith('nord-shell-')&&name!==SHELL_CACHE)
      .map(name=>caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch',event=>{
  if(event.request.mode!=='navigate'||event.request.method!=='GET')return;
  const target=new URL(event.request.url),scope=new URL(self.registration.scope);
  if(target.origin!==scope.origin||!target.pathname.startsWith(scope.pathname))return;
  event.respondWith((async()=>{
    try{
      const response=await fetch(event.request);
      if(response.ok&&response.type==='basic'){
        const cache=await caches.open(SHELL_CACHE);
        await cache.put(SHELL_URL,response.clone());
      }
      return response;
    }catch{
      const cache=await caches.open(SHELL_CACHE);
      return await cache.match(SHELL_URL)||Response.error();
    }
  })());
});
