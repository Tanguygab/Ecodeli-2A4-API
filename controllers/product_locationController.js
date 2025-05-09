exports.getAll = (req, res) => res.json({ message: 'GET all product_locations' });
exports.getById = (req, res) => res.json({ message: `GET product_location by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE product_location' });
exports.update = (req, res) => res.json({ message: `UPDATE product_location ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE product_location ID: ${req.params.id}` });
