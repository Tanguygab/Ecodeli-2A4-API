exports.getAll = (req, res) => res.json({ message: 'GET all service_providers' });
exports.getById = (req, res) => res.json({ message: `GET service_provider by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE service_provider' });
exports.update = (req, res) => res.json({ message: `UPDATE service_provider ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE service_provider ID: ${req.params.id}` });
