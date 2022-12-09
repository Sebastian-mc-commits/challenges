const express = require("express");
const product = require("./ProductManager");

const app = express();
const PORT = 4000;
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/products", (req, res) => {
    const {limit} = req.query;
    res.json(product.getProducts(limit));
});

app.get("/products/:pid", (req, res) => {
    const {pid} = req.params;
    const productId = product.getProductById(pid);
    if (!productId) return res.status(404).send(`Product with id ${pid} Not Found`);
    res.json(productId);
});

app.delete("/products/:pid", (req, res) => {
    const {pid} = req.params;
    const productId = product.deleteProduct(pid);
    if (!productId) return res.status(404).send(`Product with id ${pid} Not Exist`);
    res.send(productId);
});

app.post("/products", (req, res) => {
    const addProduct = product.addProduct(req.body);
    if (!addProduct) return res.status(400).send(`Cannot add the product because is not filled enough 
        or has the same code than other. Check it out!`);
    res.send(addProduct);
});

app.put("/products/:pid", (req, res) => {
    const {pid} = req.params;
    const updateProduct = product.updateProduct(pid, req.body);
    if (!updateProduct) return res.status(400).send(`Cannot update the product because
        has the same code than other or the field not exist. Check it out!`);
    res.send(updateProduct);
});

app.listen(PORT, () => console.log("Server set on ", PORT));