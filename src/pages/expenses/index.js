import React, { Component } from 'react'
import ExpensesList from 'components/expenses-list'
import Pagination from 'components/pagination'
import './expenses.css'

class ExpensesPage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			expenses: [],
			entriesTotal: 0,
			limit: '25',
			page: 1
		}

		this.initialFetch = this.initialFetch.bind(this)
		this.fetchData = this.fetchData.bind(this)
		this.goToNext = this.goToNext.bind(this)
		this.goToPrev = this.goToPrev.bind(this)
	}

	initialFetch() {
		fetch('http://localhost:3000/expenses')
			.then(response => response.json())
			.then(expenses => this.setState({ expenses: expenses.expenses, entriesTotal: expenses.total }))
			.catch(err => {
				console.log(err)
			})
	}

	// Used to refresh data after the user makes a change - it uses values from this.state to make sure view context is maintained (entry limit and page number)
	fetchData(pageNrModifier) {
		const { entriesTotal, limit, page } = this.state

		const howManyEntries = limit === 'All' ? entriesTotal : parseInt(limit)
		const onWhichPage = limit === 'All' ? '' : `&offset=${parseInt(limit) * (pageNrModifier ? page - 1 + pageNrModifier : page - 1)}`

		fetch(`http://localhost:3000/expenses?limit=${howManyEntries}${onWhichPage}}`)
			.then(response => response.json())
			.then(expenses =>
				this.setState({
					expenses: expenses.expenses,
					visibleEntries: limit === 'All' ? expenses.entriesTotal : parseInt(limit)
				})
			)
			.catch(err => {
				console.log(err)
			})
	}

	goToPrev() {
		this.setState({
			page: this.state.page - 1
		})
		this.fetchData(-1)
	}

	goToNext() {
		this.setState({
			page: this.state.page + 1
		})
		this.fetchData(1)
	}

	componentDidMount() {
		this.initialFetch()
	}

	render() {
		const { expenses, entriesTotal, page, limit } = this.state

		const limits = ['25', '50', 'All']

		return (
			<div className='expenses-page'>
				<div className='actions'>
					<div className='number-of-entries'>
						Show:
						{limits.map((limit, index) => {
							return (
								<button
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

					{limit === 'All' ? (
						<div className='entries-visible'>
							<strong>{expenses.length}</strong>&nbsp; entries
						</div>
					) : (
						<Pagination page={page} total={entriesTotal} limit={limit} handleNext={this.goToNext} handlePrev={this.goToPrev} />
					)}
				</div>

				<ExpensesList
					expenses={expenses}
					fetchData={() => {
						this.fetchData()
					}}
				/>
			</div>
		)
	}
}

export default ExpensesPage
