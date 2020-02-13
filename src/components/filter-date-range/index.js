import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import './filter-date-range.css'

class FilterDateRange extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const { entryDates, startDate, endDate, handleFilter, resetFilter, setDate } = this.props

		return (
			<div className="filter-date-range text-center">
				Filter by:
				<DatePicker
					dateFormat="dd MMM yyyy"
					selected={startDate}
					onChange={date => setDate(date, 'startDate')}
					selectsStart
					highlightDates={entryDates}
					startDate={startDate}
					endDate={endDate}
					maxDate={new Date()}
				/>
				<DatePicker
					dateFormat="dd MMM yyyy"
					selected={endDate}
					onChange={date => setDate(date, 'endDate')}
					selectsEnd
					highlightDates={entryDates}
					startDate={startDate}
					endDate={endDate}
					maxDate={new Date()}
					minDate={startDate}
				/>
				<button onClick={handleFilter} className="btn btn-primary">
					Filter
				</button>
				<button onClick={resetFilter} className="btn btn-primary">
					Reset
				</button>
			</div>
		)
	}
}

export default FilterDateRange
