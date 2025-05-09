exports.getAll = (req, res) => res.json({ message: 'GET all product_requests' });
exports.getById = (req, res) => res.json({ message: `GET product_request by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE product_request' });
exports.update = (req, res) => res.json({ message: `UPDATE product_request ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE product_request ID: ${req.params.id}` });
