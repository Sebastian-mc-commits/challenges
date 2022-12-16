const { Router } = require("express");
const product = require("../ProductManager");
const router = Router();

router.get("/", (req, res) => {
    const {limit} = req.query;
    res.render("products", {products: product.getProducts(limit)});
});

router.get("/:pid", (req, res) => {
    const {pid} = req.params;
    const productId = product.getProductById(pid);
    console.log(productId);
    if (!productId) return res.status(404).send(`Product with id ${pid} Not Found`);
    res.render("products", {products: productId, getProductById: true});
});

router.delete("/:pid", (req, res) => {
    const {pid} = req.params;
    const productId = product.deleteProduct(pid);
    if (!productId) return res.status(404).send(`Product with id ${pid} Not Exist`);
    res.send(productId);
});

router.post("/", (req, res) => {
    const addProduct = product.addProduct(req.body);
    if (!addProduct) return res.status(400).send(`Cannot add the product because is not filled enough 
        or has the same code than other. Check it out!`);
    res.send(addProduct);
});

router.put("/:pid", (req, res) => {
    const {pid} = req.params;
    const updateProduct = product.updateProduct(pid, req.body);
    if (!updateProduct) return res.status(400).send(`Cannot update the product because
        has the same code than other or the field not exist. Check it out!`);
    res.send(updateProduct);
});

module.exports = router;