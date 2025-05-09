import { Schema, model } from 'mongoose';

const proofSchema = new Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

export default model('Proof', proofSchema);
