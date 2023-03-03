const Router = require("express")
const router = new Router()
const controller = require("../controller/authControler")
const {check} = require("express-validator");

router.post("/reg", [
    check('email', "Имя пользователя не может быть пустым").notEmpty(),
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "password need more 4 and less 10").isLength({min: 6})
], controller.registration)
router.post("/login", controller.login)

module.exports = router;