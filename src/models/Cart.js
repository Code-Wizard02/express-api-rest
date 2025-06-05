import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  comprador: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productos: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      cantidad: { type: Number, default: 1 },
    },
  ],
  pagado: { type: Boolean, default: false },
});

export default mongoose.model("Cart", cartSchema);
