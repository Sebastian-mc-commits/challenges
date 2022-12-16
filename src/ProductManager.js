const fs = require("fs");
const path = require("path");
class ProductManager {
    #product;
    #path;
    constructor(pt) {
        this.#path = path.join(__dirname, pt);
        this.#product = fs.existsSync(this.#path) ?
            JSON.parse(fs.readFileSync(this.#path)) : [];
    }

    addProduct(products) {
        const validateFileds = Object.keys(products).includes("title" && "description" &&
            "price" && "code" && "stock") &&
            Object.values(products).every(p => Boolean(p) || p === 0);

        if (this.#product.some(p => p.code === products.code) || !validateFileds) return false;

        if (!Object.keys(products).includes("status")) products.status = true;
        this.#product.push({
            id: this.#product.length === 0 ? 1 : this.#product[this.#product.length - 1].id + 1,
            ...products,
        });
        this.#uploadProduct();

        return `Product ${products.title} has been added successfully`;
    }

    #uploadProduct = () => fs.writeFileSync(this.#path, JSON.stringify(this.#product));

    getProducts = (limit = 0) => {

        if (!limit) return this.#product;

        let productLimit = [];
        for (let i = 0; i < limit; i++) productLimit.push(this.#product[i]);
        return productLimit;

    };

    getProductById = (id) => this.#product.find(p => p.id === parseInt(id));

    #existProduct = (id) => Boolean(this.#product.find(p => p.id === parseInt(id)));

    deleteProduct(id) {
        if (!this.#existProduct(id)) return false;

        this.#product = this.#product.filter(p => p.id !== parseInt(id));
        return this.#uploadProduct(), `${id} Deleted successfully`;
    };

    updateProduct = (id, newProduct) => {
        const code = this.#product.some(p => p.code === newProduct.code);
        if (!this.#existProduct(id) || newProduct.id || code) return false;

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