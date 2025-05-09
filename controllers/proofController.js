exports.getAll = (req, res) => res.json({ message: 'GET all proofs' });
exports.getById = (req, res) => res.json({ message: `GET proof by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE proof' });
exports.update = (req, res) => res.json({ message: `UPDATE proof ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE proof ID: ${req.params.id}` });
