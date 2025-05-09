exports.getAll = (req, res) => res.json({ message: 'GET all roles' });
exports.getById = (req, res) => res.json({ message: `GET role by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE role' });
exports.update = (req, res) => res.json({ message: `UPDATE role ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE role ID: ${req.params.id}` });
