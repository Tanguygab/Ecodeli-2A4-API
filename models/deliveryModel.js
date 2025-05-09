import { Schema, model } from 'mongoose';

const deliverySchema = new Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

export default model('Delivery', deliverySchema);
