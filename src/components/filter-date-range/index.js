import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import './filter-date-range.css'

class FilterDateRange extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const { entryDates, startDate, endDate, resetFilter, setDate } = this.props

		return (
			<div className="filter-date-range ">
				Date:
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
	}
}

export default FilterDateRange
