exports.getAll = (req, res) => res.json({ message: 'GET all service_actors' });
exports.getById = (req, res) => res.json({ message: `GET service_actor by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE service_actor' });
exports.update = (req, res) => res.json({ message: `UPDATE service_actor ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE service_actor ID: ${req.params.id}` });
