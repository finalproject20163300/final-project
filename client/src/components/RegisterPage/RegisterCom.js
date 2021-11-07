import axios from "axios";
import Cookies from 'universal-cookie';


function register(prop, values) {
	const cookies = new Cookies();
	const props = prop.props;
	const req = axios
		.post("http://34.64.219.37:5000/api/users/register", {
      name: values.name,
			email: values.email,
      password: values.password,
			role: values.userType === 'Patient' ? 0 : 1,
		})
		.then((res) => {
			// .then : 응답(상태코드200~300미만)성공시
			console.log('회원가입 응답', res);
			// console.log(res.data.user.token);
			// if(res.data.loginSuccess==="Success"){ // 로그인 성공
			// cookies.set('w_auth', res.data.user.token, { path: '/' });
			// props.history.push('/');
			// } else {
			// 	alert('회원가입 실패');
			// }
		})
		.catch((err) => {
			console.error(err);
    });
  }

export { register };
