const mongoose = require('mongoose');

const receiverSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Receiver', receiverSchema);
