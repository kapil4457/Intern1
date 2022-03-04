import "./App.css";
import Login from "./components/Login";
import UserDetails from "./components/UserDetails";
import { Switch, Route, useHistory } from "react-router-dom";
import Profile from "./components/Profile";
import axios from "axios";
import { useEffect } from "react";

function App() {
	const history = useHistory();

	async function users() {
		try {
			await axios.get(`/api/v1/users`);
		} catch (e) {
			console.clear();
			history.push("/login");
		}
	}

	useEffect(() => {
		users();
	}, []);
	return (
		<div className="App">
			<Switch>
				<Route exact path="/login">
					<Login />
				</Route>
				<Route exact path="/">
					<UserDetails />
				</Route>
				<Route exact path="/profile">
					<Profile />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
