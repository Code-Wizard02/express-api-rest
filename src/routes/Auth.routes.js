import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  try {
    const { email, password, rol } = req.body;

    const existe = await User.findOne({ email });
    if (existe) {
      console.log('❌ Email ya registrado:', email);
      return res.status(400).json({ message: 'El correo ya está registrado.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('🔐 Contraseña encriptada (antes de guardar):', hashedPassword);
    const user = new User({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email,
      password: hashedPassword,
      rol: rol || 'comprador',
    });
    console.log('✅ Usuario guardado con contraseña:', user.password);

    const savedUser = await user.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente', id: savedUser._id });
  } catch (error) {
    console.error('❌ Error en registro:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ Usuario no encontrado con email:', email);
      return res.status(400).json({ message: 'Usuario no encontrado', error: 'USER_NOT_FOUND' });
    }

    console.log('🔎 Usuario encontrado:', user.email);
    console.log('🔐 Contraseña recibida:', password);
    console.log('🔐 Contraseña en base de datos:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('🔍 Resultado comparación bcrypt:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas', error: 'INVALID_PASSWORD' });
    }

    const token = jwt.sign(
      { id: user._id, rol: user.rol },
      'secret_key',
      { expiresIn: '1h' }
    );

    console.log('✅ Token generado:', token);

    res.json({
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol: user.rol
      }
    });

  } catch (error) {
    console.error('❌ Error en login:', error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
