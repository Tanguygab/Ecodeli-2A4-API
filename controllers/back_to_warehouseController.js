exports.getAll = (req, res) => res.json({ message: 'GET all back_to_warehouses' });
exports.getById = (req, res) => res.json({ message: `GET back_to_warehouse by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE back_to_warehouse' });
exports.update = (req, res) => res.json({ message: `UPDATE back_to_warehouse ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE back_to_warehouse ID: ${req.params.id}` });
