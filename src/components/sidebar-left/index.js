import React, { Component } from 'react'
import Menu from 'components/menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './sidebar-left.css'

import logo from 'images/logo-white.png'

class SidebarLeftt extends Component {
	render() {
		const { open, toggleSidebar } = this.props
		return (
			<div className={`sidebar-wrapper${open ? ' open' : ''}`}>
				<div className="sidebar-left">
					<div className="close-btn" onClick={toggleSidebar}>
						<FontAwesomeIcon icon={faTimes} />
					</div>
					<div className="logo">
						<img src={logo} alt="" />
					</div>
					<div className="navigation">
						<Menu toggleSidebar={toggleSidebar} />
					</div>
				</div>
				<div className="sidebar-overlay" onClick={toggleSidebar}></div>
			</div>
		)
	}
}

export default SidebarLeftt
