const User = require("../models/User");
const {
    verifyToken
} = require("../helper/jwt");

const userAuthentication = async (req, rest, next) => {
    try {
        // fungsi verify token untuk menerjemahkan / decode token jwt yang dikirim dari header
        const decoded = verifyToken(req.headers.access_token);
        const found = await User.findById(decoded.id).exec();

        if (found) {
            // assign kedalam paramater req user yang sedang login
            req["loggedUser"] = decoded;
            next();
        } else {
            throw {
                status: 401,
                message: "Unauthorized",
            };
        }

    } catch (error) {
        next(error)
    }
}

module.exports = {
    userAuthentication,
};