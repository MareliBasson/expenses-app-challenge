import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import sitemap from 'data/sitemap'
import './header.css'

class Header extends Component {
	render() {
		const { location } = this.props

		return (
			<div className="header">
				<h2>{sitemap[location.pathname]}</h2>
			</div>
		)
	}
}

export default withRouter(Header)
