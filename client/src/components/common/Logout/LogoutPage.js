import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { auth, user_logout } from "_actions/user_actions";

function LogoutPage() {
	const dispatch = useDispatch();
	const history = useHistory();
	const cookies = new Cookies();

	// 3000번 포트 w_auth 쿠키에서 아이디 뽑아와야함
	function logout() {
		// dispatch(user_logout()).then((res) => {
		//   console.log(res);
		
		// dispatch(user_logout())
		// 	.then((res) => {
		// 		if (res.payload.status==='200') {
		// 			console.log(res);
		// 			history.push("/");
		// 		}
		// 	})
		// 	.catch((err) => {
		// 		console.error(err);
		// 	});
	}
	//   // history.push('/');
	// });
	//dispatch(user_auth()).then((res)=>{console.log(res);})
	return <>{logout()}</>;
}

export default LogoutPage;
