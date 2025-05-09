exports.getAll = (req, res) => res.json({ message: 'GET all permanent_reduction_package_sizes' });
exports.getById = (req, res) => res.json({ message: `GET permanent_reduction_package_size by ID: ${req.params.id}` });
exports.create = (req, res) => res.json({ message: 'CREATE permanent_reduction_package_size' });
exports.update = (req, res) => res.json({ message: `UPDATE permanent_reduction_package_size ID: ${req.params.id}` });
exports.remove = (req, res) => res.json({ message: `DELETE permanent_reduction_package_size ID: ${req.params.id}` });
