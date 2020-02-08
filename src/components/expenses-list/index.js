import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './expenses-list.css'

class ExpensesList extends Component {
	render() {
		const { expenses } = this.props

		return (
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
		)
	}
}

ExpensesList.propTypes = {
	expenses: PropTypes.array
}

export default ExpensesList
