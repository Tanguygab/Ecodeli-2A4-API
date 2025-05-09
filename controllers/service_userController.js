exports.getAll = (req, res) => res.json({ message: 'GET all service_users' });
exports.getById = (req, res) => res.json({ message: `GET service_user by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE service_user' });
exports.update = (req, res) => res.json({ message: `UPDATE service_user ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE service_user ID: ${req.params.id}` });
