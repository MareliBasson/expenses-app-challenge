import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Header from './header'
import SidebarLeft from 'components/sidebar-left'
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
		const { children, themed } = this.props

		console.log(this.props)

		return (
			<div className={`layout${themed ? ' alt-theme' : ''}`}>
				<SidebarLeft open={sidebarVisible} toggleSidebar={this.toggleSidebar} />
				<div className={`page-body`}>
					<Header toggleSidebar={this.toggleSidebar} />
					<div className="content">{children}</div>
				</div>
				<div className={`easter-egg${this.props.location.pathname === '/' ? ' work-time' : ''}`}>
					<img src={require('images/easter-egg.gif')} alt="" />
				</div>
			</div>
		)
	}
}

DefaultLayout.propTypes = {
	children: PropTypes.any,
	themed: PropTypes.bool
}

export default withRouter(DefaultLayout)
