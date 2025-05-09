const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
