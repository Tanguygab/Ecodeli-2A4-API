import { Schema, model } from 'mongoose';

const serviceSchema = new Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

export default model('Service', serviceSchema);
