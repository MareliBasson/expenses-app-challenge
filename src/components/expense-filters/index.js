import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CategoryFilter from 'components/category-filter'
import DateRangeFilter from 'components/date-range-filter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import './expense-filters.css'

function ExpenseFilters({ selectedCategory, startDate, endDate, resetFilter }) {
	const [dropdownExpanded, setDropdownExpanded] = useState(false)

	function toggleDropdown() {
		setDropdownExpanded(!dropdownExpanded)
	}

	return (
		<div className="expense-filters">
			<div className="filter-mobile-header hidden-desktop" onClick={toggleDropdown}>
				<div className="title">
					{dropdownExpanded ? (
						<FontAwesomeIcon icon={faChevronUp} />
					) : (
						<FontAwesomeIcon icon={faChevronDown} />
					)}
					Filters:
				</div>
				<button
					onClick={e => resetFilter(e)}
					className="btn btn-primary"
					disabled={!(startDate || endDate || selectedCategory)}
				>
					Clear Filters
				</button>
			</div>

			<div
				className={`filter-content${dropdownExpanded ? ' active' : ''}`}
				style={{ overflow: dropdownExpanded ? 'visible' : 'hidden' }}
			>
				<div className="title hidden-mobile">
					<div className="title">Filters</div>
				</div>

				<CategoryFilter />

				<DateRangeFilter />

				<button
					onClick={e => resetFilter(e)}
					className="btn btn-primary hidden-mobile"
					disabled={!(startDate || endDate || selectedCategory)}
				>
					Clear
				</button>

				<div className="close-dropdown hidden-desktop" onClick={toggleDropdown}>
					<FontAwesomeIcon icon={faChevronUp} />
				</div>
			</div>

			<div
				className={`filter-overlay hidden-desktop${dropdownExpanded ? ' visible' : ''}`}
				onClick={toggleDropdown}
			></div>
		</div>
	)
}

ExpenseFilters.propTypes = {
	selectedCategory: PropTypes.string,
	startDate: PropTypes.instanceOf(Date),
	endDate: PropTypes.instanceOf(Date),
	resetFilter: PropTypes.func
}

export default ExpenseFilters
