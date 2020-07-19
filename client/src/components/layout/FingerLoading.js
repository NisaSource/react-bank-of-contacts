import React, { Fragment } from "react";
import { Spinner } from "reactstrap";

export default () => (
	<Fragment>
		<Spinner
			size="sm"
			color="warning"
			style={{
				padding: "50px",
				width: "200px",
				height: "200px",
				margin: "auto",
				display: "block ",
			}}
			alt="Loading..."
		/>
	</Fragment>
);
