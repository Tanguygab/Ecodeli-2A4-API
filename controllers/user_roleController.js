exports.getAll = (req, res) => res.json({ message: 'GET all user_roles' });
exports.getById = (req, res) => res.json({ message: `GET user_role by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE user_role' });
exports.update = (req, res) => res.json({ message: `UPDATE user_role ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE user_role ID: ${req.params.id}` });
