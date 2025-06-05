// routes/Cart.routes.js
import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { authMiddleware, verificarRol } from './middleware/Auth.middleware.js';

const router = express.Router();

// Obtener el carrito del usuario autenticado
router.get('/', authMiddleware, verificarRol('comprador'), async (req, res) => {
    try {
        let cart = await Cart.findOne({ comprador: req.user.id }).populate('productos.producto');
        if (!cart) {
            cart = await Cart.create({ comprador: req.user.id, productos: [] });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Agregar producto al carrito
router.post('/add', authMiddleware, verificarRol('comprador'), async (req, res) => {
    const { productId, cantidad } = req.body;
    try {
        let cart = await Cart.findOne({ comprador: req.user.id });
        if (!cart) cart = await Cart.create({ comprador: req.user.id, productos: [] });

        const existingItem = cart.productos.find(item => item.producto.toString() === productId);
        if (existingItem) {
            existingItem.cantidad += cantidad;
        } else {
            cart.productos.push({ producto: productId, cantidad });
        }

        await cart.save();
        res.status(200).json({ message: 'Producto agregado al carrito' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar producto del carrito
router.delete('/:productId', authMiddleware, verificarRol('comprador'), async (req, res) => {
    try {
        const cart = await Cart.findOne({ comprador: req.user.id });
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

        cart.productos = cart.productos.filter(item => item.producto.toString() !== req.params.productId);
        await cart.save();

        res.json({ message: 'Producto eliminado del carrito' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Vaciar el carrito
router.patch('/clear', authMiddleware, verificarRol('comprador'), async (req, res) => {
    try {
        const cart = await Cart.findOne({ comprador: req.user.id });
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

        cart.productos = [];
        await cart.save();

        res.json({ message: 'Carrito vaciado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
