import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import './filter-date-range.css'

const FilterDateRange = ({ entryDates, startDate, endDate, resetFilter, setDate }) => (
	<div className="filter-date-range ">
		<DatePicker
			dateFormat="dd MMM yyyy"
			selected={startDate}
			onChange={date => {
				setDate(date, 'startDate')
			}}
			selectsStart
			highlightDates={entryDates}
			startDate={startDate}
			endDate={endDate}
			maxDate={endDate ? endDate : new Date()}
			placeholderText={'From:'}
		/>
		<DatePicker
			dateFormat="dd MMM yyyy"
			selected={endDate}
			onChange={date => {
				setDate(date, 'endDate')
			}}
			selectsEnd
			highlightDates={entryDates}
			startDate={startDate}
			endDate={endDate}
			maxDate={new Date()}
			minDate={startDate}
			placeholderText={'To:'}
		/>
		<button onClick={resetFilter} className="btn btn-primary" disabled={!(startDate || endDate)}>
			Reset
		</button>
	</div>
)

FilterDateRange.propTypes = {
	entryDates: PropTypes.array,
	startDate: PropTypes.string,
	endDate: PropTypes.string,
	resetFilter: PropTypes.func,
	setDate: PropTypes.func
}

export default FilterDateRange
