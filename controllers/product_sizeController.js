exports.getAll = (req, res) => res.json({ message: 'GET all product_sizes' });
exports.getById = (req, res) => res.json({ message: `GET product_size by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE product_size' });
exports.update = (req, res) => res.json({ message: `UPDATE product_size ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE product_size ID: ${req.params.id}` });
