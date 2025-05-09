exports.getAll = (req, res) => res.json({ message: 'GET all meetings' });
exports.getById = (req, res) => res.json({ message: `GET meeting by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE meeting' });
exports.update = (req, res) => res.json({ message: `UPDATE meeting ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE meeting ID: ${req.params.id}` });
