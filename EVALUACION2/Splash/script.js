document.addEventListener('DOMContentLoaded', function () {
    // Simula un retraso de 2 segundos para la pantalla de carga 
    setTimeout(function () {
    hideSplashScreen();
    }, 2000);
    });
    
    function hideSplashScreen () {
    const splashScreen = document.getElementById('splash-screen'); 
    splashScreen.style.display = 'none';

    // Muestra la pantalla de inicio
    const homeScreen = document.getElementById('home-screen'); 
    homeScreen.classList.remove('hidden');

    // Agrega un evento al botón de inicio
    const startButton = document.getElementById('start-button'); 
    startButton.addEventListener('click', function () { 
        alert('¡La aplicación ha comenzado!');
    });
    }

    if ('Notification' in window) {
        Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
        new Notification ('¡Bienvenido!', {
        body: 'Gracias por visitar nuestro sitio web.'
        });
        }
        });
        }