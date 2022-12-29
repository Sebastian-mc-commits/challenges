const socket = io();
const formChat = document.querySelector("#formChat");
const chat = document.querySelector("#chat");
const commentsLength = document.querySelector("#commentsLength");
const comment = document.querySelector("#comment");
const user = document.querySelector("#user");

let exisUser = "";

socket.emit("selectedRoom", room);

formChat.addEventListener('submit', e => {
    e.preventDefault();

    const rate = document.querySelectorAll("#rate");
    console.log("message", comment.value);
    const selectedRate = [...rate].find(item => item.checked);

    socket.emit("message", {
        room: parseInt(room),
        from: exisUser || socket.id,
        message: comment.value,
        rate: selectedRate.value,
        userId: socket.id
    });
    /*socket.emit("message", {
        from: socket.id, 
        message: message.value
    });*/
    comment.value = "";
});

function printData(data) {
    chat.innerHTML = "";
    commentsLength.textContent = data.length;
    for (const { from, rate, message, userId } of data) {
        const messageFrom = userId === socket.id ? "me" : from;
        chat.innerHTML += `<h3>Rate: ${rate}</h3>
            <li>${messageFrom} says: <br> ${message}</li>`;
    }
}

socket.on("data", async data => {
    console.log("Passing here for data");
    try {
        await printData(data.data);
    } catch {
        chat.innerHTML = `<li>Error</li>`
    }
});

const registerUser = () => {
    if (exisUser) return;
    Swal.fire({
        title: "¡Hi there!",
        input: "text",
        text: "Your name is required",
        allowOutsideClick: false,
        inputValidator: (value) => {
            return !value && "The field must not be empty";
        },
    }).then((newUser) => {
        exisUser = newUser.value;
        user.textContent = newUser.value;
    });
}