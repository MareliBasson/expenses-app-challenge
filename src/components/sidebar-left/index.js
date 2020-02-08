import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './sidebar-left.css'

class SidebarLeftt extends Component {
	render() {
		return (
			<div className="sidebar-left">
				<div className="sidebar-item">Expenses</div>
				<div className="sidebar-item">Users</div>
			</div>
		)
	}
}

SidebarLeftt.propTypes = {
	children: PropTypes.any,
	pageHead: PropTypes.string
}

export default SidebarLeftt
