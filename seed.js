import { connect } from "mongoose";
import Role from './models/role.js';
import Subscription from './models/subscription.js';
import PackageSize from './models/package_size.js';
import DeliveryStatus from './models/delivery_status.js';
import User from './models/user.js';
import { genSalt, hash } from 'bcryptjs';

// Variables d'environnement par défaut si non définies
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || 'ecodeli';
const DB_HOST = process.env.DB_HOST || 'localhost';

async function seedDatabase() {
    try {
        // Connexion à MongoDB
        await connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);
        console.log("MongoDB connected for seeding");

        // Seed Roles
        console.log(" Seeding Roles...");
        const roles = [
            { _id: 1, name: "user", access_level: 1 },
            { _id: 2, name: "admin", access_level: 10 },
            { _id: 3, name: "deliveryman", access_level: 5 },
            { _id: 4, name: "merchant", access_level: 3 },
            { _id: 5, name: "service_provider", access_level: 3 }
        ];

        for (const role of roles) {
            await Role.findOneAndUpdate(
                { _id: role._id },
                role,
                { upsert: true, new: true }
            );
        }
        console.log("Roles seeded successfully");

        // Seed Subscriptions
        console.log("Seeding Subscriptions...");
        const subscriptions = [
            {
                _id: 1,
                name: "free",
                color: "#gray",
                price: 0,
                assurance_max: 0,
                assurance_bonus: 0,
                first_delivery_free_below: 0,
                delivery_reduction: 0,
                free_delivery_priority_per_month: 0,
                delivery_priority: 15,
                permanent_reduction: 0
            },
            {
                _id: 2,
                name: "starter",
                color: "#blue",
                price: 9.90,
                assurance_max: 115,
                assurance_bonus: 0,
                first_delivery_free_below: 0,
                delivery_reduction: 5,
                free_delivery_priority_per_month: 0,
                delivery_priority: 15,
                permanent_reduction: 5
            },
            {
                _id: 3,
                name: "premium",
                color: "#gold",
                price: 19.99,
                assurance_max: 3000,
                assurance_bonus: 75,
                first_delivery_free_below: 150,
                delivery_reduction: 9,
                free_delivery_priority_per_month: 3,
                delivery_priority: 5,
                permanent_reduction: 5
            }
        ];

        for (const sub of subscriptions) {
            await Subscription.findOneAndUpdate(
                { _id: sub._id },
                sub,
                { upsert: true, new: true }
            );
        }
        console.log(" Subscriptions seeded successfully");

        // Seed Package Sizes
        console.log(" Seeding Package Sizes...");
        const packageSizes = [
            { _id: 1, name: "S", size: 1 },
            { _id: 2, name: "M", size: 2 },
            { _id: 3, name: "L", size: 3 },
            { _id: 4, name: "XL", size: 4 },
            { _id: 5, name: "XXL", size: 5 }
        ];

        for (const size of packageSizes) {
            await PackageSize.findOneAndUpdate(
                { _id: size._id },
                size,
                { upsert: true, new: true }
            );
        }
        console.log("Package sizes seeded successfully");

        // Seed Delivery Statuses
        console.log("🔧 Seeding Delivery Statuses...");
        const deliveryStatuses = [
            { _id: 1, name: "pending" },
            { _id: 2, name: "accepted" },
            { _id: 3, name: "in_progress" },
            { _id: 4, name: "delivered" },
            { _id: 5, name: "cancelled" }
        ];

        for (const status of deliveryStatuses) {
            await DeliveryStatus.findOneAndUpdate(
                { _id: status._id },
                status,
                { upsert: true, new: true }
            );
        }
        console.log(" Delivery statuses seeded successfully");

        // Seed Test User
        console.log(" Seeding Test User...");
        const existingUser = await User.findOne({ email: "test@ecodeli.fr" });
        if (!existingUser) {
            const salt = await genSalt();
            const hashedPassword = await hash("123456", salt);
            
            await User.create({
                _id: 1,
                firstname: "Test",
                name: "User",
                email: "test@ecodeli.fr",
                password: hashedPassword,
                join_date: new Date(),
                birthday: new Date("1990-01-01"),
                description: "Utilisateur de test",
                tutorial: false,
                approved: true,
                role: 1, // user role
                subscription: 1 // free subscription
            });
            console.log(" Test user created: test@ecodeli.fr / 123456");
        } else {
            console.log(" Test user already exists");
        }

        // Seed Admin User
        console.log(" Seeding Admin User...");
        const existingAdmin = await User.findOne({ email: "admin@ecodeli.fr" });
        if (!existingAdmin) {
            const salt = await genSalt();
            const hashedPassword = await hash("admin123", salt);
            
            await User.create({
                _id: 2,
                firstname: "Admin",
                name: "EcoDeli",
                email: "admin@ecodeli.fr",
                password: hashedPassword,
                join_date: new Date(),
                birthday: new Date("1985-01-01"),
                description: "Administrateur système",
                tutorial: false,
                approved: true,
                role: 2, // admin role
                subscription: 3 // premium subscription
            });
            console.log(" Admin user created: admin@ecodeli.fr / admin123");
        } else {
            console.log(" Admin user already exists");
        }

        console.log("\n Database seeded successfully!");
        console.log(" Test accounts created:");
        console.log("    User: test@ecodeli.fr / 123456");
        console.log("    Admin: admin@ecodeli.fr / admin123");
        process.exit(0);
    } catch (error) {
        console.error(" Error seeding database:", error);
        process.exit(1);
    }
}

seedDatabase();