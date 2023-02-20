const User = require("../models/User");
const tokenDecoder = require("../utils/tokenDecoder")
class ReviewMovieController {
    async getReviewsMovie (req, res) {
        try {
            const filmId = req.params.filmId;
            const page = req.query.page;
            const limit = 10
            const startIndex = (Number(page) - 1) * limit
            const endIndex = Number(page) * limit
            const users = await User.findOne({username: "review"})
            const foundReview = users.reviewMovie.find((v) => v.filmId === filmId)
            const result = foundReview.reviewMovieArray.slice(startIndex, endIndex)
            res.json({foundReview: result, limit: foundReview.reviewMovieArray.length, page: Number(page)})
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async postMoviesReview (req, res) {
        try {
            const {review, name, filmId} = req.body;
            const users = await User.findOne({username: "review"})
            const reviewMovieUser = users.reviewMovie
            const reviewMovieArray = []
            const startIndex = 0
            const endIndex = 10
            let check = false;
            reviewMovieArray.push({name, review})
            if (reviewMovieUser.length > 0) {
                reviewMovieUser.forEach((v) => {
                    if (v.filmId === filmId) {
                        check = true
                        return v.reviewMovieArray.push({name, review})
                    }
                })
                if (!check) {
                    reviewMovieUser.push({filmId: filmId, reviewMovieArray: [{name, review}]})
                }
            } else {
                reviewMovieUser.push({filmId: filmId, reviewMovieArray: [{name, review}]})
            }
            const user = await User.findOneAndUpdate({username: "review"}, {reviewMovie: reviewMovieUser}, {returnDocument: "after"});
            user.save()
            const foundReview = user.reviewMovie.find((v) => v.filmId === filmId)
            const result = foundReview.reviewMovieArray.slice(startIndex, endIndex)
            return res.json({foundReview: result})
        } catch (e) {
            res.status(500).json(e)
        }
    }
}
module.exports = new ReviewMovieController()