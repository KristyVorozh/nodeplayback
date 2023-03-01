const express = require("express")
const PORT = process.env.PORT || 3001
const authRouter = require("./router/authRouter")
const movieRouter = require("./router/movieRouter")
const reviewMovieRouter = require("./router/reviewMoviesRouter")
const tokenDecoder = require("./utils/tokenDecoder")
const cors = require('cors');
const mongoose = require("mongoose")
const app = express()
const User = require("./models/User")

app.use(express.json())
app.use(cors());
app.use("/auth", authRouter)
app.use("/movies", movieRouter)
app.use("/reviewsMovie", reviewMovieRouter)

const start = async (req, res) => {
    try {
        await mongoose.connect(`mongodb://localhost:27017`);
        const findUsername = await User.findOne({username: "review"})
        if (!findUsername) {
            const user = new User({
                username: "review",
                password: "review",
                reviewMovie: []
            })
            user.save();
        }
        if (tokenDecoder.exp < new Date()) {
            return res.status(400).json({message: "no registration"})
        }
        app.listen(PORT, () => console.log(`server start port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()