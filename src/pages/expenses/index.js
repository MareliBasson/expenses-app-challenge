import React, { Component } from 'react'
import ExpensesList from 'components/expenses-list'
import DateRangeFilter from 'components/date-range-filter'
import Pagination from 'components/pagination'
import PaginationLimit from 'components/pagination-limit'
import { fetchData, setPaginationLimit, goToPage, filterExpenses, resetFilter, setDate } from 'utils/helpers'
import ExpenseCategories from 'data/expense-categories'
import './expenses.css'

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
			busyFetching: false
		}

		this.initialise = this.initialise.bind(this)

		// Imported functions
		this.fetchData = fetchData.bind(this)
		this.setPaginationLimit = setPaginationLimit.bind(this)
		this.goToPage = goToPage.bind(this)
		this.filterExpenses = filterExpenses.bind(this)
		this.resetFilter = resetFilter.bind(this)
		this.setDate = setDate.bind(this)
	}

	initialise() {
		this.fetchData(this.state.page, this.state.limit, 'visibleExpenses')

		// Set Calendar Highlights
		this.fetchData(0, null, 'allEntries', () => {
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
			busyFetching
		} = this.state

		const categories = ExpenseCategories.categories

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
						<div>
							{!filterActive && (
								<PaginationLimit limitInState={limit} onClick={this.setPaginationLimit} />
							)}
						</div>

						<div className="text-right">
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
									handleNext={() => this.goToPage(+1)}
									handlePrev={() => this.goToPage(-1)}
								/>
							)}
						</div>
					</div>
				</div>
			</ExpensesContext.Provider>
		)
	}
}

export default ExpensesPage
