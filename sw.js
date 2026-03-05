const CACHE="door-helper-v1";

const FILES=[
"/",
"/index.html",
"/manifest.json",
"/audio/who.mp3",
"/audio/ok.mp3",
"/audio/yes.mp3",
"/audio/no.mp3"
];

self.addEventListener("install",e=>{
e.waitUntil(
caches.open(CACHE)
.then(c=>c.addAll(FILES))
);
});

self.addEventListener("fetch",e=>{
e.respondWith(
caches.match(e.request)
.then(r=>r||fetch(e.request))
);
});
