import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './expenses-list.css'

class ExpensesList extends Component {
	render() {
		const { expenses, handleComment } = this.props

		return (
			<div className="expenses-list">
				{expenses.map((expense, index) => {
					return (
						<div
							className="expense"
							key={`expense-${index}`}
							onClick={() => {
								handleComment(expense.id)
							}}
						>
							<div className="merchant">{expense.merchant}</div>

							<div className="comment">{expense.comment ? expense.comment : 'no comment'}</div>
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
