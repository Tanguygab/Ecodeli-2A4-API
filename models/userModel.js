import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

export default model('User', userSchema);
