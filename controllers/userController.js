exports.getAll = (req, res) => res.json({ message: 'GET all users' });
exports.getById = (req, res) => res.json({ message: `GET user by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE user' });
exports.update = (req, res) => res.json({ message: `UPDATE user ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE user ID: ${req.params.id}` });
