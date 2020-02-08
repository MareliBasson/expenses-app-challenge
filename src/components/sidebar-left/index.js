import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Menu from 'components/menu'
import './sidebar-left.css'

import logo from 'images/logo-white.png'

class SidebarLeftt extends Component {
	render() {
		return (
			<div className="sidebar-left">
				<div className="logo">
					<img src={logo} alt="" />
				</div>
				<div className="navigation">
					<div className="sidebar-item">Expenses</div>
					<div className="sidebar-item">Users</div>
					<Menu />
				</div>
			</div>
		)
	}
}

SidebarLeftt.propTypes = {
	children: PropTypes.any,
	pageHead: PropTypes.string
}

export default SidebarLeftt
