import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
	return (
		<>
			<Container>
				<NavLink exact activeClassName="active" to="/">
					Add Users
				</NavLink>
				<NavLink exact activeClassName="active" to="/profile">
					All Users
				</NavLink>
			</Container>
		</>
	);
};

export default Navbar;
const Container = styled.div`
	height: 10vh;
	display: flex;
	align-items: end;
	justify-content: center;
	padding: 0 2rem;
	gap: 2rem;
	a {
		text-decoration: none;
		color: black;
		font-size: 1.3rem;
		transition: all 0.2s;
		&:hover {
			color: red;
		}
	}
`;
