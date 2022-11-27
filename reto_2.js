const fs = require("fs");
class ProductManager {
    #products;
    static #condition = fs.existsSync("products.json") ?
        JSON.parse(fs.readFileSync("products.json")) : [];

    constructor(products = ProductManager.#condition) {
        this.#products = products;
    }

    addProduct(products) {
        if (this.#products.some(p => p.code === products.code)) {
            return `The product ${products.title} already exist`;
        }

        const validateFileds = Object.keys(products).includes("title" && "description" &&
            "price" && "thumbnail" && "code" && "stock") &&
            Object.values(products).every(p => Boolean(p) || p === 0);

        if (!validateFileds) return `${products.title} has missing fields`;

        this.#products.push({
            id: this.#products.length === 0 ? 1 : this.#products[this.#products.length - 1].id + 1,
            ...products
        });
        this.#uploadProduct();

        return `Product ${products.title} has been added successfully`;
    }

    #uploadProduct = () => fs.writeFileSync("products.json", JSON.stringify(this.#products));

    getProducts = () => this.#products;

    getProductById = (id) => this.#existProduct(id) ?
        this.#products.find(p => p.id === id)
        : "Not found";

    #existProduct = (id) => Boolean(this.#products.find(p => p.id === id));

    deleteProducts(...id) {
        id.map(i => {
            if (!this.#existProduct(i)) return `${id} Not exist`;

            return this.#products = this.#products.filter(p => p.id !== i);
        });
        return this.#uploadProduct(), `${id} Deleted successfully`;
    };

    updateProduct = (id, newProduct) => {
        if (!this.#existProduct(id)) return "Not found for updating";

        const index = this.#products.indexOf(this.#products.find(p => p.id === id));
        this.#products.splice(index, 1, { ...(this.getProductById(id)), ...newProduct });
        return this.#uploadProduct(), `${newProduct.title || id} Updated successfully`;

    };
    deleteAll = () => {
        this.#products = []
        return this.#uploadProduct(), "All the products has been deleted successfully";
    }
}
const netboock = {
    title: "Portatiles",
    price: 2000000, thumbnail: "./", stock: 6
}

//Has missing fields

const shirt = {
    title: "Camisa", description: "lana",
    price: 20000, thumbnail: "./", code: "12001s", stock: 8
}

const shoes = {
    title: "Zapatos", description: "cuero",
    price: 60000, thumbnail: "./", code: "", stock: 0
} //Has missing fields
const furniture = {
    title: "Muebles", description: "suaves y comodos",
    price: 1000000, thumbnail: "./", code: "12001s", stock: 10
}

const product = new ProductManager();
//console.log(product.deleteProducts(0));
//console.log(product.addProduct(tv));
console.log(product.deleteAll());
/*for (let i = 0; i < 50; i++) {
    const random = Math.random().toString(36).substring(0, 5);
    const ejm = {
        title: random, description: "Ejemplo",
        price: i * 1000, thumbnail: "./", code: random, stock: i
    }
    console.log(product.addProduct(ejm));
}*/
//console.log(product.getProductById(50));
//console.log(product.deleteProducts(96));
/*let input = "";
do{
    const prompt = require("prompt-sync")();
    input = prompt("Select action: ");
    console.log("W " + input);
    let select;
    switch(input){
        case "d":
            select = prompt("Write id for deliting separated by commas: ").split(",").
            map( p => parseInt(p)).join();
            console.log(select);
            console.log(product.deleteProducts(select));
    }
} while (input !== "c");*/