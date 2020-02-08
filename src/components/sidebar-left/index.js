import React, { Component } from 'react'
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
					<Menu />
				</div>
			</div>
		)
	}
}

export default SidebarLeftt
