import React from 'react'
import PropTypes from 'prop-types'
import paginationLimits from 'data/pagination-limits'
import './pagination-limit.css'

const PaginationLimit = ({ limitInState, onClick }) => {
	const limits = paginationLimits.limits

	return (
		<div className="pagination-limit">
			<span className="hidden-mobile">Show:</span>
			{limits.map((limit, index) => {
				return (
					<button
						key={`limit-${index}`}
						onClick={() => onClick(limit)}
						className={`btn ${limit === limitInState ? 'btn-primary' : 'btn-inverse'}`}
					>
						{limit}
					</button>
				)
			})}
		</div>
	)
}
PaginationLimit.propTypes = {
	limitInState: PropTypes.string,
	onClick: PropTypes.func
}

export default PaginationLimit
