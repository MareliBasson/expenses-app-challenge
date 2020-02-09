import React, { Component } from 'react'
import ExpensesList from 'components/expenses-list'
import './expenses.css'

class ExpensesPage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			expenses: [],
			total: 0,
			view: '25'
		}

		this.initialFetch = this.initialFetch.bind(this)
		this.getAllEntries = this.getAllEntries.bind(this)
		this.refreshData = this.refreshData.bind(this)
		this.handleComment = this.handleComment.bind(this)
	}

	initialFetch() {
		fetch('http://localhost:3000/expenses')
			.then(response => response.json())
			.then(expenses => this.setState({ expenses: expenses.expenses, total: expenses.total, visibleEntries: 25 }))
			.catch(err => {
				console.log(err)
			})
	}

	getAllEntries() {
		fetch(`http://localhost:3000/expenses?limit=${this.state.total}`)
			.then(response => response.json())
			.then(expenses => this.setState({ expenses: expenses.expenses, visibleEntries: expenses.total }))
			.catch(err => {
				console.log(err)
			})
	}

	refreshData() {
		const { view } = this.state

		let query

		if (view === 'all') {
			query = this.state.total
		} else if (view === '25') {
			query = 25
		}

		fetch(`http://localhost:3000/expenses?limit=${query}`)
			.then(response => response.json())
			.then(expenses => this.setState({ expenses: expenses.expenses, visibleEntries: query }))
			.catch(err => {
				console.log(err)
			})
	}

	handleComment(expenseId) {
		fetch(`http://localhost:3000/expenses/${expenseId}`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				comment: `testing ${expenseId}`
			})
		}).then(() => {
			this.initialFetch()
		})
	}

	componentDidUpdate() {
		// if (this.state.total !== this.state.expenses.length) {
		// 	this.getAllEntries()
		// }
	}

	componentDidMount() {
		this.initialFetch()
	}

	render() {
		const { expenses, total, visibleEntries } = this.state

		return (
			<div className="expenses-page">
				<div className="actions">
					<div className="number-of-entries">
						Show:
						<button
							onClick={() => {
								this.initialFetch()
								this.setState({ view: '25' })
							}}
							className={`btn ${visibleEntries === 25 ? 'btn-primary' : 'btn-outline'}`}
						>
							25
						</button>
						<button
							onClick={() => {
								this.getAllEntries()
								this.setState({ view: 'all' })
							}}
							className={`btn ${visibleEntries === total ? 'btn-primary' : 'btn-outline'}`}
						>
							All
						</button>
					</div>
					<div className="entries-visible">
						{expenses.length}/<strong>{total}</strong>
					</div>
				</div>

				<ExpensesList expenses={expenses} refreshData={this.refreshData} />

				<div className="pagination">
					<button>Next</button>
					<div className="page-count">Page:{total / expenses.length}</div>
					<button>Prev</button>
				</div>
			</div>
		)
	}
}

export default ExpensesPage
