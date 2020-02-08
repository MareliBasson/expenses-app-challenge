import React, { Component } from 'react'
import ExpensesList from 'components/expenses-list'
import './home.css'

class ExpensesPage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			expenses: [],
			total: 0
		}

		this.getAllEntries = this.getAllEntries.bind(this)
		this.initialFetch = this.initialFetch.bind(this)
		this.handleComment = this.handleComment.bind(this)
	}

	initialFetch() {
		fetch('http://localhost:3000/expenses')
			.then(response => response.json())
			.then(expenses => this.setState({ expenses: expenses.expenses, total: expenses.total }))
			.catch(err => {
				console.log(err)
			})
	}

	getAllEntries() {
		fetch(`http://localhost:3000/expenses?limit=${this.state.total}`)
			.then(response => response.json())
			.then(expenses => this.setState({ expenses: expenses.expenses }))
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
		const { expenses, total } = this.state

		return (
			<div className="home">
				<div className="actions">
					<b>Number of entries:</b> {expenses.length}/{total}
					<button
						onClick={() => {
							this.getAllEntries()
						}}
					>
						Show All
					</button>
				</div>
				<ExpensesList expenses={expenses} handleComment={this.handleComment} />
			</div>
		)
	}
}

export default ExpensesPage
