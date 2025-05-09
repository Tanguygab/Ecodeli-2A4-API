const mongoose = require('mongoose');

const user_locationSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('User_location', user_locationSchema);
