exports.getAll = (req, res) => res.json({ message: 'GET all services' });
exports.getById = (req, res) => res.json({ message: `GET service by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE service' });
exports.update = (req, res) => res.json({ message: `UPDATE service ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE service ID: ${req.params.id}` });
