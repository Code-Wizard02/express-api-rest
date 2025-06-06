import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/Users.routes.js';
import authRoutes from './routes/Auth.routes.js';
import productRoutes from './routes/Products.routes.js';
import cartRoutes from './routes/Cart.routes.js';
import paypalRoutes from './routes/PayPal.routes.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB Atlas'))
    .catch(err => console.error('❌ Error de conexión:', err));

// Rutas
app.get('/', (req, res) => { res.send('API de Productos') });
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/paypal', paypalRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${port}`);
});