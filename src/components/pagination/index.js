import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import './pagination.css'

class Pagination extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const { page, total, limit, handlePrev, handleNext } = this.props

		return (
			<div className="pagination text-right">
				<button className="btn btn-primary" onClick={handlePrev} disabled={page === 1}>
					<FontAwesomeIcon icon={faChevronLeft} />
				</button>
				<div className="page-count">
					{page}/{Math.ceil(total / limit)}
				</div>
				<button className="btn btn-primary" onClick={handleNext} disabled={page === Math.ceil(total / limit)}>
					<FontAwesomeIcon icon={faChevronRight} />
				</button>
			</div>
		)
	}
}

Pagination.propTypes = {
	page: PropTypes.number,
	total: PropTypes.number,
	limit: PropTypes.string
}

export default Pagination
