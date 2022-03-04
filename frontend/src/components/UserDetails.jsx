import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import axios from "axios";

const UserDetails = () => {
	const alert = useAlert();
	const history = useHistory();

	const [username, setUsername] = useState("");
	const [mobile, setMobile] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");

	const submitHandler = async (e) => {
		e.preventDefault();
		if (!username || !mobile || !email || !address) {
			return alert.error("Please fill in all the details");
		}

		if (mobile.length > 10 || mobile.length < 10) {
			alert.error("Please Enter a valid mobile number");
			return;
		}

		try {
			const config = { headers: { "Content-Type": "application/json" } };
			await axios.post(
				`/api/v1/add/user`,
				{ username, mobile, email, address },
				config
			);
			alert.success("User added successfully");
			setUsername("");
			setAddress("");
			setEmail("");
			setMobile("");
			history.push("/");
		} catch (error) {
			// console.clear();
			alert.error("Session Expired. Please Login again");
			history.push("/login");
		}
	};
	return (
		<>
			<Navbar />
			<Container>
				<Box>
					<h1>Details</h1>
					<form>
						<input
							type="text"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<input
							type="number"
							placeholder="Mobile Number"
							value={mobile}
							onChange={(e) => setMobile(e.target.value)}
						/>
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type="text"
							placeholder="Address"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						/>
						<button onClick={submitHandler}>Save</button>
					</form>
				</Box>
			</Container>
		</>
	);
};

export default UserDetails;
const Container = styled.div`
	height: 85vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const Box = styled.div`
	width: 25vw;
	height: 50vh;
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	box-shadow: 0.4pc 0.4pc 1pc gray;
	h1 {
		height: 2vh;
		font-weight: ;
	}
	form {
		padding: 0 2rem;
		height: 48vh;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		flex-direction: column;

		input {
			width: 100%;
			height: 1.4rem;
			border: none;
			outline: none;
			border-bottom: 1px solid black;
		}
		button {
			width: 80%;
			align-self: center;
			height: 2rem;
			border: none;
			outline: none;
			background-color: rgba(0, 0, 0, 0.2);
			cursor: pointer;
			transition: all 0.2s;

			&:hover {
				box-shadow: 0.2pc 0.2pc 0.3pc gray;
				background-color: rgba(0, 0, 0, 0.5);
				color: white;
			}
		}
	}
	@media all and (max-width: 800px) {
		width: 70%;
	}
`;
