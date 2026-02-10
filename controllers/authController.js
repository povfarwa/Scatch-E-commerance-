const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken"); 

module.exports.registerUser = async function(req, res) {
    try {
        let { email, password, fullname } = req.body;

        // Validation check
        if (!email || !password || !fullname) {
            return res.status(400).send("Please fill all fields");
        }

        let user = await userModel.findOne({ email: email });
        if (user) return res.status(401).send("You already have an account, please login.");

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        let createdUser = await userModel.create({
            email,
            password: hash,
            fullname
        });

        let token = generateToken(createdUser); 
        res.cookie("token", token);
        
        // redirecting to shop
        res.redirect("/shop");

    } catch (err) {
        // YEH CHECK KAREIN: Terminal mein kya print hota hai?
        console.error("DETAILED ERROR:", err); 
        res.status(500).send("Something went wrong: " + err.message);
    }
}

module.exports.loginUser = async function(req, res) {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email: email });
        if (!user) return res.send("Email or Password incorrect");

        bcrypt.compare(password, user.password, function(err, result) {
            if (result) {
                let token = generateToken(user);
                res.cookie("token", token);
                res.redirect("/shop");
            } else {
                res.send("Email or Password incorrect");
            }
        });
    } catch (err) {
        res.send(err.message);
    }
}

module.exports.logout = function(req, res) {
    res.cookie("token", "");
    res.redirect("/");
}