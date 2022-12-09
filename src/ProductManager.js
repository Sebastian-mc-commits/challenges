const fs = require("fs");
const path = require("path");
class ProductManager {
    #product;
    #path;
    constructor(path) {
        this.#path = path;
        this.#product = fs.existsSync(path) ?
            JSON.parse(fs.readFileSync(path)) : [];
    }

    addProduct(products) {
        if (this.#product.some(p => p.code === products.code)) {
            return `The product ${products.title} already exist`;
        }

        const validateFileds = Object.keys(products).includes("title" && "description" &&
            "price" && "thumbnail" && "code" && "stock") &&
            Object.values(products).every(p => Boolean(p) || p === 0);

        if (!validateFileds) return `${products.title} has missing fields`;

        this.#product.push({
            id: this.#product.length === 0 ? 1 : this.#product[this.#product.length - 1].id + 1,
            ...products
        });
        this.#uploadProduct();

        return `Product ${products.title} has been added successfully`;
    }

    #uploadProduct = () => {
        const fileRoute = path.join(__dirname, this.#path);
        return fs.writeFileSync(fileRoute, JSON.stringify(this.#product));
    };

    getProducts = (limit) => {

        if (!limit) return this.#product;

        let productLimit = [];
        for (let i = 0; i < limit; i++) productLimit.push(this.#product[i]);
        return productLimit;

    };

    getProductById = (id) => this.#product.find(p => p.id === id);

    #existProduct = (id) => Boolean(this.#product.find(p => p.id === id));

    deleteProduct(id) {
        if (!this.#existProduct(id)) return false;

        this.#product = this.#product.filter(p => p.id !== id);
        return this.#uploadProduct(), `${id} Deleted successfully`;
    };

    updateProduct = (id, newProduct) => {
        if (!this.#existProduct(id) || newProduct.id) return "Not found for updating";

        const product = this.getProductById(id);
        const index = this.#product.indexOf(product);
        this.#product.splice(index, 1, { ...product, ...newProduct });
        return this.#uploadProduct(), `${newProduct.title || id} Updated successfully`;

    };
    deleteAll = () => {
        this.#product = []
        return this.#uploadProduct(), "All the products has been deleted successfully";
    }
}

const product = new ProductManager("products.json");

module.exports = product;
/*for (let i = 0; i < 60; i++) {
    const random = Math.random().toString(36).substring(0, 5);
    const ejm = {
        title: random, description: "Ejemplo",
        price: i * 1000, thumbnail: "./", code: random, stock: i
    }
    console.log(product.addProduct(ejm));
}*/