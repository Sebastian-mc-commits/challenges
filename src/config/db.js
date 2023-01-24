import mongoose from "mongoose";
// import {config} from "dotenv";

// config()
const url = ""
mongoose.set("strictQuery", false);
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log("Message: ", err.message);
    }
    else {
        console.log("database connected");
    }
});
