import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Header from 'components/header'
import SidebarLeft from 'components/sidebar-left'
import Footer from 'components/footer'
import './default-layout.css'

import sitemap from 'data/sitemap'

class DefaultLayout extends Component {
	render() {
		const { children, location } = this.props

		console.log(sitemap)

		console.log(sitemap[location.pathname])

		return (
			<div className="page">
				<SidebarLeft />
				<div className="page-body">
					<Header />
					<div className="content">
						<div className="container">
							<h1>{sitemap[location.pathname]}</h1>
							{children}
						</div>
					</div>
					<Footer />
				</div>
			</div>
		)
	}
}

DefaultLayout.propTypes = {
	children: PropTypes.any,
	title: PropTypes.string
}

export default withRouter(DefaultLayout)
