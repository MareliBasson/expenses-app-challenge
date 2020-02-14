import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
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
			limit: '10',
			page: 1,
			startDate: new Date(),
			endDate: new Date(),
			filterActive: false,
			allEntries: [],
			entryDates: []
		}

		this.initialise = this.initialise.bind(this)
		this.fetchData = this.fetchData.bind(this)
		this.goToNext = this.goToNext.bind(this)
		this.goToPrev = this.goToPrev.bind(this)
		this.handleFilter = this.handleFilter.bind(this)
		this.handleFilterReset = this.handleFilterReset.bind(this)
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

		fetch(
			`http://localhost:3000/expenses${entriesLimit > 0 ? `?limit=${entriesLimit}` : ''}${
				entriesLimit > 0 && limitOffset > 0 ? `&offset=${limitOffset}` : ''
			}`
		)
			.then(response => response.json())
			.then(expenses => {
				this.setState(
					{
						[prop]: expenses.expenses,
						entriesTotal: expenses.total
					},
					() => {
						cb()
					}
				)
			})
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

		this.fetchData(1, this.state.entriesTotal, 'allEntries', () => filterEntriesByRange(this.state.allEntries))
	}

	handleFilterReset() {
		this.fetchData(this.state.page, this.state.limit, 'visibleExpenses')
		this.setState({
			filterActive: false
		})
	}

	initialise() {
		this.fetchData(1, this.state.limit, 'visibleExpenses')
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
		const { visibleExpenses, entriesTotal, page, limit, endDate, startDate, filterActive, fetchError } = this.state

		const { posts } = this.props

		console.log(posts)

		const limits = ['10', '25', '50', 'All']

		return (
			<ExpensesContext.Provider
				value={{
					fetchData: () => {
						return this.fetchData(this.state.page, this.state.limit, 'visibleExpenses')
					}
				}}
			>
				<div className="expenses-page">
					<ul>
						{posts.map(post => (
							<li key={post.id}>{post.title}</li>
						))}
					</ul>
					<button
						onClick={event => {
							event.preventDefault()
							this.props.dispatch({
								type: 'ADD_POST',
								payload: { id: 'test', title: 'this is a enw post' }
							})
						}}
					>
						test
					</button>
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
											className={`btn ${limit === this.state.limit ? 'btn-primary' : 'btn-inverse'}`}
										>
											{limit}
										</button>
									)
								})}
							</div>
						)}

						<div className="filter text-center">
							Filter by:
							{this.state.entryDates && (
								<Fragment>
									<DatePicker
										dateFormat="dd/MM/yyyy"
										selected={startDate}
										onChange={date => this.setState({ startDate: date })}
										selectsStart
										highlightDates={this.state.entryDates}
										startDate={startDate}
										endDate={endDate}
										maxDate={new Date()}
									/>
									<DatePicker
										dateFormat="dd/MM/yyyy"
										selected={endDate}
										onChange={date => this.setState({ endDate: date })}
										selectsEnd
										highlightDates={this.state.entryDates}
										startDate={startDate}
										endDate={endDate}
										maxDate={new Date()}
										minDate={startDate}
									/>
								</Fragment>
							)}
							<button onClick={this.handleFilter} className="btn btn-primary">
								Filter
							</button>
							<button onClick={this.handleFilterReset} className="btn btn-primary">
								Reset
							</button>
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
				</div>
			</ExpensesContext.Provider>
		)
	}
}

// export default ExpensesPage

const mapStateToProps = state => {
	return { posts: state.posts }
}

const mapDispatchToProps = dispatch => {
	return {
		dispatch
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ExpensesPage)
