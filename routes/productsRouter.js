const express = require('express');
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

// Render create product page
router.get("/create", function(req, res){
    res.render("createproducts");
});

// Create product handler
router.post("/create", upload.single("image"), async (req, res) => {
    try {
        let {name, price, discount, bgcolor, panelcolor, textcolor} = req.body;

        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount: discount || 0,
            bgcolor,
            panelcolor,
            textcolor
        });
        
        req.flash("success", "Product created successfully!");
        res.redirect("/owners/admin");
    }
    catch(err){
        console.error("Error creating product:", err);
        res.send("Error creating product: " + err.message);
    }
});

module.exports = router;