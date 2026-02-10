const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require("../models/product-model");

router.get("/", function(req, res){
    let error = req.flash("error");
    res.render("index", { error });
});

router.get("/shop", isLoggedIn, async function(req, res){
    let products = await productModel.find();
    let success = req.flash("success");

    res.render("shop", {
        products,
        success,
        user: req.user
    });
});

module.exports = router;