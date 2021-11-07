import { SmileOutlined } from "@ant-design/icons";

const customizeRenderEmpty = () => (
	<div style={{ textAlign: "center", color: "gray" }}>
		<SmileOutlined style={{ fontSize: 20 }} />
		<p>Data Not Found</p>
	</div>
);

const RenderTest = () => (
	<div style={{ textAlign: "center", color: "gray" }}>
		<SmileOutlined style={{ fontSize: 20 }} />
		<p>Data Not Found</p>
	</div>
);

export { customizeRenderEmpty, RenderTest};
