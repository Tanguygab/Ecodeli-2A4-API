import { Schema, model } from 'mongoose';

const notificationSchema = new Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

export default model('Notification', notificationSchema);
