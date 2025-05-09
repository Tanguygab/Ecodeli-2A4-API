import User from "./models/user.js";

export async function getLastId(model) {
    const lastId = await model.findOne().sort({ _id: -1 });
    return lastId === null ? 0 : lastId._id;
}

export function error(response, error, statusCode = 400) {
    response.status(statusCode).json({error: "error." + error});
}

export async function validToken(request, response) {
    const auth = request.headers?.authorization?.split(" ");
    let user;
    if (auth !== undefined && auth.length === 2 && auth[0] === "Bearer" && (user = await User.findOne({ token: auth[1] })) !== null) return user;

    error(response, "Invalid Token", 401)
    return null;
}

export function invalidString(string) {
    return string === undefined || string === null || string === "";
}

export function searchQuery(request, option = "name") {
    const string = request.query[option];
    const options = {};
    if (!invalidString(string)) options[option] = { $regex: "(?i)" + string.trim() };
    return options;
}
