import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

export default model('Product', productSchema);
