exports.getAll = (req, res) => res.json({ message: 'GET all delivery_statuss' });
exports.getById = (req, res) => res.json({ message: `GET delivery_status by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE delivery_status' });
exports.update = (req, res) => res.json({ message: `UPDATE delivery_status ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE delivery_status ID: ${req.params.id}` });
