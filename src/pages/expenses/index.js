import React, { Component, Fragment } from 'react'
import ExpensesList from 'components/expenses-list'
import DateRangeFilter from 'components/date-range-filter'
import Pagination from 'components/pagination'
import expenseLimits from 'data/expense-limits'
import { fetchData, goToPrev, goToNext, filterExpenses, resetFilter, setDate } from 'utils/helpers'

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
			expenseDates: [],
			fetchError: false,
			busyFetching: false,
			categories: [
				'Advertising',
				'Vehicle',
				'Payroll',
				'Employee benefits',
				'Meals',
				'Entertainment',
				'Office supplies',
				'Travel'
			]
		}

		this.initialise = this.initialise.bind(this)

		// Imported functions
		this.fetchData = fetchData.bind(this)
		this.goToNext = goToNext.bind(this)
		this.goToPrev = goToPrev.bind(this)
		this.filterExpenses = filterExpenses.bind(this)
		this.resetFilter = resetFilter.bind(this)
		this.setDate = setDate.bind(this)
	}

	initialise() {
		this.fetchData(1, this.state.limit, 'visibleExpenses')

		// Set Calendar Highlights
		this.fetchData(1, null, 'allEntries', () => {
			const expenseDates = this.state.allEntries.map(expense => Date.parse(expense.date))

			this.setState({
				expenseDates: [{ 'date-highlight': expenseDates }]
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
			expenseDates,
			filterActive,
			fetchError,
			busyFetching,
			categories
		} = this.state

		const limits = expenseLimits.limits

		// console.log(this.state.categories)

		return (
			<ExpensesContext.Provider
				value={{
					fetchData: () => {
						return this.fetchData(this.state.page, this.state.limit, 'visibleExpenses')
					},
					categories: categories
				}}
			>
				<div className="expenses-page">
					<div className="filter-bar">
						{this.state.expenseDates && (
							<DateRangeFilter
								expenseDates={expenseDates}
								resetFilter={this.resetFilter}
								filterExpenses={this.filterExpenses}
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

					<div className="expenses-footer">
						<div className="expense-limit">
							{!filterActive && (
								<Fragment>
									<span className="hidden-mobile">Show:</span>
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

						{/* Toggle between showing number of entries and pagination */}
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
