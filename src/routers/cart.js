const { Router } = require("express");
const cart = require("../cart");
const router = Router();

router.get("/", (req, res) => {
    const {limit} = req.query;
    res.json(cart.getProducts(limit));
});

router.get("/addToCart", (req, res) => {
    console.log("Enter here");
    const product = {
        title: req.query.title,
        price: req.query.price,
        code: req.query.code,
        status: req.query.status,
        tumbnail: req.query.tumbnail,
        description: req.query.description,
    }
    cart.addProduct(product)
    res.redirect("/products");
});
router.delete("/delete/:pid", (req, res) => {
    const {pid} = req.params;
    res.json(cart.deleteProduct(pid));
});

router.get("/edit/:pid", (req, res) => {
    const {pid} = req.params;
    res.json(cart.updateProduct(pid, req.body ));
});

module.exports = router;