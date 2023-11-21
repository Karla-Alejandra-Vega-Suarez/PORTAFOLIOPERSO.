document.addEventListener('DOMContentLoaded', function () {
    // Selecciona el elemento del menú
    const menu = document.getElementById('categorias');

    // Agrega un evento para mostrar u ocultar el menú al hacer clic en el encabezado
    menu.addEventListener('click', () => {
        menu.classList.toggle('activo');
    });

    const grid = new Muuri('.grid', {
        layout: {
            rounding: false
        }
    });

    window.addEventListener('load', () => {
        grid.refreshItems().layout();
        document.getElementById('grid').classList.add('imagenes-cargadas');

        // Agregamos los listener de los enlaces para filtrar por categoría.
        const enlaces = document.querySelectorAll('#categorias a');
        enlaces.forEach((elemento) => {
            elemento.addEventListener('click', (evento) => {
                evento.preventDefault();
                enlaces.forEach((enlace) => enlace.classList.remove('activo'));
                evento.target.classList.add('activo');

                const categoria = evento.target.innerHTML.toLowerCase();
                categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
            });
        });

        // Agregamos el listener para la barra de búsqueda
        document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
            const busqueda = evento.target.value;
            grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda));
        });

        // Agregamos listener para las imágenes
        const overlay = document.getElementById('overlay');
        document.querySelectorAll('.grid .item img').forEach((elemento) => {
            elemento.addEventListener('click', () => {
                const ruta = elemento.getAttribute('src');
                const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

                overlay.classList.add('activo');
                document.querySelector('#overlay img').src = ruta;
                document.querySelector('#overlay .descripcion').innerHTML = descripcion;
            });
        });

        // Eventlistener del botón de cerrar
        document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
            overlay.classList.remove('activo');
        });

        // Eventlistener del overlay
        overlay.addEventListener('click', (evento) => {
            if (evento.target.id === 'overlay') {
                overlay.classList.remove('activo');
            }
        });
    });

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('serviceworker.js')
            .then((registration) => {
                console.log('Service Worker registrado con éxito:', registration);
            })
            .catch((error) => {
                console.log('Error al registrar el Service Worker:', error);
            });
    }
});
