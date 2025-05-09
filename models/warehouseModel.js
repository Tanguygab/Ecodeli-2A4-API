import { Schema, model } from 'mongoose';

const warehouseSchema = new Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

export default model('Warehouse', warehouseSchema);
