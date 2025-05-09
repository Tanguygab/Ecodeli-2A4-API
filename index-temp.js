const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// === Routes API (test, sans DB) ===
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/roles', require('./routes/roleRoutes'));
app.use('/api/user_roles', require('./routes/user_roleRoutes'));
app.use('/api/contracts', require('./routes/contractRoutes'));
app.use('/api/user_contracts', require('./routes/user_contractRoutes'));
app.use('/api/availabilities', require('./routes/availabilityRoutes'));
app.use('/api/user_availabilities', require('./routes/user_availabilityRoutes'));
app.use('/api/proofs', require('./routes/proofRoutes'));
app.use('/api/user_proofs', require('./routes/user_proofRoutes'));
app.use('/api/deliverymen', require('./routes/deliverymanRoutes'));
app.use('/api/sellers', require('./routes/sellerRoutes'));
app.use('/api/receivers', require('./routes/receiverRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/user_notifications', require('./routes/user_notificationRoutes'));
app.use('/api/bills', require('./routes/billRoutes'));
app.use('/api/bill_buyers', require('./routes/bill_buyerRoutes'));
app.use('/api/bill_receivers', require('./routes/bill_receiverRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/service_users', require('./routes/service_userRoutes'));
app.use('/api/service_providers', require('./routes/service_providerRoutes'));
app.use('/api/service_actors', require('./routes/service_actorRoutes'));
app.use('/api/meetings', require('./routes/meetingRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/product_sizes', require('./routes/product_sizeRoutes'));
app.use('/api/product_locations', require('./routes/product_locationRoutes'));
app.use('/api/product_requests', require('./routes/product_requestRoutes'));
app.use('/api/product_requesteds', require('./routes/product_requestedRoutes'));
app.use('/api/product_deliveries', require('./routes/product_deliveryRoutes'));
app.use('/api/product_delivery_statuses', require('./routes/product_delivery_statusRoutes'));
app.use('/api/subscriptions', require('./routes/subscriptionRoutes'));
app.use('/api/user_subscriptions', require('./routes/user_subscriptionRoutes'));
app.use('/api/user_locations', require('./routes/user_locationRoutes'));
app.use('/api/package_sizes', require('./routes/package_sizeRoutes'));
app.use('/api/permanent_reduction_package_sizes', require('./routes/permanent_reduction_package_sizeRoutes'));
app.use('/api/warehouses', require('./routes/warehouseRoutes'));
app.use('/api/warehouse_locations', require('./routes/warehouse_locationRoutes'));
app.use('/api/back_to_warehouses', require('./routes/back_to_warehouseRoutes'));
app.use('/api/deliveries', require('./routes/deliveryRoutes'));
app.use('/api/delivery_locations', require('./routes/delivery_locationRoutes'));
app.use('/api/delivery_statuses', require('./routes/delivery_statusRoutes'));

// Route principale de test
app.get('/', (req, res) => {
  res.send('API EcoDeli (mode test sans MongoDB)');
});

// Lancer le serveur sur toutes les interfaces pour accès réseau local
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
