import axios from "axios";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
	const history = useHistory();
	const alert = useAlert();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const login = async (e) => {
		e.preventDefault();
		try {
			const config = { headers: { "Content-Type": "application/json" } };
			const { data } = await axios.post(
				`/api/v1/login`,
				{ email, password },
				config
			);
			alert.success("Successfully Logged in");
			history.push("/");
		} catch (error) {
			console.clear();
			alert.error("Please enter correct Email/Password");
		}
	};

	return (
		<Container>
			<Box>
				<h1>Login</h1>
				<form>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button onClick={login}>Login</button>
				</form>
			</Box>
		</Container>
	);
};

export default Login;
const Container = styled.div`
	height: 100vh;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.05);
`;
const Box = styled.div`
	background-color: white;
	height: 50%;
	width: 20%;
	display: flex;
	border-radius: 4px;
	box-shadow: 1pc 1pc 1pc gray;
	align-items: center;
	padding: 0 2rem;

	flex-direction: column;
	h1 {
		font-family: "Roboto";
		font-weight: 500;
	}

	form {
		height: 80%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		input {
			width: 100%;
			height: 1.5rem;
			border: none;
			outline: none;
			border-bottom: 1px solid black;
		}

		button {
			height: 2rem;
			width: 80%;
			align-self: center;
			border: none;
			outline: none;
			background: transparent;
			background-color: rgba(0, 0, 0, 0.2);
			border-radius: 4px;
			cursor: pointer;
			transition: all 0.2s;
			&:hover {
				box-shadow: 0.2pc 0.2pc 0.3pc gray;
				background-color: rgba(0, 0, 0, 0.5);
				color: white;
			}
		}
	}

	@media all and (max-width: 768px) {
		width: 70%;
	}
`;
