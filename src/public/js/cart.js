const quantity = document.querySelector("#quantity");
const stock = document.querySelector("#stock");

quantity.addEventListener("input", () => {
    const quantity_value = parseInt(quantity.value);
    const stock_value = parseInt(stock.textContent);
    if (quantity_value > stock_value) quantity.value = stock.textContent;
    else if (quantity_value <= 0) quantity.value = 1;
});