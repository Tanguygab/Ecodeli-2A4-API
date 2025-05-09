exports.getAll = (req, res) => res.json({ message: 'GET all deliverys' });
exports.getById = (req, res) => res.json({ message: `GET delivery by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE delivery' });
exports.update = (req, res) => res.json({ message: `UPDATE delivery ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE delivery ID: ${req.params.id}` });
