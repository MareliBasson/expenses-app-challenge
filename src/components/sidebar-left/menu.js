import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faCog } from '@fortawesome/free-solid-svg-icons'
import './menu.css'

const Menu = ({ toggleSidebar }) => (
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

Menu.propTypes = {
	toggleSidebar: PropTypes.func
}

export default Menu
