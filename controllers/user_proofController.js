exports.getAll = (req, res) => res.json({ message: 'GET all user_proofs' });
exports.getById = (req, res) => res.json({ message: `GET user_proof by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE user_proof' });
exports.update = (req, res) => res.json({ message: `UPDATE user_proof ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE user_proof ID: ${req.params.id}` });
