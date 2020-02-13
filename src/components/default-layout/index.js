import React, { Component } from 'react'
import Header from 'components/header'
import SidebarLeft from 'components/sidebar-left'
// import Footer from 'components/footer'
import './default-layout.css'

class DefaultLayout extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sidebarVisible: false
		}

		this.toggleSidebar = this.toggleSidebar.bind(this)
	}

	toggleSidebar() {
		this.setState({
			sidebarVisible: !this.state.sidebarVisible
		})
	}

	render() {
		const { sidebarVisible } = this.state
		const { children } = this.props

		return (
			<div className="layout">
				<SidebarLeft open={sidebarVisible} toggleSidebar={this.toggleSidebar} />
				<div className={`page-body`}>
					<Header toggleSidebar={this.toggleSidebar} />
					<div className="content">{children}</div>
					{/* <Footer /> */}
				</div>
			</div>
		)
	}
}

export default DefaultLayout
