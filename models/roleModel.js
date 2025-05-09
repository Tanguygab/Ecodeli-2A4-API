import { Schema, model } from 'mongoose';

const roleSchema = new Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

export default model('Role', roleSchema);
