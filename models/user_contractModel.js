const mongoose = require('mongoose');

const user_contractSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('User_contract', user_contractSchema);
