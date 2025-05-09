exports.getAll = (req, res) => res.json({ message: 'GET all notifications' });
exports.getById = (req, res) => res.json({ message: `GET notification by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE notification' });
exports.update = (req, res) => res.json({ message: `UPDATE notification ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE notification ID: ${req.params.id}` });
