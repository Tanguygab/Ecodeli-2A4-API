const mongoose = require('mongoose');

const user_subscriptionSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('User_subscription', user_subscriptionSchema);
