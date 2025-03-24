import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/Users.routes.js';
import authRoutes from './routes/Auth.routes.js';
import productRoutes from './routes/Products.routes.js';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/productos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error de conexión:', err));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Ruta raíz
app.get('/', (req, res) => {
    res.send('API de Productos');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});