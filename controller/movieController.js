const User = require("../models/User");
const tokenDecoder = require("../utils/tokenDecoder")
const axios = require("axios");

class MoviesController {
    async getMovies (req, res) {
        try {
            const tokenDecode = tokenDecoder(req)
            const user = await User.findById(tokenDecode.id);
            return res.json({stars: user.stars})
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async postMovies (req, res) {
        try {
            const tokenDecode = tokenDecoder(req)
            const {stars} = req.body;
            const users = await User.findById(tokenDecode.id)
            const news = users.stars
            news.push(stars)
            const user = await User.findByIdAndUpdate(tokenDecode.id, {stars: news}, {returnDocument: "after"});
            user.save()
            return res.json({ favorite: news })
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async deleteStars (req, res) {
        try {
            const tokenDecode = tokenDecoder(req)
            const stars = req.params.id;
            const users = await User.findById(tokenDecode.id)
            const news = users.stars
            const newStars = news.filter((v) => v !== stars)
            const user = await User.findByIdAndUpdate(tokenDecode.id, {stars: newStars}, {returnDocument: "after"});
            user.save()
            return res.json({stars, user, newStars})
        } catch (e) {
            res.status(500).json(e)
        }
    }
    
}
module.exports = new MoviesController()