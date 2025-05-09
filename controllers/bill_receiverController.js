exports.getAll = (req, res) => res.json({ message: 'GET all bill_receivers' });
exports.getById = (req, res) => res.json({ message: `GET bill_receiver by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE bill_receiver' });
exports.update = (req, res) => res.json({ message: `UPDATE bill_receiver ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE bill_receiver ID: ${req.params.id}` });
