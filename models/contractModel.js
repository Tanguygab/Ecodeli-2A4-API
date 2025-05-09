import { Schema, model } from 'mongoose';

const contractSchema = new Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

export default model('Contract', contractSchema);
