import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from 'components/header'
import SidebarLeft from 'components/sidebar-left'
// import Footer from 'components/footer'
import './page-template.css'

class PageTemplate extends Component {
	render() {
		const { children, title } = this.props

		return (
			<div className="page">
				<SidebarLeft />
				<Header />
				<div className="content">
					<div className="container">
						<h1>{title}</h1>
						{children}
					</div>
				</div>
				{/* <Footer /> */}
			</div>
		)
	}
}

PageTemplate.propTypes = {
	children: PropTypes.any,
	title: PropTypes.string
}

export default PageTemplate
