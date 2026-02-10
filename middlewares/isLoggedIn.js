const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function(req, res, next) {
    if(!req.cookies.token) {
        req.flash("error", "You need to login first");
        return res.redirect("/");
    }

    try {
        // FIXED: Changed JWT_SECRET_KEY to JWT_KEY to match generateToken.js
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel
            .findOne({ email: decoded.email })
            .select("-password"); // Exclude password from user object
        
        req.user = user;
        next();
    }
    catch(err) {
        req.flash("error", "Something went wrong. Please login again.");
        res.redirect("/");
    }
}