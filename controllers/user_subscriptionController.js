exports.getAll = (req, res) => res.json({ message: 'GET all user_subscriptions' });
exports.getById = (req, res) => res.json({ message: `GET user_subscription by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE user_subscription' });
exports.update = (req, res) => res.json({ message: `UPDATE user_subscription ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE user_subscription ID: ${req.params.id}` });
