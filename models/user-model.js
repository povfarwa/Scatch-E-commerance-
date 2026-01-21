const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullname : {
        type : String,
        minlenght : 3,
        trim : true
    },
    email : String,
    password : String,
    cart : {
         type : Array,
        default : []
    },
    isadmin : Boolean, // (agr wo admin hoga to product create kr sake ga aur agr nhi hoga to sirf product buy kr sake ga)
    orders : {
        type : Array,
        default : []
    },
    contact : Number,
    picture : String
})

module.exports = mongoose.model("user" , userSchema)