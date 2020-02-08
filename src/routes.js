import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from 'pages/home'
import SettingsPage from 'pages/settings'
import DefaultLayout from 'components/default-layout'

const Routes = () => {
	return (
		<Router>
			<DefaultLayout>
				<Route exact path="/" component={HomePage} />
				<Route path="/settings" component={SettingsPage} />
			</DefaultLayout>
		</Router>
	)
}

export default Routes
