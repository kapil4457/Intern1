import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import axios from "axios";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";

const Profile = () => {
	const history = useHistory();
	const alert = useAlert();
	const [users, setUsers] = useState([]);
	const data = async () => {
		try {
			const user = await axios.get("/api/v1/users");
			setUsers(user?.data?.user);
			console.log("");
		} catch (e) {
			console.clear();
			alert.error("Session Expired. Please Login again");
			history.push("/login");
		}
	};
	const DeleteElem = async (id) => {
		try {
			const del = await axios.delete(`/api/v1/delete/user/${id}`);
			alert.success("Deleted Successfully");
			window.location.reload();
		} catch (e) {
			console.clear();
			history.push("/login");
			alert.error("Session Expired. Please Login again");
		}
	};
	useEffect(() => {
		data();
	}, []);
	return (
		<>
			<Navbar />
			<Container>
				<table>
					<tbody>
						<tr>
							<th>Username</th>
							<th>Mobile</th>
							<th>Email</th>
							<th>Address</th>
							<th>Delete</th>
						</tr>

						{users.map((user) => (
							<tr key={user?._id}>
								<td>{user?.username}</td>
								<td>{user?.mobile}</td>
								<td>{user?.email}</td>
								<td className="add">{user?.address}</td>
								<td>
									<p onClick={() => DeleteElem(user._id)}>Delete</p>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</Container>
		</>
	);
};

export default Profile;
const Container = styled.div`
	padding: 3rem;
	overflow-x: scroll;
	table {
		width: 100%;
		border: 2px solid black;
		td,
		th {
			border: 1px solid black;
		}
		.add {
			height: 2rem;
			width: 30vw;
			overflow-y: auto;
		}
		td {
			p {
				color: red;
				cursor: pointer;
			}
		}
	}

	@media all and (max-width: 800px) {
		padding: 1rem;
	}
`;
