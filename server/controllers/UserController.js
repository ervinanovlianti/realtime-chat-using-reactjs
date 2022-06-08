const User = require("../models/User");
const {
    comparePassword
} = require("../helper/bcrypt");
const {
    generateToken
} = require("../helper/jwt");


class UserController {
    static async register(req, res) {
        try {
            const properties = {};
            properties["username"] = req.body.username;
            properties["email"] = req.body.email;
            properties["password"] = req.body.password;

            const data = await User.create(properties);

            return res.status(201)
                .json({
                    data: data,
                    message: "Success register",
                    status: "Success"
                })

        } catch (error) {
            console.log(error)
        }
    }
    // login logic
    static async login(req, res, next) {
        try {
            // cari user berdasarkan email
            const foundUser = await User.findOne({
                email: req.body.email
            }).exec();

            // user ketemu, compare(bandingkan) password dari input dengan dari function foundUser
            if (foundUser && comparePassword(req.body.password, foundUser.password)) {
                // susun payload yang akan di generate menjadi token
                // balikin access_token
                const tokenPayload = {
                    id: foundUser._id,
                    username: foundUser.username,
                    email: foundUser.email,
                }
                const access_token = generateToken(tokenPayload);
                // kembalikan token sebagai response
                return res.status(200).json({
                    data: access_token,
                    message: "sucess login",
                    status: "success",
                });

            } else {
                throw {
                    status: 400,
                    message: "Invalid Username or Password",
                };
            }
        } catch (error) {
            next(error);
        }
    }
    // get all data user
    static async findAllUser(req, res, next) {
        try {
            const data = await User.find({}).exec();

            return res
                .status(200)
                .json({
                    data: data,
                    message: "success Get Users",
                    status: "success"
                });
        } catch (error) {
            next(error)
        }
    }
    // get user data by id
    static async findById(req, res) {
        try {
            const id = req.param.id;
            const data = await User.findById(id).exec();

            return res.status(200).json({
                data: data,
                message: "Success get user by id",
                status: "success",
            })
        } catch (error) {
            console.log(error)
        }
    }
    // update user
    static async updateUser(req, res) {
        try {
            // cari data user berdasarkan id
            // dari data yang dicari, lakukan update
            // lalu save

            const id = req.loggedUser.id;
            const data = await User.findById(id).exec();

            // Updated data
            data["username"] = req.body.username ? req.bosy.username : data.username;
            data["email"] = req.body.email ? req.bosy.email : data.email;
            data["updated_date"] = new Date().toISOString();

            const updatedData = await data.save();

            return res.status(200)
                .json({
                    data: updatedData,
                    message: "Success Update Data User",
                    status: "success",
                })

        } catch (error) {
            console.log(error)
        }
    }
    //delete User
    static async deleteUser(req, res) {
        try {
            // mencari data user sesuai id
            const id = req.loggedUser.id;
            const data = await User.findById(id).exec();

            const deleted = await data.remove();

            return res
                .status(200)
                .json({
                    data: deleted,
                    message: "Success Delete Data User",
                    status: "success"
                })

        } catch (error) {

        }
    }

    static async findLoggedUser(req, res, next) {
        try {
            const id = req.loggedUser.id;
            const data = await User.findById(id).exec();
            // jika user tidak ada
            if (data === null) {
                throw {
                    status: 404,
                    message: "User Not Found",
                };
            }
            return res.status(200).json({
                data: data,
                message: "success fond logged user",
                status: "success",
            });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;