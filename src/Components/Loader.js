import React from 'react';
import '../Styles/Loader.css';
export default function Loader() {
	return (
		<React.Fragment>
			<div className="lds-roller">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</React.Fragment>
	);
}
