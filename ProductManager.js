const fs = require("fs");
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
            id: this.#product.length === 0 ? 1 : this.#product[this.#path.length - 1].id + 1,
            ...products
        });
        this.#uploadProduct();

        return `Product ${products.title} has been added successfully`;
    }

    #uploadProduct = () => fs.writeFileSync(this.#path, JSON.stringify(this.#product));

    getProducts = () => this.#product;

    getProductById = (id) => this.#existProduct(id) ?
        this.#product.find(p => p.id === id)
        : "Not found";

    #existProduct = (id) => Boolean(this.#product.find(p => p.id === id));

    deleteProduct(id) {
        if (!this.#existProduct(id)) return `${id} Not exist`;

        this.#product = this.#product.filter(p => p.id !== id);
        return this.#uploadProduct(), `${id} Deleted successfully`;
    };

    updateProduct = (id, newProduct) => {
        if (!this.#existProduct(id) || newProduct.id) return "Not found for updating";

        const index = this.#product.indexOf(this.#product.find(p => p.id === id));
        this.#product.splice(index, 1, { ...(this.getProductById(id)), ...newProduct });
        return this.#uploadProduct(), `${newProduct.title || id} Updated successfully`;

    };
    deleteAll = () => {
        this.#product = []
        return this.#uploadProduct(), "All the products has been deleted successfully";
    }
}
const netboock = {

    title: "Portatiles",
    price: 2000000, thumbnail: "./", stock: 6
}
const furniture = {
    id: 5,
    title: "Muebles", description: "suaves y comodos",
    price: 1000000, thumbnail: "./", code: "12001s", stock: 10
}

const productTest = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
}

const product = new ProductManager("products.json");
console.log(product.getProducts());//[]
console.log(product.addProduct(productTest));//Product producto prueba has been added successfully
console.log(product.getProducts());//return the array
console.log(product.getProductById(1));//return the object
console.log(product.getProductById(2));//Not found
console.log(product.updateProduct(1, netboock));//Updated successfully
console.log(product.updateProduct(1, furniture));//Not found for updating
console.log(product.deleteProduct(2));//Not found
console.log(product.deleteProduct(1));//1 Deleted successfully

/*for (let i = 0; i < 20; i++) {
    const random = Math.random().toString(36).substring(0, 5);
    const ejm = {
        title: random, description: "Ejemplo",
        price: i * 1000, thumbnail: "./", code: random, stock: i
    }
    console.log(product.addProduct(ejm));
}*/