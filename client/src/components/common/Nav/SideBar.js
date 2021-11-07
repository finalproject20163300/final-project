import React, { useState } from "react";
import { Button, Layout, Menu, PageHeader, Switch } from "antd";
import {
	MailOutlined,
	AppstoreOutlined,
	SettingOutlined,
	LinkOutlined,
} from "@ant-design/icons";
import "Styles/css/Freev53.css";
import { withRouter, Link, Route } from "react-router-dom";
const { Sider } = Layout;
const { SubMenu } = Menu;

function SideBar({history, location, match}) {
	const [menukey, setMenukey] = useState("1");
  const [collapsed, setCollapsed] = useState(false); // 열린 상태에서 시작
	const [mode, setMode] = useState("inline"); // inline모드 (메뉴)
	const [theme, setTheme] = useState("light"); // 화이트 모드 실행
	function onCollapse() {
		setCollapsed(!collapsed);
	}

	return (
		<>
			<Sider theme={theme} collapsible collapsed={collapsed} onCollapse={onCollapse}>
				<div className="logo"><Link to={`${match.path}`}>AI-RAY</Link></div>
				<Menu
					className="deve"
					defaultSelectedKeys={[menukey]}
					defaultOpenKeys={["sub1", "sub2"]}
					mode={mode}
					theme={theme}
				>
					<Menu.Item key="1" icon={<AppstoreOutlined />}>
						<Link to={'/project'}>홈페이지</Link>
					</Menu.Item>
					{/* <Menu.Item key="2" icon={<MailOutlined />}>
						<Link to={'/project/profile'}>프로필</Link>
					</Menu.Item> */}
					<SubMenu key="sub1" icon={<AppstoreOutlined />} title="이미지">
						<Menu.Item key="3">
							<Link to={'/project/upload'}>이미지 업로드</Link>
						</Menu.Item>
							<Menu.Item key="5"><Link to={'/project/landing'}>이미지 선택</Link></Menu.Item>
							<Menu.Item key="6"><Link to={'/project/result'}>결과 확인</Link></Menu.Item>
					</SubMenu>
					{/* <SubMenu key="sub2" icon={<SettingOutlined />} title="설정">
						<Menu.Item key="7">페이지 설정</Menu.Item>
					</SubMenu> */}
					<Menu.Item key="link" icon={<LinkOutlined />}>
						<a
							href="https://github.com/finalproject20163300/final-project"
							target="_blank"
							rel="noopener noreferrer"
						>
							Git
						</a>
					</Menu.Item>
				</Menu>
			</Sider>
		</>
	);
}

export default SideBar;
