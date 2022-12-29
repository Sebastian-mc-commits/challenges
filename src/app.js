import express from "express";
import { Server } from "socket.io";
import { create } from "express-handlebars";
import { comments, product } from "./classes/index.js";
import { cart, home, listContent, realTimeProducts } from "./routers/index.js";
import __dirname from "./__dirname.js";
import helpers from "./lib/handlebars.js";

const app = express();
const PORT = 4000;


app.use(express.urlencoded({ extended: true }));
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
app.use("/home", home);
app.use("/cart", cart);
app.use("/listContent", listContent);
app.use("/realTimeProducts", realTimeProducts);

const server = app.listen(PORT, () => console.log("Server set on port 4000"));

const io = new Server(server);

io.on("connection", (socket) => {

    socket.on("selectedRoom", async room => {
        // socket.rooms.delete;
        socket.join(room);
        const getData = await comments.getComments(room);
        socket.emit("data", { data: getData });
    });

    socket.on("message", async data => {
        comments.addComment(data);
        socket.join(data.room);
        const getData = await comments.getComments(data.room);
        io.to(data.room).emit("data", { data: getData });
    });

    socket.emit("getProducts", product.getProducts());

    socket.on("sendProduct", message => {
        io.emit("requestMessage", { message });
        io.emit("getProducts", product.getProducts());
    });

    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
});