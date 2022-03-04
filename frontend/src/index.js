import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AlertTemplate from "react-alert-template-basic";
import { Provider as AlertProvider, useAlert } from "react-alert";
const options = {
	position: "bottom center",
	timeout: 5000,
	offset: "0px",
	transition: "scale",
};

ReactDOM.render(
	<React.StrictMode>
		<AlertProvider template={AlertTemplate} {...options}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AlertProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
