import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import ExpensesList from 'components/expenses-list'
import Pagination from 'components/pagination'
import './expenses.css'

import 'react-datepicker/dist/react-datepicker.css'

class ExpensesPage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			visibleExpenses: [],
			entriesTotal: 0,
			limit: '25',
			page: 1,
			startDate: new Date(),
			endDate: new Date()
		}

		this.initialFetch = this.initialFetch.bind(this)
		this.fetchData = this.fetchData.bind(this)
		this.goToNext = this.goToNext.bind(this)
		this.goToPrev = this.goToPrev.bind(this)
		this.handleFilter = this.handleFilter.bind(this)
	}

	initialFetch() {
		fetch('http://localhost:3000/expenses')
			.then(response => response.json())
			.then(expenses => this.setState({ visibleExpenses: expenses.expenses, entriesTotal: expenses.total }))
			.catch(err => {
				console.log(err)
			})
	}

	// Used to refresh data after the user makes a change - it uses values from this.state to make sure view context is maintained (entry limit and page number), unless custom values are assigned
	fetchData(customPage, customLimit = 0) {
		const { entriesTotal, limit, page } = this.state
		console.log(customPage)
		console.log(customLimit)

		let entriesLimit
		let limitOffset

		if (limit === 'All') {
			entriesLimit = entriesTotal
			limitOffset = ''
		} else {
			entriesLimit = customLimit > 0 ? customLimit : parseInt(limit)
			limitOffset = parseInt(limit) * (customPage ? customPage - 1 : page - 1)
		}

		fetch(`http://localhost:3000/expenses?limit=${entriesLimit}${limitOffset > 0 ? `&offset=${limitOffset}` : ''}`)
			.then(response => response.json())
			.then(expenses =>
				this.setState({
					visibleExpenses: expenses.expenses
				})
			)
			.catch(err => {
				console.log(err)
			})
	}

	goToPrev() {
		this.setState(
			{
				page: this.state.page - 1
			},
			() => {
				this.fetchData(this.state.page)
			}
		)
	}

	goToNext() {
		this.setState(
			{
				page: this.state.page + 1
			},
			() => {
				this.fetchData(this.state.page)
			}
		)
	}

	handleFilter() {
		const { entriesTotal, startDate, endDate } = this.state

		const filterEntriesByRange = allExpenses => {
			const filterResult = _.filter(allExpenses, expense => {
				return moment(moment(expense.date).format()).isBetween(startDate, endDate)
			})

			this.setState({
				visibleExpenses: filterResult
			})
		}

		fetch(`http://localhost:3000/expenses?limit=${entriesTotal}`)
			.then(response => response.json())
			.then(expenses =>
				this.setState(
					{
						entriesToFilter: expenses.expenses
					},
					() => {
						filterEntriesByRange(this.state.entriesToFilter)
					}
				)
			)
			.catch(err => {
				console.log(err)
			})
	}

	componentDidMount() {
		this.initialFetch()
	}

	render() {
		const { visibleExpenses, entriesTotal, page, limit, endDate, startDate } = this.state

		const limits = ['25', '50', 'All']

		return (
			<div className="expenses-page">
				<div className="actions">
					<div className="number-of-entries">
						Show:
						{limits.map((limit, index) => {
							return (
								<button
									key={`limit-${index}`}
									onClick={() => {
										this.setState({ limit: limit, page: 1 }, () => {
											this.fetchData()
										})
									}}
									className={`btn ${limit === this.state.limit ? 'btn-primary' : 'btn-outline'}`}
								>
									{limit}
								</button>
							)
						})}
					</div>

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
					</div>

					{limit === 'All' ? (
						<div className="entries-visible text-right">
							<strong>{visibleExpenses.length}</strong>&nbsp; entries
						</div>
					) : (
						<Pagination page={page} total={entriesTotal} limit={limit} handleNext={this.goToNext} handlePrev={this.goToPrev} />
					)}
				</div>

				<ExpensesList
					expenses={visibleExpenses}
					fetchData={() => {
						this.fetchData()
					}}
				/>
			</div>
		)
	}
}

export default ExpensesPage
