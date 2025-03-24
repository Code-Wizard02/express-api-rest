import express from 'express';
import MarineAnimal from '../models/MarineAnimal.js';

const router = express.Router();

// GET - Obtener todos los animales marinos
router.get('/', async (req, res) => {
    try {
        const animals = await MarineAnimal.find();
        res.json(animals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Crear un nuevo animal marino
router.post('/', async (req, res) => {
    try {
        const animal = new MarineAnimal({
            name: req.body.name,
            species: req.body.species,
            habitat: req.body.habitat,
            lifespan: req.body.lifespan
        });
        const savedAnimal = await animal.save();
        res.status(201).json(savedAnimal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET - Obtener animal por ID
router.get('/:id', async (req, res) => {
    try {
        const animal = await MarineAnimal.findById(req.params.id);
        if (!animal) return res.status(404).json({ message: 'Animal no encontrado' });
        res.json(animal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT - Actualizar animal
router.put('/:id', async (req, res) => {
    try {
        const animal = await MarineAnimal.findById(req.params.id);
        if (!animal) return res.status(404).json({ message: 'Animal no encontrado' });

        animal.name = req.body.name || animal.name;
        animal.species = req.body.species || animal.species;
        animal.habitat = req.body.habitat || animal.habitat;
        animal.lifespan = req.body.lifespan || animal.lifespan;

        const updatedAnimal = await animal.save();
        res.json(updatedAnimal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE - Eliminar animal
router.delete('/:id', async (req, res) => {
    try {
        const animal = await MarineAnimal.findByIdAndDelete(req.params.id);
        if (!animal) return res.status(404).json({ message: 'Animal no encontrado' });
        res.json({ message: 'Animal eliminado', animal });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;