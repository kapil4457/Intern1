const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

//config file
if (process.env.NODE_ENV !== "PRODUCTION") {
	require("dotenv").config({ path: __dirname + "/.env" });
}
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
const admin = require("./routes/adminRoute.js");

app.use("/api/v1/", admin);
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
module.exports = app;
