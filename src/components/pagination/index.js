import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import './pagination.css'

const Pagination = ({ page, total, limit, handlePrev, handleNext }) => (
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

Pagination.propTypes = {
	page: PropTypes.number,
	total: PropTypes.number,
	limit: PropTypes.string,
	handlePrev: PropTypes.func,
	handleNext: PropTypes.func
}

export default Pagination
