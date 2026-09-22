# Guía rápida para GitHub

## 1. Crear un repositorio en GitHub

- Inicia sesión en GitHub.
- Haz clic en `New repository`.
- Asigna un nombre descriptivo.
- Elige `Public` o `Private`.
- No inicialices con README si ya lo tienes localmente.

## 2. Conectar el repositorio local

```bash
git remote add origin https://github.com/USUARIO/NOMBRE_REPO.git
git branch -M main
git push -u origin main
```

## 3. Buenas prácticas

- Haz commits frecuentes y con mensajes claros.
- Usa ramas para cada tarea o entrega.
- Añade una licencia si tu universidad o proyecto lo exige.
- Incluye una explicación breve en cada README.

## 4. Ejemplo de mensajes de commit

```bash
git commit -m "Agrega estructura inicial del repositorio"
git commit -m "Incluye README principal y guía de GitHub"
git commit -m "Añade plantilla de proyecto académico"
```

## 5. Recomendación

Etiqueta tus entregas importantes o proyectos finales con `tags` de Git:

```bash
git tag -a v1.0 -m "Primera versión estable"
git push origin v1.0
```
