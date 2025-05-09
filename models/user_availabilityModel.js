const mongoose = require('mongoose');

const user_availabilitySchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('User_availability', user_availabilitySchema);
