import React, { Component } from 'react'
import ExpensesList from 'components/expenses-list'
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

	// Used to refresh data after the user makes changes - it uses values from state to make sure view context is maintained (limit and page number)
	fetchData(pageNrModifier) {
		const { entriesTotal, limit, page } = this.state

		const howManyEntries = limit === 'all' ? entriesTotal : parseInt(limit)
		const onWhichPage = limit === 'all' ? '' : `&offset=${parseInt(limit) * (pageNrModifier ? page - 1 + pageNrModifier : page - 1)}`

		fetch(`http://localhost:3000/expenses?limit=${howManyEntries}${onWhichPage}}`)
			.then(response => response.json())
			.then(expenses =>
				this.setState({
					expenses: expenses.expenses,
					visibleEntries: limit === 'all' ? expenses.entriesTotal : parseInt(limit)
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

	componentDidUpdate() {
		// if (this.state.entriesTotal !== this.state.expenses.length) {
		// 	this.getAllEntries()
		// }
	}

	componentDidMount() {
		this.initialFetch()
	}

	render() {
		const { expenses, entriesTotal, page, limit } = this.state

		return (
			<div className='expenses-page'>
				<div className='actions'>
					<div className='number-of-entries'>
						Show:
						<button
							onClick={() => {
								this.initialFetch()
								this.setState({ limit: '25' })
							}}
							className={`btn ${limit === '25' ? 'btn-primary' : 'btn-outline'}`}
						>
							25
						</button>
						<button
							onClick={() => {
								this.setState({ limit: 'all', page: 1 }, () => {
									this.fetchData()
								})
							}}
							className={`btn ${limit === 'all' ? 'btn-primary' : 'btn-outline'}`}
						>
							All
						</button>
					</div>
					{limit === 'all' ? (
						<div className='entries-visible'>
							<strong>{expenses.length}</strong>&nbsp; entries
						</div>
					) : (
						<div className='pagination'>
							<button onClick={this.goToPrev} disabled={page === 1}>
								Prev
							</button>
							<div className='page-count'>
								{page}/{Math.ceil(entriesTotal / limit)}
							</div>
							<button onClick={this.goToNext} disabled={page === Math.ceil(entriesTotal / limit)}>
								Next
							</button>
						</div>
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
