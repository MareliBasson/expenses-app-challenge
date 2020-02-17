import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import navigation from 'data/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

const Header = ({ location, toggleSidebar }) => (
	<div className="header">
		<h2>
			<div className="sidebar-toggle" onClick={toggleSidebar}>
				<FontAwesomeIcon icon={faEllipsisV} />
			</div>
			{navigation[location.pathname]}
		</h2>
	</div>
)

Header.propTypes = {
	location: PropTypes.object,
	toggleSidebar: PropTypes.func
}

export default withRouter(Header)
