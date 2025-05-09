const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Availability', availabilitySchema);
