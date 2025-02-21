const express = require("express");
const dotenv = require("dotenv");
const connect = require("./config/db");
dotenv.config();
const app = express();
app.use(express.json());
const authenRoute = require("./routes/Authentication");
const resumeRoute = require("./routes/resume");
const Search = require("./routes/Search");


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api", authenRoute);
app.use("/api", resumeRoute);
app.use("/api", Search);

app.listen(3000, ()=> {
    connect();
    console.log("Server is running on port 3000");
})