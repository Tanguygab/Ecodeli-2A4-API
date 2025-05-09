exports.getAll = (req, res) => res.json({ message: 'GET all warehouses' });
exports.getById = (req, res) => res.json({ message: `GET warehouse by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE warehouse' });
exports.update = (req, res) => res.json({ message: `UPDATE warehouse ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE warehouse ID: ${req.params.id}` });
