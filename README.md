# API REST CRUD con Node.js, Express y MongoDB

Este proyecto implementa una API RESTful para gestionar usuarios y animales marinos, utilizando Node.js, Express y MongoDB. Incluye operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para ambos recursos, así como un sistema básico de autenticación con JWT.

## Estructura del Proyecto

```
project/
├── models/
│   ├── User.js
│   └── MarineAnimal.js
├── routes/
│   ├── users.js
│   ├── marineAnimals.js
│   └── auth.js
├── server.js
└── package.json
```

## Requisitos

- Node.js (v14 o superior)
- MongoDB (local o en la nube, como MongoDB Atlas)

## Instalación

1. Clona el repositorio o crea la estructura de carpetas y archivos como se muestra arriba.

2. Ejecuta el siguiente comando para instalar las dependencias:

```bash
npm install
```

3. Asegúrate de que MongoDB esté corriendo. Si usas MongoDB localmente:
   - Instala MongoDB.
   - Inicia el servidor con mongod.
   - La URL de conexión por defecto es mongodb://localhost:27017/marine-api.
   - Si usas MongoDB Atlas, actualiza la URL de conexión en server.js.

4. Inicia el servidor:

```bash
nodemon server.js
```

## Endpoints

### Autenticación

#### Registro de Usuario
- **Método**: POST
- **Endpoint**: /api/auth/register
- **Cuerpo**:
```json
{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "123456"
}
```
- **Respuesta**:
```json
{
    "message": "Usuario registrado exitosamente"
}
```

#### Login
- **Método**: POST
- **Endpoint**: /api/auth/login
- **Cuerpo**:
```json
{
    "email": "test@example.com",
    "password": "123456"
}
```
- **Respuesta**:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "id": "507f1f77bcf86cd799439011",
        "firstName": "Test",
        "email": "test@example.com"
    }
}
```

### Usuarios

#### Obtener Todos los Usuarios
- **Método**: GET
- **Endpoint**: /api/users
- **Respuesta**:
```json
[
    {
        "_id": "507f1f77bcf86cd799439011",
        "firstName": "Test",
        "lastName": "User",
        "email": "test@example.com"
    },
    ...
]
```

#### Obtener Usuario por ID
- **Método**: GET
- **Endpoint**: /api/users/:id
- **Respuesta**:
```json
{
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com"
}
```

#### Crear Usuario
- **Método**: POST
- **Endpoint**: /api/users
- **Cuerpo**:
```json
{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com",
    "password": "password123"
}
```
- **Respuesta**:
```json
{
    "message": "Jane has been added to the Database"
}
```

#### Actualizar Usuario
- **Método**: PATCH
- **Endpoint**: /api/users/:id
- **Cuerpo**:
```json
{
    "firstName": "Jane Updated"
}
```
- **Respuesta**:
```json
{
    "message": "User with the 507f1f77bcf86cd799439011 has been updated"
}
```

#### Eliminar Usuario
- **Método**: DELETE
- **Endpoint**: /api/users/:id
- **Respuesta**:
```json
{
    "message": "Jane deleted successfully from database"
}
```

### Animales Marinos

#### Obtener Todos los Animales Marinos
- **Método**: GET
- **Endpoint**: /api/marine-animals
- **Respuesta**:
```json
[
    {
        "_id": "507f191e810c19729de860ea",
        "name": "Pulpo Común",
        "species": "Octopus vulgaris",
        "habitat": "Océanos y mares",
        "lifespan": 2
    },
    ...
]
```

#### Obtener Animal Marino por ID
- **Método**: GET
- **Endpoint**: /api/marine-animals/:id
- **Respuesta**:
```json
{
    "_id": "507f191e810c19729de860ea",
    "name": "Pulpo Común",
    "species": "Octopus vulgaris",
    "habitat": "Océanos y mares",
    "lifespan": 2
}
```

#### Crear Animal Marino
- **Método**: POST
- **Endpoint**: /api/marine-animals
- **Cuerpo**:
```json
{
    "name": "Pulpo Común",
    "species": "Octopus vulgaris",
    "habitat": "Océanos y mares",
    "lifespan": 2
}
```
- **Respuesta**:
```json
{
    "_id": "507f191e810c19729de860ea",
    "name": "Pulpo Común",
    "species": "Octopus vulgaris",
    "habitat": "Océanos y mares",
    "lifespan": 2
}
```

#### Actualizar Animal Marino
- **Método**: PUT
- **Endpoint**: /api/marine-animals/:id
- **Cuerpo**:
```json
{
    "lifespan": 3
}
```
- **Respuesta**:
```json
{
    "_id": "507f191e810c19729de860ea",
    "name": "Pulpo Común",
    "species": "Octopus vulgaris",
    "habitat": "Océanos y mares",
    "lifespan": 3
}
```

#### Eliminar Animal Marino
- **Método**: DELETE
- **Endpoint**: /api/marine-animals/:id
- **Respuesta**:
```json
{
    "message": "Animal eliminado",
    "animal": {
        "_id": "507f191e810c19729de860ea",
        "name": "Pulpo Común",
        "species": "Octopus vulgaris",
        "habitat": "Océanos y mares",
        "lifespan": 3
    }
}
```

## Pruebas

### Registro de Usuario
**Postman**:
- Método: POST
- URL: http://localhost:3000/api/auth/register
- Body (raw, JSON):
```json
{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "123456"
}
```

**cURL**:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"firstName":"Test","lastName":"User","email":"test@example.com","password":"123456"}' http://localhost:3000/api/auth/register
```

### Login
**Postman**:
- Método: POST
- URL: http://localhost:3000/api/auth/login
- Body (raw, JSON):
```json
{
    "email": "test@example.com",
    "password": "123456"
}
```

**cURL**:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"123456"}' http://localhost:3000/api/auth/login
```

### Obtener Todos los Usuarios
**Postman**:
- Método: GET
- URL: http://localhost:3000/api/users

**cURL**:
```bash
curl http://localhost:3000/api/users
```

### Crear Animal Marino
**Postman**:
- Método: POST
- URL: http://localhost:3000/api/marine-animals
- Body (raw, JSON):
```json
{
    "name": "Pulpo Común",
    "species": "Octopus vulgaris",
    "habitat": "Océanos y mares",
    "lifespan": 2
}
```

**cURL**:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"Pulpo Común","species":"Octopus vulgaris","habitat":"Océanos y mares","lifespan":2}' http://localhost:3000/api/marine-animals
```

## Notas Importantes

- Los IDs en las respuestas (_id) son generados automáticamente por MongoDB y serán diferentes en cada ejecución.
- La autenticación utiliza JWT con una clave secreta simple (secret_key). Para producción, usa una clave más segura y guárdala en variables de entorno.
- Este ejemplo no incluye middleware de autenticación en las rutas protegidas. Para implementar protección, puedes añadir un middleware que verifique el token JWT en las solicitudes.