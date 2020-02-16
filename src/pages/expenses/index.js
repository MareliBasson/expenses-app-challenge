import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import moment from 'moment'
import ExpensesList from 'components/expenses-list'
import DateRangeFilter from 'components/date-range-filter'
import Pagination from 'components/pagination'
import { fetchData } from 'utils/helpers'

import './expenses.css'
import 'react-datepicker/dist/react-datepicker.css'

export const ExpensesContext = React.createContext()

class ExpensesPage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			visibleExpenses: [],
			entriesTotal: 0,
			limit: '10',
			page: 1,
			startDate: null,
			endDate: null,
			filterActive: false,
			allEntries: [],
			entryDates: [],
			fetchError: false,
			busyFetching: false
		}

		this.initialise = this.initialise.bind(this)
		this.fetchData = fetchData.bind(this)
		this.goToNext = this.goToNext.bind(this)
		this.goToPrev = this.goToPrev.bind(this)
		this.handleFilter = this.handleFilter.bind(this)
		this.resetFilter = this.resetFilter.bind(this)
		this.setDate = this.setDate.bind(this)
	}

	// Pagination Functions
	goToPrev() {
		this.setState(
			{
				page: this.state.page - 1
			},
			() => {
				this.fetchData(this.state.page, this.state.limit, 'visibleExpenses')
			}
		)
	}

	goToNext() {
		this.setState(
			{
				page: this.state.page + 1
			},
			() => {
				this.fetchData(this.state.page, this.state.limit, 'visibleExpenses')
			}
		)
	}

	// Filter functions
	handleFilter() {
		const { startDate, endDate } = this.state

		const filterEntriesByRange = allExpenses => {
			const filterResult = _.filter(allExpenses, expense => {
				const expenseDate = moment(expense.date).format()

				return moment(expenseDate).isBetween(startDate, endDate)
			})

			this.setState({
				visibleExpenses: filterResult,
				filterActive: true
			})
		}

		this.fetchData(0, this.state.entriesTotal, 'allEntries', () => filterEntriesByRange(this.state.allEntries))
	}

	setDate(date, prop) {
		this.setState({ [prop]: date }, () => {
			if (this.state.startDate && this.state.endDate) {
				this.handleFilter()
			}
		})
	}

	resetFilter() {
		this.fetchData(this.state.page, this.state.limit, 'visibleExpenses')
		this.setState({
			startDate: null,
			endDate: null,
			filterActive: false
		})
	}

	initialise() {
		this.fetchData(1, this.state.limit, 'visibleExpenses')

		// Set Calendar Highlights
		this.fetchData(1, null, 'allEntries', () => {
			const entryDates = this.state.allEntries.map(expense => Date.parse(expense.date))

			this.setState({
				entryDates: [{ 'date-highlight': entryDates }]
			})
		})
	}

	componentDidMount() {
		this.initialise()
	}

	render() {
		const {
			visibleExpenses,
			entriesTotal,
			page,
			limit,
			endDate,
			startDate,
			entryDates,
			filterActive,
			fetchError,
			busyFetching
		} = this.state

		const limits = ['10', '25', '50', 'All']

		console.log('busyFetching: ' + busyFetching)

		return (
			<ExpensesContext.Provider
				value={{
					fetchData: () => {
						return this.fetchData(this.state.page, this.state.limit, 'visibleExpenses')
					}
				}}
			>
				<div className="expenses-page">
					<div className="actions">
						{this.state.entryDates && (
							<DateRangeFilter
								entryDates={entryDates}
								resetFilter={this.resetFilter}
								handleFilter={this.handleFilter}
								setDate={this.setDate}
								startDate={startDate}
								endDate={endDate}
							/>
						)}
					</div>

					<ExpensesList
						expenses={visibleExpenses}
						fetchData={() => {
							this.fetchData(this.state.page, this.state.limit, 'visibleExpenses')
						}}
						fetchError={fetchError}
						busyFetching={busyFetching}
					/>

					<div className="footer">
						<div className="number-of-entries">
							{!filterActive && (
								<Fragment>
									{limits.map((limit, index) => {
										return (
											<button
												key={`limit-${index}`}
												onClick={() => {
													this.setState({ limit: limit, page: 1 }, () => {
														this.fetchData(
															this.state.page,
															this.state.limit,
															'visibleExpenses'
														)
													})
												}}
												className={`btn ${
													limit === this.state.limit ? 'btn-primary' : 'btn-inverse'
												}`}
											>
												{limit}
											</button>
										)
									})}
								</Fragment>
							)}
						</div>

						{limit === 'All' || filterActive ? (
							<div className="entries-visible text-right">
								<strong>{visibleExpenses.length}</strong>&nbsp; entries
							</div>
						) : (
							<Pagination
								page={page}
								total={entriesTotal}
								limit={limit}
								handleNext={this.goToNext}
								handlePrev={this.goToPrev}
							/>
						)}
					</div>
				</div>
			</ExpensesContext.Provider>
		)
	}
}

export default ExpensesPage
