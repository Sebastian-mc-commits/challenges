import { product } from "../classes/index.js";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    const { limit } = req.query;
    res.render("home", { products: product.getProducts(limit) });
});

router.get("/addProduct", (req, res) => {
    res.render("addProduct");
});

router.get("/:pid", (req, res) => {
    const { pid } = req.params;
    const productId = product.getProductById(pid);
    console.log(productId);
    if (!productId) return res.status(404).send(`Product with id ${pid} Not Found`);
    res.render("home", { products: productId, getProductById: true });
});

router.delete("/:pid", (req, res) => {
    const { pid } = req.params;
    const productId = product.deleteProduct(pid);
    if (!productId) return res.status(404).send(`Product with id ${pid} Not Exist`);
    res.send(productId);
});

router.post("/addProduct", (req, res) => {
    const addProduct = product.addProduct(req.body);
    if (!addProduct) return res.status(400).redirect("/home");

    res.redirect("/home");
});

router.put("/:pid", (req, res) => {
    const { pid } = req.params;
    const updateProduct = product.updateProduct(pid, req.body);
    if (!updateProduct) return res.status(400).send(`Cannot update the product because
        has the same code than other or the field not exist. Check it out!`);
    res.send(updateProduct);
});

export default router;