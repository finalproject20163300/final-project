import { Header } from "antd/lib/layout/layout";
import NavBar from "components/common/Nav/NavBar";
import React from "react";

import LinkPage from "../LinkPage/LinkPage";
function HomePage() {
	return (
		<>
			<Header
						id="Header"
						className="site-layout-background"
						style={{ padding: 0, backgroundColor: "#fff" }}
					>
						<NavBar />
					</Header>
			<LinkPage />
		</>
	);
}

export default HomePage;
