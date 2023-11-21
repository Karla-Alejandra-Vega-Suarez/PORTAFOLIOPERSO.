//Registrar el service worker
self.addEventListener("install", function(event) {
    //Registrar la ruta de la aplicación
    event.waitUntil(
      caches.open("app").then(function(cache) {
        return cache.addAll(["/"]);
      })
    );
  });
  
  //Registrar la ruta de inicio de la aplicación
  self.addEventListener("fetch", function(event) {
    //Si la ruta coincide con la ruta de inicio de la aplicación
    if (event.request.url === "/") {
      //Servir el contenido desde la cache
      event.respondWith(caches.match("/"));
    }
  });
  