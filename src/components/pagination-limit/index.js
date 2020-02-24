import React from 'react'
import PropTypes from 'prop-types'
import paginationLimits from 'data/pagination-limits'
import './pagination-limit.css'

const PaginationLimit = ({ limitInState, setLimit }) => {
	const limits = paginationLimits.limits

	return (
		<div className="pagination-limit">
			<span>Show:</span>
			<span className="hidden-mobile">
				{limits.map((limit, index) => {
					return (
						<button
							key={`limit-${index}`}
							value={limit}
							onClick={(e) => setLimit(e)}
							className={`btn ${limit === limitInState ? 'btn-primary' : 'btn-inverse'}`}
						>
							{limit}
						</button>
					)
				})}
			</span>

			<span className="hidden-desktop">
				<select name="" onChange={(e) => setLimit(e)}>
					{limits.map((limit, index) => {
						return (
							<option
								key={`limit-${index}`}
								
								
							>
								{limit}
							</option>
						)
					})}
				</select>
			</span>

		</div>
	)
}
PaginationLimit.propTypes = {
	limitInState: PropTypes.string,
	onClick: PropTypes.func
}

export default PaginationLimit
