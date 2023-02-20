const  {Schema, model} = require("mongoose")

const User = new Schema({
    email: {type: String, require: true, isUnique: true},
    username: {type: String},
    password: {type: String, require: true},
    stars: {type: Array, require: true},
    reviewMovie: {type: Array}
})

module.exports = model("User", User)