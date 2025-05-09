exports.getAll = (req, res) => res.json({ message: 'GET all delivery_locations' });
exports.getById = (req, res) => res.json({ message: `GET delivery_location by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE delivery_location' });
exports.update = (req, res) => res.json({ message: `UPDATE delivery_location ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE delivery_location ID: ${req.params.id}` });
