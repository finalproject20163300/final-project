import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { user_login } from "_actions/user_actions";
import Cookies from "universal-cookie";

function Form_login() {
	const dispatch = useDispatch();
	const cookies = new Cookies();
	const history = useHistory();

	function onFinish(values) {
		let dataToSubmit = {
			email: values.email,
			password: values.password,
		};
		dispatch(user_login(dataToSubmit))
			.then((res) => {
				console.log("결과", res);
				if (res.payload.success === true) {
					window.localStorage.setItem("userId", res.payload.userId);
					// cookie set 사용법
					cookies.set("w_auth", res.payload.user.token, { path: "/" });
					history.push("/");
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}
	return (
		<>
			<br/><br/><br/><br/><br/><br/>
			<Form
				name="LoginForm"
				className="login-form"
				initialValues={{
					remember: false,
				}}
				onFinish={onFinish}
			>
				<div id="Logo">
					<Link to={"/"}>Login</Link>
				</div>
				<Form.Item
					name="email"
					rules={[
						{
							required: true,
							message: "Please input your Email!",
						},
					]}
				>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="Email"
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: "Please input your Password!",
						},
					]}
				>
					<Input.Password
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="Password"
					/>
				</Form.Item>
				<Form.Item style={{ display: "none" }}>
					<Form.Item name="remember" valuePropName="checked" noStyle>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>

					<a className="login-form-forgot" href="">
						Forgot password
					</a>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
					>
						Log in
					</Button>
					Or <a href="/register">register now!</a>
				</Form.Item>
			</Form>
		</>
	);
}

export default Form_login;
