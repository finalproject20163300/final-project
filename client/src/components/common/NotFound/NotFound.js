import React from "react";

import { Empty, Button } from "antd";
import * as custom from "Styles/custom";
import { useHistory } from "react-router";

function NotFound() {
	const history = useHistory();
	return (
		<>
			<div id="Layout_NotFound">
				<Empty description={false} />
				{custom.customizeRenderEmpty()}
				<Button href="/">메인 화면으로</Button>
				<Button
					onClick={() => {
						history.goBack();
					}}
				>
					이전 페이지로
				</Button>
			</div>
		</>
	);
}

export default NotFound;
