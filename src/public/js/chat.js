const socket = io();
const formChat = document.querySelector("#formChat");
const chat = document.querySelector("#chat");
const commentsLength = document.querySelector("#commentsLength");

socket.emit("selectedRoom", room);
socket.on("data", async data => {
    try {
        await printData(data.data);
    } catch {
        chat.innerHTML = `<li>Error</li>`
    }
});

formChat.addEventListener('submit', e => {
    e.preventDefault();

    const message = document.querySelector("#message");
    const rate = document.querySelectorAll("#rate");
    console.log(message.value);
    const selectedRate = [...rate].find(item => item.checked);

    socket.emit("join", {
        room,
        from: socket.id,
        message: message.value,
        rate: selectedRate.value
    });
    /*socket.emit("message", {
        from: socket.id, 
        message: message.value
    });*/

    socket.on("message", data => {
        //chat.innerHTML += `<li>${data.from}: ${data.message}</li>\n`;
        console.log(data.data);
        printData(data.data)

    });
    message.value = "";
});

function printData(data) {
    chat.innerHTML = "";
    commentsLength.textContent = data.length;
    for (let i of data) {
        const from = i.from === socket.id ? "me" : i.from;
        chat.innerHTML += `<h3>Rate: ${i.rate}</h3>
            <li>${from} says: <br> ${i.message}</li>`;
    }
}