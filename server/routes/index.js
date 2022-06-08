const router = require("express").Router();
const UserController = require("../controllers/UserController");
const User = require("../models/User");
const {
    userAuthentication
} = require("../middlewares/auth")

router.route("/api/v1").get((req, res) => {
    res.send("connected!");
});

//registrasi akun baru
router.route("/api/v1/register").post(UserController.register);
// login akun yang sudah terdaftar
router.route("/api/v1/login").post(UserController.login);
// route untuk get all data user
router.route("/api/v1/users")
    .get(userAuthentication, UserController.findAllUser)

// route untuk get data user by id
router.route("/api/v1/users/:id")
    .get(userAuthentication, UserController.findById)
router.route("/api/v1/user")
    .get(userAuthentication, UserController.findLoggedUser)
    .put(userAuthentication, UserController.updateUser)
    .delete(userAuthentication, UserController.deleteUser);


module.exports = router;