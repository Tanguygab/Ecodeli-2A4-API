exports.getAll = (req, res) => res.json({ message: 'GET all bills' });
exports.getById = (req, res) => res.json({ message: `GET bill by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE bill' });
exports.update = (req, res) => res.json({ message: `UPDATE bill ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE bill ID: ${req.params.id}` });
