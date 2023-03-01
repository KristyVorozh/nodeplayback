const Router = require("express")
const router = new Router()
const controller = require("../controller/movieController")
const authMiddleware = require("../middlewaree/authMiddleware")
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));
router.post("/stars", authMiddleware, controller.postMovies)
router.get("/", authMiddleware, controller.getMovies)
router.delete("/stars/:id", authMiddleware, controller.deleteStars)
router.get(`/search/:id`, async function (req, res) {
    const id = req.params.id;
    const url =
        `https://videocdn.tv/api/short?api_token=Olc1X1htWbIZ3jBtaPnnqvHVFv7TJHOz&kinopoisk_id=${id}`;
    const options = {
        method: 'GET',
    };
    fetch(url, options)
        .then(res => res.json())
    try {
        let response = await fetch(url, options);
        response = await response.json();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({msg: `Internal Server Error.`});
    }
});
module.exports = router;
