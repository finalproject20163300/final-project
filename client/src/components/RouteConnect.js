import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from "hoc/auth";
// components
import HomePage from "components/HomePage/HomePage";
import ProjectPage from "components/ProjectPage/ProjectPage";
import TestPage from "components/TestPage/TestPage";
import LoginPage from "components/LoginPage/LoginPage";
import SignIn from "components/SignIn";
import NotFound from "components/common/NotFound/NotFound";
import RegisterPage from "components/RegisterPage/RegisterPage";
import LogoutPage from "components/common/Logout/LogoutPage";
import IconTest from "components/TestPage/IconTest";
import UtilPage from 'components/UtilPage/UtilPage';
import ProfilePage from './ProjectPage/ProfilePage';
import IntroPage from './IntroPage/IntroPage';

function RouteConnect() {
	return (
		<Switch>
		<Route exact path="/" component={ProjectPage} />
		<Route path="/test" component={Auth(TestPage, true)} />
		<Route path="/project" component={Auth(ProjectPage, null)} /> {/*profject/profile 프로필 페이지*/}
		<Route path="/register" component={Auth(RegisterPage, false)} />
		<Route path="/login" component={Auth(LoginPage, false)} />
		<Route path="/logout" component={Auth(LogoutPage, null)} />
		<Route path="/SignIn" component={SignIn} />
		<Route path="/iconTest" component={IconTest} />
		<Route path="/util" component={UtilPage} />
		{/* <Route path="/profile" component={ProfilePage} /> 테스트용 프로필 페이지 */}
		<Route path="/intro" component={Auth(IntroPage, null)} />
		<Route path="/Page3" component={Auth(UtilPage, null)} />
		<Route path="*" component={NotFound} /> {/*가장 아래*/}
	</Switch>
	);
}

export default RouteConnect;