import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import ExpensesList from 'components/expenses-list'
import Pagination from 'components/pagination'
import './expenses.css'

class ExpensesPage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			visibleExpenses: [],
			entriesTotal: 0,
			limit: '25',
			page: 1,
			// startDate: ,
			endDate: new Date()
		}

		this.initialFetch = this.initialFetch.bind(this)
		this.fetchData = this.fetchData.bind(this)
		this.goToNext = this.goToNext.bind(this)
		this.goToPrev = this.goToPrev.bind(this)
		this.filterBy = this.filterBy.bind(this)
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
	fetchData(pageNum) {
		const { entriesTotal, limit, page } = this.state

		let entriesLimit
		let limitOffset

		if (limit === 'All') {
			entriesLimit = entriesTotal
			limitOffset = ''
		} else {
			entriesLimit = parseInt(limit)
			limitOffset = `&offset=${parseInt(limit) * (pageNum ? pageNum - 1 : page - 1)}`
		}

		fetch(`http://localhost:3000/expenses?limit=${entriesLimit}${limitOffset}}`)
			.then(response => response.json())
			.then(expenses =>
				this.setState({
					visibleExpenses: expenses.expenses,
					visibleEntries: limit === 'All' ? expenses.entriesTotal : parseInt(limit)
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

	filterBy() {}

	componentDidMount() {
		this.initialFetch()
	}

	render() {
		const { visibleExpenses, entriesTotal, page, limit } = this.state

		const limits = ['25', '50', 'All']

		if (!_.isEmpty(visibleExpenses)) {
			const months = () => {
				const monthsArr = []
				const lastEntryDate = moment(new Date(visibleExpenses[visibleExpenses.length - 1].date)).format()
				const todaysDate = moment()._d

				const dateStart = moment(lastEntryDate)
				const dateEnd = moment(todaysDate)

				while (dateEnd.diff(dateStart, 'months') >= 0) {
					monthsArr.push(dateStart.format('MMMM YYYY'))
					dateStart.add(1, 'month')
				}
				return monthsArr
			}

			console.log(months())
		}

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

					<div className="filter">
						Filter by: <button onClick={this.filterBy}>test</button>
						{/* <DatePicker
							selected={startDate}
							onChange={date => this.setState({ startDate: date })}
							selectsStart
							startDate={startDate}
							endDate={endDate}
						/>
						<DatePicker
							selected={endDate}
							onChange={date => this.setState({ endDate: date })}
							selectsEnd
							startDate={startDate}
							endDate={endDate}
							minDate={startDate}
						/> */}
					</div>

					{limit === 'All' ? (
						<div className="entries-visible">
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
						this.fetchData()
					}}
				/>
			</div>
		)
	}
}

export default ExpensesPage
