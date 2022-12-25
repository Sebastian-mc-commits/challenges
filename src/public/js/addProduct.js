const socket = io();

document.addEventListener("submit", () => socket.emit("sendProduct"));