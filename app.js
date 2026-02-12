const express = require ('express')
const app = express()
const cookieParser = require('cookie-parser')
const path = require('path')
const db = require('./config/mongoose-connection')
const ownersRouter = require('./routes/ownersRouter')
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter')
require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const expressSession = require("express-session");
const flash = require("connect-flash");

const db = require('./config/mongoose-connection');
const indexRouter = require('./routes/index');
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');

app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(cookieParser())
app.use('/public' , express.static(path.join(__dirname , 'public')))
app.set('view engine' , 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET || "development_secret"
}));
app.use(flash());

app.use('/owner' , ownersRouter)//“Jab bhi URL /owner se start ho to ownersRouter ke andar jao”
app.use('/user' , usersRouter)
app.use('/product' , productsRouter)
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.listen(3000)
// Routes - FIXED: Changed to plural to match router paths
app.use('/', indexRouter);
app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.listen(3000, () => console.log("Server is running on http://localhost:3000"));