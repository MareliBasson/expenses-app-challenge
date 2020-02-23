import React, { useState } from 'react'
import CategoryFilter from 'components/category-filter'
import DateRangeFilter from 'components/date-range-filter'
import { TweenMax, TimelineLite } from 'gsap'
import './expense-filters.css'

function ExpenseFilters({ selectedCategory, startDate, endDate, resetFilter }) {
	const [dropdownExpanded, setDropdownExpanded] = useState(false)

	function toggleDropdown() {
		if (!dropdownExpanded) {
			setDropdownExpanded(true)
			TweenMax.set('.filter-content', { overflow: 'visible' })
		} else {
			TweenMax.set('.filter-content', { overflow: 'hidden' })
			setDropdownExpanded(false)
		}
	}

	return (
		<div className="expense-filters">
			<div className="filter-mobile-header hidden-desktop" onClick={toggleDropdown}>
				<div className="title">Filters:</div>
				<button
					onClick={e => resetFilter(e)}
					className="btn btn-primary"
					disabled={!(startDate || endDate || selectedCategory)}
				>
					Clear
				</button>
			</div>

			<div className={`filter-content${dropdownExpanded ? ' active' : ''}`}>
				<div className="title hidden-mobile">
					<div className="title">Filters:</div>
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
					close
				</div>
			</div>

			<div
				className={`filter-overlay hidden-desktop${dropdownExpanded ? ' visible' : ''}`}
				onClick={toggleDropdown}
			></div>
		</div>
	)
}

export default ExpenseFilters
