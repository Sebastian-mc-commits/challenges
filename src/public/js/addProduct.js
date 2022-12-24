const field = document.querySelectorAll("#field");
const activeButton = document.querySelector("#activeButton");

document.querySelector("#form").addEventListener("input", () => {
    const condition = [...field].every(item => item.value);

    if (condition) return activeButton.removeAttribute("disabled");

    return activeButton.hasAttribute("disabled") || activeButton.setAttribute("disabled", "");
});