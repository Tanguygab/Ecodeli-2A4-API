exports.getAll = (req, res) => res.json({ message: 'GET all product_delivery_statuss' });
exports.getById = (req, res) => res.json({ message: `GET product_delivery_status by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE product_delivery_status' });
exports.update = (req, res) => res.json({ message: `UPDATE product_delivery_status ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE product_delivery_status ID: ${req.params.id}` });
