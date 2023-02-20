const User = require("../models/User")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../config")
const {validationResult} = require("express-validator")

const generateAccessToken = (id, username) => {
  const payload = {
      id,
      username
  }
  return jwt.sign(payload, config.secret, {expiresIn: config.tokenLife});
}
class AuthController {
    async registration (req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: errors})
            }
            const {username, password, email} = req.body;
            const findUsername = await User.findOne({email})
            if (findUsername) {
                return res.status(400).json({message: "this login already use"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({email, username, password: hashPassword, stars: []})
            await user.save()
            return res.json({message: "success"})
        } catch (e) {
            res.status(400).json({message: e})
        }
    }
    async login (req, res) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({message: "no registration"})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: "неверный пароль"})
            }
            const token = generateAccessToken(user._id, user.username);
            return res.json({token})
        } catch (e){
            res.status(400).json({message: "Login error"})
        }
    }
}
module.exports = new AuthController()