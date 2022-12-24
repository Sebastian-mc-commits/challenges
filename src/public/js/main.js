const btnCart = document.querySelector("#btnCart");
const currentView = document.querySelector("#currentView");

if (currentView.textContent !== "home") {
    btnCart.innerHTML = `<a href="/home" class="text">
    <strong>Go to back</strong> </a>`
};