import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import sitemap from 'data/sitemap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import './header.css'

class Header extends Component {
	render() {
		const { location, toggleSidebar } = this.props

		return (
			<div className="header">
				<h2>
					<div className="sidebar-toggle" onClick={toggleSidebar}>
						<FontAwesomeIcon icon={faEllipsisV} />
					</div>
					{sitemap[location.pathname]}
				</h2>
			</div>
		)
	}
}

export default withRouter(Header)
