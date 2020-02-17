import React from 'react'
import PropTypes from 'prop-types'
import Menu from './menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import logo from 'images/logo-white.png'
import './sidebar-left.css'

const SidebarLeft = ({ open, toggleSidebar }) => (
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

SidebarLeft.propTypes = {
	open: PropTypes.bool,
	toggleSidebar: PropTypes.func
}

export default SidebarLeft
