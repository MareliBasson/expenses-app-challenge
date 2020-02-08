import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from 'components/header'
import SidebarLeft from 'components/sidebar-left'
// import Footer from 'components/footer'
import './default-layout.css'

class DefaultLayout extends Component {
	render() {
		const { children } = this.props

		return (
			<div className="layout">
				<SidebarLeft />
				<div className="page-body">
					<Header />
					<div className="content">{children}</div>
					{/* <Footer /> */}
				</div>
			</div>
		)
	}
}

DefaultLayout.propTypes = {
	children: PropTypes.any,
	title: PropTypes.string
}

export default DefaultLayout
