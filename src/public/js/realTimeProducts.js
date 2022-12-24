const products = document.querySelector("#products");
const socket = io();

socket.on("getProducts", async data => {
    try {
        await renderProducts(data);
    } catch {
        products.innerHTML = `<div class='center text-danger'><h1>Something is wrong</h1></div>`
    }
});

function renderProducts(data) {
    products.innerHTML = "";
    console.log(data);
    for (let i of data) {
        const image = i.thumbnail || "/public/images/example.jpg";
        products.innerHTML += `
            <div>
                <img src=${image} alt="Product Image"/>
                <h2>${i.title}</h2>
                <p>Price: ${i.price}</p>
                <p>Code: ${i.code}</p>
                <p>Status: ${i.status}</p>
                <p>Stock: ${i.stock}</p>
                <p>${i.description}</p>
                <p id="id">${i.id}</p>
                <button>
                <a href="/cart/addToCart/${i.id} class="text">Add to cart</a>
                </button>

                <button><a href="/listContent/${i.id}" class="text">Watch more</a></button>
            </div>`
    }
}