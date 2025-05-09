exports.getAll = (req, res) => res.json({ message: 'GET all package_sizes' });
exports.getById = (req, res) => res.json({ message: `GET package_size by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE package_size' });
exports.update = (req, res) => res.json({ message: `UPDATE package_size ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE package_size ID: ${req.params.id}` });
