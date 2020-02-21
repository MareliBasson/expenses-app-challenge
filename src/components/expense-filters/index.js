import React from 'react'
import CategoryFilter from 'components/category-filter'
import DateRangeFilter from 'components/date-range-filter'
import './expense-filters.css'

const ExpenseFilters = ({ selectedCategory, startDate, endDate, resetFilter }) => (
	<div className="expense-filters">
		<div className="filter-mobile-toggle">
			<div className="title">Filter expenses:</div>
			<button
				onClick={resetFilter}
				className="btn btn-primary"
				disabled={!(startDate || endDate || selectedCategory)}
			>
				Clear
			</button>
		</div>

		<div className="filter-dropdown">
			<CategoryFilter />

			<DateRangeFilter />
		</div>
	</div>
)

export default ExpenseFilters
