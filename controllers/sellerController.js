exports.getAll = (req, res) => res.json({ message: 'GET all sellers' });
exports.getById = (req, res) => res.json({ message: `GET seller by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE seller' });
exports.update = (req, res) => res.json({ message: `UPDATE seller ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE seller ID: ${req.params.id}` });
