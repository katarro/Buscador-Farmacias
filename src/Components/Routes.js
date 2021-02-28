import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Start from './Start';
import Form from './Form';
import Results from './Results';

function Routes() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Start />
				</Route>
				<Route exact path="/form">
					<Form />
				</Route>
				<Route exact path="/form/results">
					<Results />
				</Route>
			</Switch>
		</Router>
	);
}
export default Routes;
