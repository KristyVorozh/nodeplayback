const Router = require("express")
const router = new Router()
const controller = require("../controller/movieController")
const authMiddleware = require("../middlewaree/authMiddleware")

router.post("/stars", authMiddleware, controller.postMovies)
router.get("/", authMiddleware, controller.getMovies)
router.delete("/stars/:id", authMiddleware, controller.deleteStars)
module.exports = router;