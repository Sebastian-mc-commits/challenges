import express from "express";
import { Server } from "socket.io";
import { create } from "express-handlebars";
import { comments } from "./classes/index.js";
import { cart, products, listContent } from "./routers/index.js";
import __dirname from "./__dirname.js";
import helpers from "./lib/handlebars.js";

const app = express();
const PORT = 4000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/public", express.static(__dirname("public")));

//Set
const hbs = create({
    extname: ".hbs",
    helpers: helpers
});
app.engine("hbs", hbs.engine);
app.set("views", __dirname("views"));
app.set("view engine", "hbs");
//Routers
app.use("/products", products);
app.use("/cart", cart);
app.use("/listContent", listContent);
const server = app.listen(PORT, () => console.log("Server set on port 4000"));

const io = new Server(server);

io.on("connection", (socket) => {

    socket.on("selectedRoom", room => {
        socket.emit("data", {data: comments.getComments(room)});
    });

    socket.on("join", data => {
        socket.join(data.room);
        comments.addComment(data);
        io.to(data.room).emit("message", {data: comments.getComments(data.room)});
    });
});