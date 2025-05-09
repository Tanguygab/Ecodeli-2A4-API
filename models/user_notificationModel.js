const mongoose = require('mongoose');

const user_notificationSchema = new mongoose.Schema({
  // TODO: Définir le schéma
}, { timestamps: true });

module.exports = mongoose.model('User_notification', user_notificationSchema);
