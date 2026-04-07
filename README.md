# Proyecto: Node & Express Web App - Módulo 6

Este repositorio contiene la primera fase del desarrollo de una aplicación web backend utilizando Node.js y Express.js. El objetivo principal de esta etapa es establecer la arquitectura base del servidor, configurar rutas, servir contenido web y manejar persistencia básica en archivos planos, preparando el entorno para la futura integración con bases de datos y seguridad (JWT).

## Requisitos del Sistema

Para ejecutar este proyecto, el entorno debe contar con:
* **Node.js**: Versión 18.0 o superior (El desarrollo se probó sobre una imagen Docker `node:18-alpine`).
* **NPM**: Gestor de paquetes de Node.
* **Git**: Para el control de versiones.

## Instrucciones de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd proyecto_modulo-6_7_8
   ```

2. **Instalar dependencias:**
   Se omitió la subida del directorio `node_modules` mediante `.gitignore` por buenas prácticas. Para instalar los paquetes requeridos (express, dotenv y nodemon), ejecuta:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto y define el puerto de ejecución:
   ```env
   PORT=3000
   ```

## Ejemplos de Uso y Ejecución
El proyecto incluye dos scripts principales definidos en el `package.json`:

* **Modo Desarrollo**: Ejecuta el servidor utilizando `nodemon` para habilitar el hot-reloading. Ideal para la fase de construcción.
  ```bash
  npm run dev
  ```

* **Modo Producción**: Ejecuta el servidor directamente con el entorno nativo de Node.js.
  ```bash
  npm start
  ```

## Endpoints Disponibles
Una vez iniciado el servidor (por defecto en `http://localhost:3000`), puedes acceder a las siguientes rutas:

* `GET /`: Devuelve un archivo HTML estático servido desde el directorio `/public`.
* `GET /status`: Devuelve un objeto JSON verificando el estado del servidor y el timestamp actual.

**Nota sobre Persistencia**: Cada petición realizada a cualquier endpoint del servidor es interceptada por un middleware personalizado que registra la fecha, hora y ruta accedida en el archivo plano `logs/log.txt`.

## Justificaciones Técnicas y Arquitectura
El proyecto fue diseñado bajo un paradigma modular para garantizar escalabilidad hacia los módulos 7 y 8.

* **Entry Point (index.js)**: Se eligió `index.js` como archivo principal por ser la convención estándar en el ecosistema de Node.js, actuando como el índice raíz que inicializa la aplicación e inyecta las configuraciones principales.

* **Estructura de Directorios**:
    * `/routes`: Aísla la definición de los endpoints. Cumple con el objetivo de separar la capa de red.
    * `/controllers`: Contiene la lógica de procesamiento de las peticiones HTTP (req, res).
    * `/middlewares`: Centraliza los interceptores, como el `logger.js` encargado de la persistencia en archivos planos.
    * `/public`: Contiene los recursos estáticos. Se optó por servir un HTML estático nativo en lugar de implementar un motor de plantillas (como EJS) dado que el objetivo final de la aplicación es exponer una API RESTful, donde el frontend estará completamente desacoplado.
    * `/logs`: Directorio aislado para la persistencia plana requerida en esta etapa.

* **Gestión de Scripts**: Se definieron `start` y `dev` para mantener una clara separación entre la ejecución en caliente para desarrollo local y la ejecución en frío para un eventual despliegue.

### 🌟 Plus: Entorno Dockerizado (Opcional)

Aunque no era un requisito estricto para esta fase, el desarrollo y pruebas de este servidor base se realizaron utilizando un entorno aislado mediante Docker (`node:18-alpine`). Esta decisión técnica garantiza la consistencia del entorno de trabajo, evitando la problemática de diferencias de OS ("en mi máquina sí funciona") e introduciendo buenas prácticas orientadas a DevOps y contenedores desde la concepción del proyecto.


