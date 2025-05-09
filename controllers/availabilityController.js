exports.getAll = (req, res) => res.json({ message: 'GET all availabilitys' });
exports.getById = (req, res) => res.json({ message: `GET availability by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE availability' });
exports.update = (req, res) => res.json({ message: `UPDATE availability ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE availability ID: ${req.params.id}` });
