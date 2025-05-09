exports.getAll = (req, res) => res.json({ message: 'GET all warehouse_locations' });
exports.getById = (req, res) => res.json({ message: `GET warehouse_location by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE warehouse_location' });
exports.update = (req, res) => res.json({ message: `UPDATE warehouse_location ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE warehouse_location ID: ${req.params.id}` });
