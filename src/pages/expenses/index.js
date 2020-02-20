import React, { Component } from 'react'
import ExpensesList from 'components/expenses-list'
import DateRangeFilter from 'components/date-range-filter'
import Pagination from 'components/pagination'
import PaginationLimit from 'components/pagination-limit'
import {
	fetchData,
	setPaginationLimit,
	goToPage,
	filterExpenses,
	resetFilter,
	setCategory,
	setDate
} from 'utils/helpers'
import ExpenseCategories from 'data/expense-categories'
import './expenses.css'

export const ExpensesContext = React.createContext()

class ExpensesPage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			visibleExpenses: [],
			allExpenses: [],
			expenseDates: [],
			entriesTotal: 0,
			limit: '10',
			page: 1,
			selectedCategory: '',
			startDate: null,
			endDate: null,
			filterActive: false,
			fetchError: false,
			busyFetching: false
		}

		this.initialise = this.initialise.bind(this)

		// Imported functions
		this.fetchData = fetchData.bind(this)
		this.setPaginationLimit = setPaginationLimit.bind(this)
		this.goToPage = goToPage.bind(this)
		this.filterExpenses = filterExpenses.bind(this)
		this.setDate = setDate.bind(this)
		this.setCategory = setCategory.bind(this)
		this.resetFilter = resetFilter.bind(this)
	}

	initialise() {
		this.fetchData(this.state.page, this.state.limit, 'visibleExpenses')

		// Set Calendar Highlights
		this.fetchData(0, null, 'allExpenses', () => {
			const expenseDates = this.state.allExpenses.map(expense => Date.parse(expense.date))

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
			selectedCategory,
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
						<div className="title">Filters:</div>
						<div className="category-filter">
							<select
								name="category"
								className=""
								onChange={e => {
									this.setCategory(e)
								}}
								value={selectedCategory ? selectedCategory : ''}
							>
								<option value="">Category:</option>
								{categories.map((category, index) => {
									return (
										<option key={`category-option-${index}`} value={category}>
											{category}
										</option>
									)
								})}
							</select>
						</div>
						{this.state.expenseDates && (
							<DateRangeFilter
								expenseDates={expenseDates}
								setDate={this.setDate}
								startDate={startDate}
								endDate={endDate}
							/>
						)}

						<button
							onClick={this.resetFilter}
							className="btn btn-primary"
							disabled={!(startDate || endDate || selectedCategory)}
						>
							Clear
						</button>
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
