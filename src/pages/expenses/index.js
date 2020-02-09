import React, { Component } from 'react'
import ExpensesList from 'components/expenses-list'
import './expenses.css'

class ExpensesPage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			expenses: [],
			total: 0
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
		console.log('refresh data')
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
							}}
							className={`btn ${visibleEntries === 25 ? 'btn-primary' : 'btn-outline'}`}
						>
							25
						</button>
						<button
							onClick={() => {
								this.getAllEntries()
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
			</div>
		)
	}
}

export default ExpensesPage
