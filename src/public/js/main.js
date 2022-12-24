const btnCart = document.querySelector("#btnCart");
const currentView = document.querySelector("#currentView");

if (currentView.textContent !== "products") {
    btnCart.innerHTML = `<a href="/products" class="text">
    <strong>Go to back</strong> </a>`
};