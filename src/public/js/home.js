function content(id) {
    return console.log(id);
}

let prevScroll = -400;
function nextProduct() {
    document.querySelector(".grid").scrollTo({
        top: prevScroll,
        left: 0,
        behavior: "smooth"
    });
    prevScroll -= 400;
}