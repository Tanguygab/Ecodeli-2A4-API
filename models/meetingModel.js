import { Schema, model } from 'mongoose';

const meetingSchema = new Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

export default model('Meeting', meetingSchema);
