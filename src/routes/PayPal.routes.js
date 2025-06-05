// routes/PayPal.routes.js
import express from 'express';
import { authMiddleware, verificarRol } from './middleware/Auth.middleware.js';
import { client as paypalClient } from '../paypal/paypalClient.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import paypal from '@paypal/checkout-server-sdk';

const router = express.Router();

// Crear orden en PayPal desde el carrito
router.post('/create-order', authMiddleware, verificarRol('comprador'), async (req, res) => {
    try {
        const cart = await Cart.findOne({ comprador: req.user.id }).populate('productos.producto');
        if (!cart || cart.productos.length === 0) {
            return res.status(400).json({ message: 'Carrito vacío' });
        }

        const total = cart.productos.reduce((sum, item) => {
            return sum + item.producto.precio * item.cantidad;
        }, 0);

        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer('return=representation');
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: total.toFixed(2)
                }
            }]
        });

        const order = await paypalClient().execute(request);
        const approvalLink = order.result.links.find(link => link.rel === 'approve');
        res.status(200).json({
            id: order.result.id,
            approveUrl: approvalLink.href
        });
    } catch (error) {
        console.error('Error al crear orden PayPal:', error);
        res.status(500).json({ message: 'Error al crear orden de pago' });
    }
});

// Capturar pago en PayPal
router.post('/capture-order', authMiddleware, verificarRol('comprador'), async (req, res) => {
    const { orderID } = req.body;
    try {
        const request = new paypal.orders.OrdersCaptureRequest(orderID);
        request.requestBody({});

        const capture = await paypalClient().execute(request);

        // Marcar carrito como pagado
        await Cart.findOneAndUpdate(
            { comprador: req.user.id },
            { $set: { pagado: true, productos: [] } }
        );

        res.status(200).json({ message: 'Pago exitoso', detalles: capture.result });
    } catch (error) {
        if (error.statusCode) {
            console.error('🛑 PayPal API Error:', error.statusCode, error.message);
            const details = await error.response.json();
            console.error('🔍 Detalles:', JSON.stringify(details, null, 2));
        } else {
            console.error('🛑 Error desconocido:', error);
        }

        res.status(500).json({ message: 'Error al capturar pago', error: error.message });
    }
});

export default router;
