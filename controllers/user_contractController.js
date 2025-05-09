exports.getAll = (req, res) => res.json({ message: 'GET all user_contracts' });
exports.getById = (req, res) => res.json({ message: `GET user_contract by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE user_contract' });
exports.update = (req, res) => res.json({ message: `UPDATE user_contract ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE user_contract ID: ${req.params.id}` });
