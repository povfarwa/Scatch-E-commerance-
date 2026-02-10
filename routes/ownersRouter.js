const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

// Create owner route - only in development mode
if(process.env.NODE_ENV === "development"){
    router.post('/create', async function(req, res){
        try {
            let owners = await ownerModel.find();
            if(owners.length > 0) {
                return res.status(503).send("Owner already exists. Only one owner is allowed.");
            }

            let {fullname, email, password} = req.body;
            
            // Hash the password before saving
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            let createdOwner = await ownerModel.create({ 
                fullname, 
                email, 
                password: hash 
            });
            
            res.status(201).send("Owner created successfully");
        } catch(err) {
            res.status(500).send("Error creating owner: " + err.message);
        }
    });
}

// Owner login page
router.get('/login', function(req, res){
    let error = req.flash("error");
    res.render("owner-login", { error });
});

// Owner login handler
router.post('/login', async function(req, res){
    try {
        let {email, password} = req.body;
        
        let owner = await ownerModel.findOne({ email: email });
        if(!owner) {
            req.flash("error", "Invalid email or password");
            return res.redirect("/owners/login");
        }

        bcrypt.compare(password, owner.password, function(err, result){
            if(result){
                let token = generateToken(owner);
                res.cookie("token", token);
                res.redirect("/owners/admin");
            } else {
                req.flash("error", "Invalid email or password");
                res.redirect("/owners/login");
            }
        });
    } catch(err) {
        req.flash("error", "Something went wrong");
        res.redirect("/owners/login");
    }
});

// Admin dashboard
router.get('/admin', function(req, res){
    let success = req.flash("success");
    res.render("admin", { success }); 
});

module.exports = router;