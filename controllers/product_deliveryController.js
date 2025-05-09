exports.getAll = (req, res) => res.json({ message: 'GET all product_deliverys' });
exports.getById = (req, res) => res.json({ message: `GET product_delivery by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE product_delivery' });
exports.update = (req, res) => res.json({ message: `UPDATE product_delivery ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE product_delivery ID: ${req.params.id}` });
