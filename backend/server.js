const app = require("./app");
const connectDatabase = require("./database");

process.on("uncaughtException", (err) => {
	console.log(err.message);
	console.log("Shutting down due to unhandled Promise Rejection ");
	process.exit(1);
});

//config file
if (process.env.NODE_ENV !== "PRODUCTION") {
	require("dotenv").config({ path: __dirname + "/.env" });
}

//connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
	console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
