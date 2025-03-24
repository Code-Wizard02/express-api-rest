import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// GET - Obtener todos los productos
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Crear un nuevo producto
router.post("/", async (req, res) => {
    try {
        const product = new Product({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            stock: req.body.stock,
        });
        const savedProduct = await product.save();
        res.status(201).json({ message: `${savedProduct.nombre} fue agregado a la base de datos` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET - Obtener producto por ID
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE - Eliminar producto
router.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });
        res.json({ message: `${product.nombre} producto eliminado de la base de datos` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PATCH - Actualizar producto
router.patch("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });

        if (req.body.nombre) product.nombre = req.body.nombre;
        if (req.body.descripcion) product.descripcion = req.body.descripcion;
        if (req.body.precio) product.precio = req.body.precio;
        if (req.body.stock) product.stock = req.body.stock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
