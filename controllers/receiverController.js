exports.getAll = (req, res) => res.json({ message: 'GET all receivers' });
exports.getById = (req, res) => res.json({ message: `GET receiver by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE receiver' });
exports.update = (req, res) => res.json({ message: `UPDATE receiver ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE receiver ID: ${req.params.id}` });
