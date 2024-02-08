//Constante para nombrar
const CACHE_NAME='v1_cache_BCH_PWA';

//configuración de los archivos
var urlsToCache = [
    './',
    './css/styles.css',
    './img/alanwake1.jpg',
    './img/Boo16.png',
    './img/Boo32.png',
    './img/Boo64.png',
    './img/Boo96.png',
    './img/Boo128.png',
    './img/Boo192.png',
    './img/Boo256.png',
    './img/Boo384.png',
    './img/Boo512.png',
    './img/Boo1024.png',
    './img/cyberpunk1.jpg',
    './img/spiderVerse.jpg',
    './img/spiderVerse2.jpg',
    './img/spiderVerse3.jpg'
];

self.addEventListener('install', e=>{
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cahce => {
            return caches.addAll(urlsToCache)
            .then(()=>{
                self.skipWaiting();
            })
        })
        .catch(err => console.log('No se ha registrado la cache', err))
    );
});

//Evento Activate
//Este evento permite que la aplicación funcione offline

self.addEventListener('activate', e =>{
    const cacheWhitelist = [CACHE_NAME];

    //QUE EL EVENTO ESPERE A QUE TERMINE DE EJECUTAR

    e.waitUntil(
        caches.keys()
        .then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cacheName =>{
                    if(cacheWhitelist.indexOf(cacheName)== -1)
                    {
                        //borrar elementos que no se necesitan
                        return cacheName.delete(cacheName);
                    }
                })
            );
        })
        .then(() =>{
            self.clients.claim(); //activa la cache en el dispositivo.
        })
    );
})

/*
Event Fetch
consigue la informacion de internet... hace consulta la backend
cuando se salta de una pagina a otra por ejemplo
checa si ya tiene los recursos den cache
*/ 

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if(res){
                //devuelvo datos desde cache
                return res;
            }
            return fetch(e.request);//hago peticion al servidor en caso de que no este en cache
        })
    );
});