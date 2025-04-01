import express from 'express';
import User from '../models/User.js';
import mongoose from 'mongoose';
import authMiddleware from './middleware/Auth.middleware.js';

const router = express.Router();
router.use(authMiddleware)

// GET - Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Crear un nuevo usuario
router.post('/', async (req, res) => {
    try {
        const user = new User({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: req.body.password
        });
        const savedUser = await user.save();
        res.status(201).json({ message: `${savedUser.nombre} fue agregado a la base de datos` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET - Obtener usuario por ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE - Eliminar usuario
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ message: `${user.nombre} fue borrado de la base de datos exitoso` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PATCH - Actualizar usuario
router.patch('/:id', async (req, res) => {
    try {
        const userId= new mongoose.Types.ObjectId(req.params.id);
        await User.findByIdAndUpdate(userId, {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: req.body.password
        });
        res.json({ message: `El usuario con la id: ${userId} fue actualizado` });
    } catch (error) {
        console.dir(error, {depth: null});
        res.status(400).json({ message: error.message });
    }
});

export default router;