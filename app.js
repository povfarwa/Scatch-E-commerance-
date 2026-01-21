const express = require ('express')
const app = express()
const cookieParser = require('cookie-parser')
const path = require('path')
const db = require('./config/mongoose-connection')
const ownersRouter = require('./routes/ownersRouter')
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter')


app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(cookieParser())
app.use('/public' , express.static(path.join(__dirname , 'public')))
app.set('view engine' , 'ejs')

app.use('/owner' , ownersRouter)//“Jab bhi URL /owner se start ho to ownersRouter ke andar jao”
app.use('/user' , usersRouter)
app.use('/product' , productsRouter)

app.listen(3000)
