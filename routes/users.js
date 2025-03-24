import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// GET - Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Excluye la contraseña
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Crear un nuevo usuario
router.post('/', async (req, res) => {
    try {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password // Se hashea automáticamente
        });
        const savedUser = await user.save();
        res.status(201).json({ message: `${savedUser.firstName} has been added to the Database` });
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
        res.json({ message: `${user.firstName} deleted successfully from database` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PATCH - Actualizar usuario
router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        if (req.body.firstName) user.firstName = req.body.firstName;
        if (req.body.lastName) user.lastName = req.body.lastName;
        if (req.body.email) user.email = req.body.email;
        if (req.body.password) user.password = req.body.password;

        const updatedUser = await user.save();
        res.json({ message: `User with the ${updatedUser._id} has been updated` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;