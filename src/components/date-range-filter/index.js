import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import './date-range-filter.css'

const DateRangeFilter = ({ expenseDates, startDate, endDate, resetFilter, setDate }) => (
	<div className="date-range-filter ">
		<DatePicker
			dateFormat="dd MMM yyyy"
			selected={startDate}
			onChange={date => {
				setDate(date, 'startDate')
			}}
			selectsStart
			highlightDates={expenseDates}
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
			highlightDates={expenseDates}
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

DateRangeFilter.propTypes = {
	expenseDates: PropTypes.array,
	startDate: PropTypes.instanceOf(Date),
	endDate: PropTypes.instanceOf(Date),
	resetFilter: PropTypes.func,
	setDate: PropTypes.func
}

export default DateRangeFilter
