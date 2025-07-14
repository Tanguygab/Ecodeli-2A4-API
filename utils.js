import User from "./models/user.js";
import Product from './models/product.js'

export async function getLastId(model) {
    const lastId = await model.findOne().sort({ _id: -1 });
    return lastId === null ? 0 : lastId._id;
}

export function error(response, error, statusCode = 400) {
    response.status(statusCode).json({error: "error." + error});
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
    if (auth !== undefined && auth.length === 2 && auth[0] === "Bearer"
        && (user = await User.findOne({ token: auth[1] }).populate("role").populate("subscription")) !== null) return user;

    error(response, "invalid-token", 401)
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
