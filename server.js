const express = require("express");
const path = require("path");
const limit = require("express-rate-limit");
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/downloads", limit({
    windowMs: 1 * 60 * 1000,
    max: 20,
    message: "<h1>429</h1>Too many requests."
}));
app.use((req, res, next) => {
    console.log("----- REQUEST -----");
    console.log("Time:", new Date().toISOString());
    console.log("Method:", req.method);
    console.log("Path:", req.originalUrl);
    console.log("IP:", req.ip);
    console.log("User-Agent:", req.get("User-Agent"));
    console.log("-------------------");
    next();
});

app.get("/downloads", (req, res)=>{
    console.log(req.ip);
    res.sendFile(path.join(__dirname, "front.html"));
});

app.listen(PORT, ()=>{
    console.log("server started");
});