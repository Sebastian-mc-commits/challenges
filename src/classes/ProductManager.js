import fs from "fs";
import __dirname from "../__dirname.js";
import {v4} from "uuid";
class ProductManager {
    #product;
    #path;
    constructor(pt) {
        this.#path = __dirname("data", pt);
        this.#product = fs.existsSync(this.#path) ?
            JSON.parse(fs.readFileSync(this.#path)) : [];
    }

    addProduct(products) {

        const validateFileds = Object.keys(products).includes("title" && "description" &&
            "price" && "code" && "stock") &&
            Object.values(products).every(p => Boolean(p.toString));

        if (this.#product.some(p => p.code === products.code) || !validateFileds) return false;

        if (!products.status) products.status = true;

        if (!products.thumbnail) products.thumbnail = "/public/uploads/images/example.jpg";
        //id: this.#product.length === 0 ? 1 : this.#product[this.#product.length - 1].id + 1 
        this.#product.push({
            id: v4(),
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

    getProductById = (id) => this.#product.find(p => p.id === id);

    #existProduct = (id) => Boolean(this.#product.find(p => p.id === id));

    deleteProduct(id) {
        if (!this.#existProduct(id)) return false;

        this.#product = this.#product.filter(p => p.id !== id);
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
// const product = new ProductManager("products.json");
export default new ProductManager("products.json");
// for (let i = 0; i < 18; i++) {
//     const random = Math.random().toString(36).substring(0, 5);
//     const m = `Lorem, ipsum dolor sit amet consectetur 
//     adipisicing elit.Dolor voluptatem totam ullam ipsa, 
//     facilis rem eveniet facere sapiente aliquid repudiandae 
//     placeat soluta tenetur fugit, laudantium, incidunt porro 
//     similique nemo blanditiis.`

//     const ejm = {
//         title: random, description: i % 2 == 0? "Ejemplo" : m,
//         price: i * 1000, thumbnail: "/public/images/example.js", code: random, stock: i
//     }
//     console.log(product.addProduct(ejm));
// }

// console.log(product.getProducts());