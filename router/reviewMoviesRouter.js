const Router = require("express")
const router = new Router()
const controller = require("../controller/reviewMovieController")
const authMiddleware = require("../middlewaree/authMiddleware")

router.post("/", authMiddleware, controller.postMoviesReview)
router.get("/:filmId", controller.getReviewsMovie)
module.exports = router;