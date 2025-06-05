import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    nombre: { type: String },
    descripcion: { type: String },
    precio: { type: Number },
    categoria: { type: String },
    imagen: { type: String },
    stock: { type: Number },
    vendedor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Product', productSchema);