import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import ExpensesList from 'components/expenses-list'
import Pagination from 'components/pagination'

import './expenses.css'
import 'react-datepicker/dist/react-datepicker.css'

export const ExpensesContext = React.createContext()

class ExpensesPage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			visibleExpenses: [],
			entriesTotal: 0,
			limit: '25',
			page: 1,
			startDate: new Date(),
			endDate: new Date(),
			filterActive: false
		}

		this.initialFetch = this.initialFetch.bind(this)
		this.fetchData = this.fetchData.bind(this)
		this.goToNext = this.goToNext.bind(this)
		this.goToPrev = this.goToPrev.bind(this)
		this.handleFilter = this.handleFilter.bind(this)
		this.handleFilterReset = this.handleFilterReset.bind(this)
	}

	initialFetch() {
		fetch('http://localhost:3000/expenses')
			.then(response => response.json())
			.then(expenses => this.setState({ visibleExpenses: expenses.expenses, entriesTotal: expenses.total }))
			.catch(err => {
				console.log(err)
				if (err) {
					this.setState({
						fetchError: true
					})
				}
			})
	}

	// Used to refresh data after the user makes a change - it uses values from this.state to make sure view context is maintained (entry limit and page number), unless custom values are assigned
	fetchData(page, limit, prop, cb = () => {}) {
		let entriesLimit
		let limitOffset

		if (limit === 'All') {
			entriesLimit = this.state.entriesTotal
			limitOffset = ''
		} else {
			entriesLimit = parseInt(limit)
			limitOffset = parseInt(limit) * (page - 1)
		}

		fetch(`http://localhost:3000/expenses?limit=${entriesLimit}${limitOffset > 0 ? `&offset=${limitOffset}` : ''}`)
			.then(response => response.json())
			.then(expenses =>
				this.setState(
					{
						[prop]: expenses.expenses
					},
					() => {
						cb()
					}
				)
			)
			.catch(err => {
				console.log(err)
				if (err) {
					this.setState({
						fetchError: true
					})
				}
			})
	}

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

		this.fetchData(this.state.page, this.state.limit, 'entriesToFilter', () => filterEntriesByRange(this.state.entriesToFilter))
	}

	handleFilterReset() {
		this.fetchData(this.state.page, this.state.limit, 'visibleExpenses')
		this.setState({
			filterActive: false
		})
	}

	componentDidMount() {
		this.initialFetch()
	}

	render() {
		const { visibleExpenses, entriesTotal, page, limit, endDate, startDate, filterActive, fetchError } = this.state

		const limits = ['25', '50', 'All']

		return (
			<ExpensesContext.Provider
				value={{
					expenses: visibleExpenses,
					fetchData: () => {
						return this.fetchData(this.state.page, this.state.limit, 'visibleExpenses')
					}
				}}
			>
				<div className="expenses-page">
					<div className="actions">
						{!filterActive && (
							<div className="number-of-entries">
								Show:
								{limits.map((limit, index) => {
									return (
										<button
											key={`limit-${index}`}
											onClick={() => {
												this.setState({ limit: limit, page: 1 }, () => {
													this.fetchData(this.state.page, this.state.limit, 'visibleExpenses')
												})
											}}
											className={`btn ${limit === this.state.limit ? 'btn-primary' : 'btn-outline'}`}
										>
											{limit}
										</button>
									)
								})}
							</div>
						)}

						<div className="filter text-center">
							Filter by:
							<DatePicker
								dateFormat="dd/MM/yyyy"
								selected={startDate}
								onChange={date => this.setState({ startDate: date })}
								selectsStart
								startDate={startDate}
								endDate={endDate}
								maxDate={new Date()}
							/>
							<DatePicker
								dateFormat="dd/MM/yyyy"
								selected={endDate}
								onChange={date => this.setState({ endDate: date })}
								selectsEnd
								startDate={startDate}
								endDate={endDate}
								maxDate={new Date()}
								minDate={startDate}
							/>
							<button onClick={this.handleFilter}>Filter</button>
							<button onClick={this.handleFilterReset}>Reset</button>
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

					<ExpensesList
						expenses={visibleExpenses}
						fetchData={() => {
							this.fetchData(this.state.page, this.state.limit, 'visibleExpenses')
						}}
						fetchError={fetchError}
					/>
					{/* <ExpensesListWrapper /> */}
				</div>
			</ExpensesContext.Provider>
		)
	}
}

// const ExpensesListWrapper = () => (
// 	<ExpensesContext.Consumer>
// 		{data => <ExpensesList expenses={data.expenses} fetchData={data.fetchData} />}
// 	</ExpensesContext.Consumer>
// )

export default ExpensesPage
