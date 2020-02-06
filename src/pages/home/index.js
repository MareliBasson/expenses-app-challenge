import React, { Component } from 'react'
import PageTemplate from 'components/page-template'
import './home.css'

class HomePage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			expenses: []
		}

		this.handleFetch = this.handleFetch.bind(this)
		this.handleComment = this.handleComment.bind(this)
	}

	handleFetch() {
		fetch('http://localhost:3000/expenses?limit=200')
			.then(response => response.json())
			.then(expenses => this.setState({ expenses: expenses.expenses }))
			.catch(err => {
				console.log(err)
			})
	}

	componentDidMount() {
		this.handleFetch()
	}

	handleComment(expenseId) {
		console.log('test')
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
			this.handleFetch()
		})
	}

	render() {
		const { expenses } = this.state
		console.log(this.state.expenses)

		return (
			<PageTemplate pageHead="Home Page">
				{/* <p>Some text goes here</p> */}

				<div className="expenses-list">
					{expenses.map((expense, index) => {
						return (
							<div
								className="expense"
								key={`expense-${index}`}
								onClick={() => {
									this.handleComment(expense.id)
								}}
							>
								{expense.merchant}
								<p>{expense.comment ? expense.comment : 'no comment'}</p>
								<hr />
							</div>
						)
					})}
				</div>
			</PageTemplate>
		)
	}
}

export default HomePage
