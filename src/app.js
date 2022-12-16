const express = require("express");
const {create} = require("express-handlebars");
const path = require("path");

const app = express();
const PORT = 4000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Set
const hbs = create({
    extname: ".hbs"
});
app.engine("hbs", hbs.engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
//Routers
app.use("/products", require("./routers/products"));
app.use("/cart", require("./routers/cart"));

app.listen(PORT, () => console.log("Server set on ", PORT));