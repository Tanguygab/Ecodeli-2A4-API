exports.getAll = (req, res) => res.json({ message: 'GET all subscriptions' });
exports.getById = (req, res) => res.json({ message: `GET subscription by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE subscription' });
exports.update = (req, res) => res.json({ message: `UPDATE subscription ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE subscription ID: ${req.params.id}` });
