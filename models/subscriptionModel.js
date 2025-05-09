import { Schema, model } from 'mongoose';

const subscriptionSchema = new Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

export default model('Subscription', subscriptionSchema);
