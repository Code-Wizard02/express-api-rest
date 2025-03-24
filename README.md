# API REST CRUD con Node.js, Express y MongoDB

Este proyecto implementa una API RESTful para gestionar usuarios y Productos, utilizando Node.js, Express y MongoDB. Incluye operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para ambos recursos, así como un sistema básico de autenticación con JWT.

## Estructura del Proyecto

```
src/
├── models/
│   ├── User.js
│   └── Products.js
├── routes/
│   ├── Users.routes.js
│   ├── Products.routes.js
│   └── Auth.routes.js
└── server.js
```

## Instalación

1. Clona el repositorio o crea la estructura de carpetas y archivos como se muestra arriba.

2. Ejecuta el siguiente comando para instalar las dependencias:

```bash
npm install
```

3. Asegúrate de que MongoDB esté corriendo. Si usas MongoDB localmente:

   - Instala MongoDB.
   - Inicia el servidor con mongod.
   - La URL de conexión por defecto es mongodb://localhost:27017/productos.
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
  "nombre": "Test",
  "apellido": "User",
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
    "nombre": "Test",
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
        "nombre": "Test",
        "apellido": "User",
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
  "nombre": "Test",
  "apellido": "User",
  "email": "test@example.com"
}
```

#### Crear Usuario

- **Método**: POST
- **Endpoint**: /api/users
- **Cuerpo**:

```json
{
  "nombre": "Jane",
  "apellido": "Doe",
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

````json
{
    "nombre": "Jane Updated"
}
apellido``
- **Respuesta**:
```json
{
    "message": "User with the 507f1f77bcf86cd799439011 has been updated"
}
````

#### Eliminar Usuario

- **Método**: DELETE
- **Endpoint**: /api/users/:id
- **Respuesta**:

```json
{
  "message": "Jane deleted successfully from database"
}
```

### Productos

#### Obtener Todos los Productos

- **Método**: GET
- **Endpoint**: /api/products
- **Respuesta**:

```json
[
    {
  "nombre": "Laptop",
  "descripcion": "Una laptop de alto rendimiento con 16GB de RAM y 512GB SSD.",
  "precio": 1500,
  "stock": 25
},
    ...
]
```

#### Obtener Productos por ID

- **Método**: GET
- **Endpoint**: /api/products/:id
- **Respuesta**:

```json
{
  "_id": "507f191e810c19729de860ea",
  "nombre": "Laptop",
  "descripcion": "Una laptop de alto rendimiento con 16GB de RAM y 512GB SSD.",
  "precio": 1500,
  "stock": 25
}
```

#### Crear Producto

- **Método**: POST
- **Endpoint**: /api/products
- **Cuerpo**:

```json
{
  "nombre": "Laptop",
  "descripcion": "Una laptop de alto rendimiento con 16GB de RAM y 512GB SSD.",
  "precio": 1500,
  "stock": 25
}
```

- **Respuesta**:

```json
{
  "_id": "507f191e810c19729de860ea",
  "nombre": "Laptop",
  "descripcion": "Una laptop de alto rendimiento con 16GB de RAM y 512GB SSD.",
  "precio": 1500,
  "stock": 25
}
```

#### Actualizar Producto

- **Método**: PUT
- **Endpoint**: /api/products/:id
- **Cuerpo**:

```json
{
    "precio": 1500
}
```

- **Respuesta**:

```json
{
  "nombre": "Laptop",
  "descripcion": "Una laptop de alto rendimiento con 16GB de RAM y 512GB SSD.",
  "precio": 1500,
  "stock": 25
}
```

#### Eliminar Producto

- **Método**: DELETE
- **Endpoint**: /api/products/:id
- **Respuesta**:

```json
{
  "message": "Producto eliminado",
  "product": {
    "_id": "507f191e810c19729de860ea",
  "nombre": "Laptop",
  "descripcion": "Una laptop de alto rendimiento con 16GB de RAM y 512GB SSD.",
  "precio": 1500,
  "stock": 25
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
  "nombre": "Test",
  "apellido": "User",
  "email": "test@example.com",
  "password": "123456"
}
```


### Obtener Todos los Usuarios

**Postman**:

- Método: GET
- URL: http://localhost:3000/api/users


### Crear Producto

**Postman**:

- Método: POST
- URL: http://localhost:3000/api/products
- Body (raw, JSON):

```json
{
  "nombre": "Laptop",
  "descripcion": "Una laptop de alto rendimiento con 16GB de RAM y 512GB SSD.",
  "precio": 1500,
  "stock": 25
}
```


