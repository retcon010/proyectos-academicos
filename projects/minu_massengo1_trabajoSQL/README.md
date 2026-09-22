# MasterD

Proyecto web estático de una agencia de diseño y desarrollo con páginas de inicio, galería y contacto.

## Descripción

Este sitio presenta una marca con estilo moderno y una estructura de navegación simple:

- Inicio
- Galería
- Contacto

Incluye Bootstrap para el diseño responsive y Leaflet para el mapa de ubicación.

## Estructura

- `index.html` — página principal
- `galeria.html` — galería de proyectos
- `contacto.html` — formulario de contacto y mapa
- `css/main.css` — estilos del sitio
- `js/main.js` — validación del formulario y mapa

## Despliegue con GitHub Pages

El repositorio está preparado para desplegar este proyecto mediante GitHub Actions.

Después de hacer push al repositorio en GitHub:

1. Ve a Settings > Pages.
2. En Source selecciona GitHub Actions.
3. Confirma que el workflow se ejecuta correctamente.

La URL pública será algo como:

https://[usuario].github.io/[nombre-repositorio]/projects/minu_massengo1_trabajoSQL/

## Ejecutar en local

Abre cualquiera de los archivos HTML en el navegador o sirve la carpeta con un servidor local simple.

```bash
python -m http.server 8000
```

Y luego accede a:

http://localhost:8000
