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

---

## Módulo 7: Integración con Base de Datos (Sequelize + PostgreSQL)

### Objetivo
Conectar la aplicación a una base de datos relacional PostgreSQL utilizando el ORM Sequelize, definir modelos de datos, establecer relaciones entre entidades e implementar operaciones CRUD completas con búsquedas dinámicas.

### Stack Técnico Agregado
* **Sequelize**: ORM para Node.js que permite interactuar con PostgreSQL usando JavaScript en lugar de SQL puro.
* **pg / pg-hstore**: Driver oficial de PostgreSQL para Node.js, requerido por Sequelize.
* **Docker (PostgreSQL 15-alpine)**: Base de datos PostgreSQL ejecutándose como contenedor aislado. Configurada en `docker-compose.yml`.

### Configuración de la Base de Datos
Las credenciales de conexión se gestionan mediante variables de entorno en el archivo `.env`:
```env
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=secretpassword
DB_NAME=backend_db
```

Para levantar la base de datos, ejecutar el contenedor de Docker:
```bash
docker compose up -d
```

### Modelos Definidos

#### Modelo `Usuario` (tabla: `usuarios`)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INTEGER | Clave primaria (autoincremental) |
| nombre | STRING | Nombre del usuario (requerido) |
| email | STRING | Correo único (requerido) |
| password | STRING | Contraseña (requerido) |
| rol | STRING | Rol de acceso (default: 'user') |
| createdAt | DATE | Timestamp automático |
| updatedAt | DATE | Timestamp automático |

#### Modelo `Producto` (tabla: `productos`)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INTEGER | Clave primaria (autoincremental) |
| nombre | STRING | Nombre del producto (requerido) |
| precio | FLOAT | Precio del producto (requerido) |
| descripcion | TEXT | Descripción opcional |
| usuarioId | INTEGER | Clave foránea hacia `usuarios` |
| createdAt | DATE | Timestamp automático |
| updatedAt | DATE | Timestamp automático |

#### Relación entre Modelos (1:N)
Se implementó una relación **Un usuario puede tener muchos productos**:
```
Usuario --hasMany--> Producto
Producto --belongsTo--> Usuario
```
Sequelize agrega automáticamente la columna `usuarioId` en la tabla `productos` como clave foránea.

### Sincronización Automática de Tablas
Al iniciar el servidor, Sequelize crea las tablas automáticamente si no existen:
```javascript
await sequelize.sync({ force: false });
```

### Endpoints de la API REST

#### Usuarios — `/usuarios`
| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/usuarios` | Crear un nuevo usuario |
| `GET` | `/usuarios` | Listar todos los usuarios |
| `PUT` | `/usuarios/:id` | Actualizar un usuario por ID |
| `DELETE` | `/usuarios/:id` | Eliminar un usuario por ID |

**Ejemplo POST /usuarios:**
```bash
curl -X POST http://localhost:4000/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Leo", "email": "leo@test.com", "password": "mi_password"}'
```

**Respuesta:**
```json
{
  "status": "success",
  "message": "Usuario creado exitosamente",
  "data": { "id": 1, "nombre": "Leo", "email": "leo@test.com", "rol": "user" }
}
```

#### Productos — `/productos`
| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/productos` | Crear un nuevo producto |
| `GET` | `/productos` | Listar todos los productos |
| `GET` | `/productos?nombre=X` | **Búsqueda dinámica** por nombre (filtro parcial) |
| `PUT` | `/productos/:id` | Actualizar un producto por ID |
| `DELETE` | `/productos/:id` | Eliminar un producto por ID |

### Formato de Respuesta Estándar
Todas las respuestas de la API siguen un formato consistente:
```json
{
  "status": "success | error",
  "message": "Descripción del resultado",
  "data": { }
}
```
