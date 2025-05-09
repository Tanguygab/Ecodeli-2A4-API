import { Schema, model } from 'mongoose';

const availabilitySchema = new Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

export default model('Availability', availabilitySchema);
