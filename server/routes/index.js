const router = require("express").Router();
const UserController = require("../controllers/UserController");
const User = require("../models/User");

router.route("/api/v1").get((req, res) => {
    res.send("connected!");
});

//registrasi akun baru
router.route("/api/v1/register").post(UserController.register);
// route untuk get all data user
router.route("/api/v1/users").get(UserController.findAllUser);
// route untuk get data user by id
router.route("/api/v1/users/:id")
    .get(UserController.findById)
    .put(UserController.updateUser)
    .delete(UserController.deleteUser);

module.exports = router;