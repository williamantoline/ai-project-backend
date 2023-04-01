require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const testRoute = require("./routes/test");


const app = express();
app.use(cookieParser());

// app.use(cors({
//     credentials: true,
//     origin: "http://localhost:3000",
// }));


app.use("/test", testRoute);

// handle 404
app.use((req, res, next) => {
    res.status(404).send({
        message: "Not Found",
    });
});

// handle error
app.use((err, req, res, next) => {
    res.status(500).send({
        message: "Internal Server Error",
    });
});


const host = process.env.HOST || "http://127.0.0.1";
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Running on ${host}:${port}`);
