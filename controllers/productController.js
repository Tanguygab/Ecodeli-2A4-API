exports.getAll = (req, res) => res.json({ message: 'GET all products' });
exports.getById = (req, res) => res.json({ message: `GET product by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE product' });
exports.update = (req, res) => res.json({ message: `UPDATE product ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE product ID: ${req.params.id}` });
