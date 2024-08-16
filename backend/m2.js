const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:String,
    age:Number
})


const Users = mongoose.model("Users",userSchema)

module.exports = Users