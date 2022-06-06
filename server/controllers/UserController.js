const User = require("../models/User");

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
    // get all data user
    static async findAllUser(req, res) {
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
            console.log(error)
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

            const id = req.param.id;
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
            const id = req.param.id;
            const data = await User.findById(id).exec();

            const deleted = await data.remove();

            return res
            .status(200)
            .json({
                data : deleted,
                message: "Success Delete Data User",
                status: "success"
        })

        } catch (error) {

        }
    }
}

module.exports = UserController;