exports.getAll = (req, res) => res.json({ message: 'GET all user_availabilitys' });
exports.getById = (req, res) => res.json({ message: `GET user_availability by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE user_availability' });
exports.update = (req, res) => res.json({ message: `UPDATE user_availability ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE user_availability ID: ${req.params.id}` });
