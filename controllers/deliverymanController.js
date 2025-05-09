exports.getAll = (req, res) => res.json({ message: 'GET all deliverymans' });
exports.getById = (req, res) => res.json({ message: `GET deliveryman by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE deliveryman' });
exports.update = (req, res) => res.json({ message: `UPDATE deliveryman ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE deliveryman ID: ${req.params.id}` });
