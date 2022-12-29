const btnCart = document.querySelector("#btnCart");
const currentView = document.querySelector("#currentView");
const main_menu = document.querySelector("#main-menu");
const isHidden = main_menu.classList.contains("display-none");

if (isHidden) main_menu.classList.remove("display-none");


if (currentView.textContent !== "home") {
    btnCart.innerHTML = `<strong>Go back</strong>`;
    // btnCart.setAttribute("target", "/home");
    btnCart.href = "/home"
    console.log(btnCart.getAttribute("href"))
}
if (currentView.textContent === "crud-admin") {
    main_menu.classList.add("display-none");
}