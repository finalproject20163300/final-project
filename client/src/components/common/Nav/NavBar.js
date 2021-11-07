import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

import { Menu } from "antd";
import {
	AppstoreOutlined,
	MailOutlined,
	SettingOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import { useDispatch } from "react-redux";
import { user_logout } from "_actions/user_actions";
import axios from "axios";
import { SERVER, API_USER } from 'components/Config';
function NavBar() {
	const dispatch = useDispatch();
	const history = useHistory();
	const cookies = new Cookies();

	const [current, setCurrent] = useState("");
	const [loginState, setLoginState] = useState(false);

	useEffect(() => {
		setLoginState(cookies.get("w_auth")); // 일단 쿠키 존재하면 무조건 Login
	}, []);

	function handleClick(e) {
		console.log("click ", e);
		setCurrent({ current: e.key });
	}
	// function logoutHandler(){
	// 	dispatch(user_logout()).then((res) => {
	// 		console.log(res);
	// 		if (res.payload.status === '200') { // server의 logout 과정이 성공했다면
	// 			cookies.remove("w_auth", { path: "/" });
	// 			//history.push('/'); // 과거에 사용하던 방법
	// 			window.location.replace("/")
	// 		}
	// 	});
	// };
	const logoutHandler = () => {
    axios.get(`${SERVER}${API_USER}/logout`).then(response => {
      if (response.status === 200) {
				cookies.remove("w_auth", { path: "/" });
				window.location.replace("/");
      } else {
        alert('Log Out Failed')
      }
    });
  };

	function subMenu() {
		// auth 이용해서 처리. 아이디는 redux에 저장할까? auth에서 처리하고
		// auth에서 redux store로 정보를 넘겨주는거지
		if (loginState) {
			return (
				<>
					<Menu.Item key="1">
						<Link to="/project/upload">업로드</Link>
					</Menu.Item>
					<Menu.Item key="4">
						<a onClick={logoutHandler}>로그아웃</a>
					</Menu.Item>
				</>
			);
		} else {
			return (
				<>
					<Menu.Item key="1">
						<Link to="/login">Sign In</Link>
					</Menu.Item>
					<Menu.Item key="2">
						<Link to="/register">Sign Up</Link>
					</Menu.Item>
				</>
			);
		}
	}

	return (
		<>
			<Menu
			  
				onClick={handleClick}
				selectedKeys={[current]}
				mode="horizontal"
				id="menu_horizon"
			>
				{subMenu()}
			</Menu>
		</>
	);
}

export default NavBar;
