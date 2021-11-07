import React from "react";
import { Link } from "react-router-dom";
function NavLink() {
	return (
		<>
			<ul>
				<li>
					<Link to="/">home</Link>
				</li>
				<li>
					<Link to="/test">test</Link>
				</li>
				<li>
					<Link to="/project">project</Link>
				</li>
				<li>
					<Link to="/not">notFound Page</Link>
				</li>
				<li>
					<Link to="/login">Login Page</Link>
				</li>
				<li>
					<Link to="/register">Register Page</Link>
				</li>
				<li>
					<Link to="/Signin">Signin Page</Link>
				</li>
				<li>
					<Link to="/iconTest">iconTest Page</Link>
				</li>
				<li>
					<Link to="/util">Util Page</Link>
				</li>
				<li>
					<Link to="/project/intro">Intro Page</Link>
				</li>
				<li>
					<Link to="/projcet/profile">Profile Page</Link>
				</li>
			</ul>
		</>
	);
}

export default NavLink;
