import { connect } from "mongoose";
import Role from './models/role.js';
import Subscription from './models/subscription.js';
import PackageSize from './models/package_size.js';
import DeliveryStatus from './models/delivery_status.js';
import Postannoucement from './models/postannoucement.js';

// Variables d'environnement par défaut si non définies
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || 'ecodeli';
const DB_HOST = process.env.DB_HOST || 'localhost';

async function seedDatabase() {
    try {
        // Connexion à MongoDB
        await connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);
        console.log(" MongoDB connected for seeding");

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
        console.log(" Roles seeded successfully");

        // Seed Subscriptions
        console.log(" Seeding Subscriptions...");
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
        console.log(" Package sizes seeded successfully");

        // Seed Delivery Statuses
        console.log(" Seeding Delivery Statuses...");
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

        // Seed Postannoucements (sample data)
        console.log(" Seeding Postannoucements...");
        const postannoucements = [
            {
                _id: 1,
                firstname: "Jean",
                lastname: "Dupont",
                email: "jean.dupont@email.com",
                phone: "0601020304",
                justificatif: "/uploads/sample-justificatif1.pdf",
                status: "pending",
                submission_date: new Date("2025-07-10")
            },
            {
                _id: 2,
                firstname: "Marie",
                lastname: "Martin",
                email: "marie.martin@email.com",
                phone: "0605060708",
                justificatif: "/uploads/sample-justificatif2.pdf",
                status: "accepted",
                submission_date: new Date("2025-07-08"),
                reviewed_by: 2,
                reviewed_date: new Date("2025-07-12"),
                notes: "Candidature acceptée - Profil excellent"
            },
            {
                _id: 3,
                firstname: "Pierre",
                lastname: "Durand",
                email: "pierre.durand@email.com",
                phone: "0609101112",
                justificatif: "/uploads/sample-justificatif3.pdf",
                status: "rejected",
                submission_date: new Date("2025-07-05"),
                reviewed_by: 2,
                reviewed_date: new Date("2025-07-11"),
                notes: "Justificatifs insuffisants"
            }
        ];

        for (const postannoucement of postannoucements) {
            await Postannoucement.findOneAndUpdate(
                { _id: postannoucement._id },
                postannoucement,
                { upsert: true, new: true }
            );
        }
        console.log(" Postannoucements seeded successfully");

        console.log(" Database seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error(" Error seeding database:", error);
        process.exit(1);
    }
}

seedDatabase();