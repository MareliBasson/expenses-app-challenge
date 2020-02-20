import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './date-range-filter.css'

const DateRangeFilter = ({ expenseDates, setDate, startDate, endDate }) => (
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
	</div>
)

DateRangeFilter.propTypes = {
	expenseDates: PropTypes.array,
	startDate: PropTypes.instanceOf(Date),
	endDate: PropTypes.instanceOf(Date),
	setDate: PropTypes.func
}

export default DateRangeFilter
