import axios from "axios";
import * as types from "./ActionTypes";
import { SERVER, API_USER } from "components/Config";


export function user_login(dataToSubmit) {
	const request = axios
		.post(`${SERVER}${API_USER}/login`, dataToSubmit)
		.then((res) => res.data)
		.catch((err) => {
			console.error(err);
		});
	return {
		//response
		type: types.USER_LOGIN,
		payload: request,
	};
}

export function user_logout() {
	const request = axios
		.get(`${SERVER}${API_USER}/logout`)
		.then((res) => {
			if(res.status === 200){
				return res;
			} else{
				alert('Logout Failed');
			}
		});
	return {
		type: types.USER_LOGOUT,
		payload: request,
	};
}
export function auth(){	
	const request = axios.get(`${SERVER}${API_USER}/auth`, {
		withCredentials: true})
		.then(response => response.data);
	return {
		type: types.USER_AUTH,
		payload: request,
	};
}

export function user_info(dataToSubmit){	
	const request = axios
		.post(`${SERVER}${API_USER}/info`, dataToSubmit)
		.then((res) => res.data)
		.catch((err) => {
			console.error(err);
		});
	return {
		type: types.USER_INFO,
		payload: request,
	};
}

export function test() {
	console.log("redux test");
	return {
		type: types.USER_TEST,
		payload: "redux test",
	};
}