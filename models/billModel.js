import { Schema, model } from 'mongoose';

const billSchema = new Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

export default model('Bill', billSchema);
