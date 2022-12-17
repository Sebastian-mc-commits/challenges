const fs = require("fs");
const path = require("path");
class Cart {
    #product;
    #path;
    constructor(pt) {
        this.#path = path.join(__dirname, pt);
        this.#product = fs.existsSync(this.#path) ?
            JSON.parse(fs.readFileSync(this.#path)) : [];
    }

    addProduct(products) {

        products.quantity = 1;
        delete products.stock;
        const existProduct = this.#existProduct(products.id);

        if (existProduct) {

            for (let i = 0; i < this.#product.length; i++) {
                if (this.#product[i].id === products.id) {
                    this.#product[i].quantity++;
                    break;
                }
            }
            return this.#uploadProduct(), "Quantity increased";
        }
        this.#product.push({
            ...products,
        });
        this.#uploadProduct();

        return `Product added successfully`;
    }

    #uploadProduct = () => fs.writeFileSync(this.#path, JSON.stringify(this.#product));

    getProducts = (limit = 0) => {

        if (!limit) return this.#product;

        let productLimit = [];
        for (let i = 0; i < limit; i++) productLimit.push(this.#product[i]);
        return productLimit;

    };

    #existProduct = (id) => Boolean(this.#product.find(p => p.id === parseInt(id)));

    deleteProduct(id) {
        if (!this.#existProduct(id)) return false;

        this.#product = this.#product.filter(p => p.id !== parseInt(id));
        return this.#uploadProduct(), `${id} Deleted successfully`;
    };

    deleteAll = () => {
        this.#product = []
        return this.#uploadProduct(), "All the products has been deleted successfully";
    }
}

const cart = new Cart("cart.json");

module.exports = cart;
