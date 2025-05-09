exports.getAll = (req, res) => res.json({ message: 'GET all contracts' });
exports.getById = (req, res) => res.json({ message: `GET contract by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE contract' });
exports.update = (req, res) => res.json({ message: `UPDATE contract ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE contract ID: ${req.params.id}` });
