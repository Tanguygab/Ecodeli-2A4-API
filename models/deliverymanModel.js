const mongoose = require('mongoose');

const deliverymanSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('Deliveryman', deliverymanSchema);
