import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ExpensesPage from 'pages/expenses'
import SettingsPage from 'pages/settings'
import DefaultLayout from 'components/default-layout'

const Routes = () => {
	return (
		<Router>
			<DefaultLayout>
				<Route exact path="/" component={ExpensesPage} />
				<Route path="/settings" component={SettingsPage} />
			</DefaultLayout>
		</Router>
	)
}

export default Routes
