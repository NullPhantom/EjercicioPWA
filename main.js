if('serviceWorker'in navigator)
{
    console.log("Puedes usar el serviceworker");
    navigator.serviceWorker.register('./sw.js')
    .then(res=>console.log('SW cargado correctamente', res))
    .catch(err => console.log('No se ha podido registrar', err));
}
else
{
    console.log("No se puede usar el servie worker")
}