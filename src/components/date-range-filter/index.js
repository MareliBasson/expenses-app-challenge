import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './date-range-filter.css'
import { ExpensesContext } from 'pages/expenses'

const DateRangeFilter = () => {
	return (
		<ExpensesContext.Consumer>
			{data => (
				<div className="filter date-range-filter">
					<div className="filter-label">Date:</div>
					{data.expenseDates && (
						<div className="filter-input">
							<DatePicker
								dateFormat="dd MMM yyyy"
								selected={data.startDate}
								onChange={date => {
									data.setDate(date, 'startDate')
								}}
								selectsStart
								highlightDates={data.expenseDates}
								startDate={data.startDate}
								endDate={data.endDate}
								maxDate={data.endDate ? data.endDate : new Date()}
								placeholderText={'From:'}
								showMonthDropdown
								showYearDropdown
								dropdownMode="select"
							/>
							<DatePicker
								dateFormat="dd MMM yyyy"
								selected={data.endDate}
								onChange={date => {
									data.setDate(date, 'endDate')
								}}
								selectsEnd
								highlightDates={data.expenseDates}
								startDate={data.startDate}
								endDate={data.endDate}
								maxDate={new Date()}
								minDate={data.startDate}
								placeholderText={'To:'}
								showMonthDropdown
								showYearDropdown
								dropdownMode="select"
							/>
						</div>
					)}
				</div>
			)}
		</ExpensesContext.Consumer>
	)
}

export default DateRangeFilter
