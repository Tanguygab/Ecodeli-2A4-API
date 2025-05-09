exports.getAll = (req, res) => res.json({ message: 'GET all user_notifications' });
exports.getById = (req, res) => res.json({ message: `GET user_notification by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE user_notification' });
exports.update = (req, res) => res.json({ message: `UPDATE user_notification ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE user_notification ID: ${req.params.id}` });
