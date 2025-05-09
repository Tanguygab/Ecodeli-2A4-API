exports.getAll = (req, res) => res.json({ message: 'GET all user_locations' });
exports.getById = (req, res) => res.json({ message: `GET user_location by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE user_location' });
exports.update = (req, res) => res.json({ message: `UPDATE user_location ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE user_location ID: ${req.params.id}` });
