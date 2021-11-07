import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Material-UI

// components
import HomePage from "components/HomePage/HomePage";
import ProjectPage from "components/ProjectPage/ProjectPage";
import TestPage from "components/TestPage/TestPage";
import LoginPage from "components/LoginPage/LoginPage";
import SignIn from "components/SignIn";
import NotFound from "components/common/NotFound/NotFound";

// CSS
import "Styles/css/Reset.css";
import "Styles/css/App.css";
import "../../node_modules/antd/dist/antd.css";
import logo from "logo.svg";
import IconTest from "components/TestPage/IconTest";
import SpeedDial from "components/common/Nav/SpeedDial";

import RegisterPage from "components/RegisterPage/RegisterPage";
import LogoutPage from "components/common/Logout/LogoutPage";
import RouteConnect from "./RouteConnect";

console.log(logo);
function App() {
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					{/* <SpeedDial /> */}
				</header>
				<RouteConnect />
			</div>
		</Router>

		//     <img src={logo} className="App-logo" alt="logo" />
		//     <a
		//       className="App-link"
		//       href="https://reactjs.org"
		//       target="_blank"
		//       rel="noopener noreferrer"
		//     >
		//     </a>
		//     <Button className='button' variant='contained' color='primary'>Button</Button>
	);
}

export default App;
