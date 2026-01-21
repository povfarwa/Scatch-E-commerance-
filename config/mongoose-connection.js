const mongoose = require('mongoose')

mongoose
.connect("mongodb://localhost:27017/Scatch")
.then(function(){
    console.log("Mongoose connected successfully")
})
.catch(function(err){
    console.log(err)
})

module.exports = mongoose.connection