// const express = require('express')
// const app = express()

// app.use(express.json())

// app.get('/' , function(req , res){
//     res.send("hello")
// })

// app.get('/movie', (req, res) => {
//     let age = req.query.age
//   res.send("Movie page");
// });


// function checkAge(req , res , next){
//     if(age >= 18){
//         next()
//     }else{
//         res.send("Not allowed")
//     }

//     app.get('/movie' ,  checkAge , function(req , res){
//         res.send("Welcome!!!")
//     })
// }

// // app.post('/signup' , function(req , res){
// //     console.log(req.body)
// //     res.send("Signup successful")
// // })

// app.listen(3000)