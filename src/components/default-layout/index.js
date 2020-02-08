import React, { Component } from 'react'
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

export default DefaultLayout
