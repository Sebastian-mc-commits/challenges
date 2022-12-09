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
    const pid = parseInt(req.params.pid);
    const productId = product.getProductById(pid);
    if (!productId) return res.status(404).send(`Product with id ${pid} Not Found`);
    res.json(productId);
});

app.delete("/products/:pid", (req, res) => {
    const pid = parseInt(req.params.pid);
    const productId = product.deleteProduct(pid);
    if (!productId) return res.status(404).send(`Product with id ${pid} Not Exist`);
    res.send(productId);
});


app.listen(PORT, () => console.log("Server set on ", PORT));