exports.getAll = (req, res) => res.json({ message: 'GET all bill_buyers' });
exports.getById = (req, res) => res.json({ message: `GET bill_buyer by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE bill_buyer' });
exports.update = (req, res) => res.json({ message: `UPDATE bill_buyer ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE bill_buyer ID: ${req.params.id}` });
