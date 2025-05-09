const mongoose = require('mongoose');

const bill_receiverSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Bill_receiver', bill_receiverSchema);
