import React, { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ExpensesPage from 'pages/expenses'
import SettingsPage from 'pages/settings'
import DefaultLayout from 'components/default-layout'

function Routes() {
	const [themeActive, setThemeActive] = useState(false)

	function toggleTheme(e) {
		if (e.target.value === 'themed') {
			setThemeActive(true)
		} else {
			setThemeActive(false)
		}
	}

	return (
		<Router>
			<DefaultLayout themed={themeActive}>
				<Route exact path="/" component={ExpensesPage} />
				<Route
					path="/settings"
					component={() => <SettingsPage setTheme={e => toggleTheme(e)} selectedTheme={themeActive} />}
				/>
			</DefaultLayout>
		</Router>
	)
}

export default Routes
