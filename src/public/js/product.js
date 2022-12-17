document.querySelector(".container").addEventListener("click", e => {
    const target = e.target.getAttribute("id")

    switch (target) {
        case "addToCart":
            console.log("hi");
        default: null
    }
});