import User from "./models/user.js";
import jwt from 'jsonwebtoken'; // AJOUT de l'import JWT

export async function getLastId(model) {
    const lastId = await model.findOne().sort({ _id: -1 });
    return lastId === null ? 0 : lastId._id;
}

export function error(response, errorMsg, statusCode = 400) {
    // CORRECTION : retirer le préfixe "error." qui cause des problèmes
    response.status(statusCode).json({error: errorMsg});
}

export async function find(res, model, id, errorMsg) {
    const found = await model.findOne({_id: id});
    if (found === null) {
        error(res, errorMsg, 404);
        return null;
    }
    return found;
}

export async function validToken(request, response) {
    const auth = request.headers?.authorization?.split(" ");
    let user;
    
    // OPTION 1: Si vous utilisez JWT (recommandé)
    if (auth !== undefined && auth.length === 2 && auth[0] === "Bearer") {
        try {
            const decoded = jwt.verify(auth[1], process.env.JWT_SECRET || 'your-secret-key');
            user = await User.findOne({ _id: decoded.userId }).populate("role").populate("subscription");
            if (user !== null) return user;
        } catch (err) {
            console.error('JWT verification failed:', err);
        }
    }
    
    // OPTION 2: Si vous utilisez encore le système de token simple (à garder pour compatibilité)
    if (auth !== undefined && auth.length === 2 && auth[0] === "Bearer"
        && (user = await User.findOne({ token: auth[1] }).populate("role").populate("subscription")) !== null) {
        return user;
    }

    error(response, "invalid-token", 401);
    return null;
}

export function invalidString(string) {
    return string === undefined || string === null || string === "";
}

export function searchQuery(request, query = "name", field = "name") {
    const string = request.query[query];
    const options = {};
    if (!invalidString(string)) options[field] = { $regex: "(?i)" + string.trim() };
    return options;
}
