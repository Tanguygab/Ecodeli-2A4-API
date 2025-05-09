exports.getAll = (req, res) => res.json({ message: 'GET all product_requesteds' });
exports.getById = (req, res) => res.json({ message: `GET product_requested by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE product_requested' });
exports.update = (req, res) => res.json({ message: `UPDATE product_requested ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE product_requested ID: ${req.params.id}` });
