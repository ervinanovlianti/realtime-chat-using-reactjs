const bcrypt = require("bcryptjs")
const SALT = 10;

const hashPassword = (password) => {
    return bcrypt.hashSync(password, SALT);
};

const comparePassword = (password, password_db) => {
    return bcrypt.compareSync(password, password_db);

};

module.exports = {
    hashPassword,
    comparePassword,
};