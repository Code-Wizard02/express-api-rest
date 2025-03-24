import mongoose from 'mongoose';

const marineAnimalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    species: { type: String, required: true },
    habitat: { type: String, required: true },
    lifespan: { type: Number, required: true }
});

export default mongoose.model('MarineAnimal', marineAnimalSchema);