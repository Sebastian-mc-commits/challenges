const { Router } = require("express");
const cart = require("../cart");
const {getProductById} = require("../ProductManager");
const router = Router();

router.get("/", (req, res) => {
    const {limit} = req.query;
    res.render("cart", {products: cart.getProducts(limit)});
});

router.get("/addToCart/:id", (req, res) => {
    //cart.addProduct(product)
    const {id} = req.params;
    const getProduct = getProductById( parseInt(id) );
    cart.addProduct(getProduct);
    res.redirect("/products");
});
router.get("/delete/:pid", (req, res) => {
    const {pid} = req.params;
    cart.deleteProduct(pid);
    res.redirect("/cart");
});

router.get("/deleteAll", (req, res) => {
    cart.deleteAll();
    res.redirect("/cart");
});

router.get("/edit/:pid", (req, res) => {
    const {pid} = req.params;
    res.json(cart.updateProduct(pid, req.body ));
});

module.exports = router;