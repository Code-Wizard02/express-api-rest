import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/users.js';
import marineAnimalRoutes from './routes/marineAnimals.js';
import authRoutes from './routes/auth.js';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/marine-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error de conexión:', err));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/marine-animals', marineAnimalRoutes);
app.use('/api/auth', authRoutes);

// Ruta raíz
app.get('/', (req, res) => {
    res.send('API de Animales Marinos y Usuarios');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});