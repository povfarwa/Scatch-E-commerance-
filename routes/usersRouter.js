const express = require('express');
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const userModel = require("../models/user-model");
const productModel = require("../models/product-model");

// Sirf ek baar require karein aur saare functions nikaal lein
const { 
    registerUser, 
    loginUser, 
    logout 
} = require("../controllers/authController");

router.get('/', function(req, res){
    res.send("hey");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logout);

// Add to cart route
router.get("/cart/:productid", isLoggedIn, async function(req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        user.cart.push(req.params.productid);
        await user.save();
        req.flash("success", "Added to cart successfully!");
        res.redirect("/shop");
    } catch (err) {
        console.error("Add to cart error:", err);
        req.flash("error", "Failed to add to cart");
        res.redirect("/shop");
    }
});

// Remove from cart route
router.get("/removefromcart/:productid", isLoggedIn, async function(req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        user.cart = user.cart.filter(item => item.toString() !== req.params.productid);
        await user.save();
        res.redirect("/users/cart");
    } catch (err) {
        console.error("Remove from cart error:", err);
        res.redirect("/users/cart");
    }
});

router.get("/cart", isLoggedIn, async function(req, res) {
    try {
        let user = await userModel
            .findOne({ email: req.user.email })
            .populate("cart");
        
        res.render("cart", { user: user }); 
    } catch (err) {
        console.error("Cart error:", err);
        res.render("cart", { user: req.user });
    }
});

module.exports = router;
