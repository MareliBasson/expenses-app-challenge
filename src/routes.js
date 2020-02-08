import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from 'pages/home'
import PageOne from 'pages/page1'
import DefaultLayout from 'components/default-layout'

const Routes = () => {
	return (
		<Router>
			<DefaultLayout>
				<Route exact path="/" component={HomePage} />
				<Route path="/page1" component={PageOne} />
			</DefaultLayout>
		</Router>
	)
}

export default Routes
