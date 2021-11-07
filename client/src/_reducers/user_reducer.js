import * as types from "_actions/ActionTypes";

export default function index(state = {}, action) {
	switch (action.type) {
		case types.USER_LOGIN:
			return { ...state, login: action.payload };
		case types.USER_LOGOUT:
			return { ...state, logout: action.payload };
		case types.USER_AUTH:
			return { ...state, auth: action.payload };
		case types.USER_TEST:
			return { ...state, test: action.payload };
		case types.USER_INFO:
			return { ...state, info: action.payload };
		default:
			return state;
	}
}
