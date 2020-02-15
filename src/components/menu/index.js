import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faCog } from '@fortawesome/free-solid-svg-icons'
import './menu.css'

class Menu extends Component {
	render() {
		const { toggleSidebar } = this.props
		return (
			<div className="menu">
				<NavLink activeClassName="active" exact to="/" onClick={toggleSidebar}>
					<span>
						<FontAwesomeIcon icon={faDollarSign} />
					</span>
					Expenses
				</NavLink>
				<NavLink activeClassName="active" to="/settings" onClick={toggleSidebar}>
					<span>
						<FontAwesomeIcon icon={faCog} />
					</span>
					Settings
				</NavLink>
			</div>
		)
	}
}

export default Menu
