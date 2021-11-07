import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { Route } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import SideBar from "components/common/Nav/SideBar";
import FooterPage from "components/common/Footer/FooterPage";
import NavBar from "components/common/Nav/NavBar";
import IntroPage from "components/IntroPage/IntroPage";
import NotFound from "components/common/NotFound/NotFound";
import UploadPage from "components/UploadPage/UploadPage";
import LandingPage from 'components/LandingPage/LandingPage';
import ModelPage from "components/ModelPage/ModelPage";
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

function ProjectMain({ match, location }) {
	const [collapsed, setCollapsed] = useState(false);
	const [mode, setMode] = useState("inline");
	const [theme, setTheme] = useState("light");
	useEffect(() => {
		// 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
		document.title = `Project`;
	});
	const path_length = location.pathname.split("/");
	const path = path_length[path_length.length - 1];
	console.log("path:", path);

	function pathConnect() {
		switch (path) {
			case "":
				return <IntroPage/>;
			case "project":
				return <IntroPage/>;
			case "profile":
				return <ProfilePage />;
			case "result":
				return <ModelPage />;
			case "upload":
				return <UploadPage/>;
			case 'landing':
				return <LandingPage/>
			default:
				return <NotFound/>;
				// 메인으로 보내기
		}
	}

	return (
		<>
			<Layout style={{ height: "100vh" }}>
				<SideBar match={match} theme={theme}/>
				<Layout className="site-layout">
					<Header
						id="Header"
						className="site-layout-background"
						style={{ padding: 0, backgroundColor: "#fff" }}
					>
						<NavBar />
					</Header>
					<Content
						className="site-layout-background"
						style={{
							margin: "0px 0px",
							padding: 24,
							minHeight: "auto",
							backgroundColor: "rgb(251 251 251)",
						}}
					>
						{pathConnect()}
					</Content>
					{/* <FooterPage /> */}
				</Layout>
			</Layout>
			<Route exact path={`${match.path}`} />
		</>
	);
}

export default ProjectMain;
