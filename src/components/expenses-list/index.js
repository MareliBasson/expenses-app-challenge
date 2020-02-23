import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ListItem from './list-item'
import ExpenseModal from 'components/expense-modal'
import { toggleExpenseModal } from 'utils/helpers'

import loader from 'images/loader.svg'
import './expenses-list.css'

class ExpensesList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedExpense: '',
			modalActive: false
		}

		this.selectExpense = this.selectExpense.bind(this)

		// Helper functions
		this.toggleExpenseModal = toggleExpenseModal.bind(this)
	}

	selectExpense(id) {
		this.setState({
			selectedExpense: id
		})
	}

	render() {
		const { selectedExpense, modalActive } = this.state
		const { expenses, fetchError, busyFetching } = this.props

		return (
			<div className="expenses-list">
				<div className="legend">
					<div className="date">Date</div>
					<div className="merchant">Merchant</div>
					<div className="user">User</div>
					<div className="category">Category</div>
					<div className="comment"></div>
					<div className="images"></div>
					<div className="amount text-right">Amount</div>
				</div>
				<div className="list-buffer"></div>

				{busyFetching ? (
					<div className="loader">
						<img src={loader} alt="" />
					</div>
				) : expenses.length > 0 ? (
					expenses.map((expense, index) => {
						return (
							<ListItem
								expense={expense}
								key={`expense-${index}`}
								selectExpense={this.selectExpense}
								toggleExpenseModal={this.toggleExpenseModal}
							/>
						)
					})
				) : fetchError ? (
					<div className="expense">
						There's been an error retrieving your expenses, please try refreshing or contact support.
					</div>
				) : (
					<div className="expense">No expenses match your filter request</div>
				)}

				{modalActive && (
					<ExpenseModal
						expense={_.find(expenses, expense => {
							return expense.id === selectedExpense
						})}
						toggleModal={this.toggleExpenseModal}
						modalActive={modalActive}
					/>
				)}
			</div>
		)
	}
}

ExpensesList.propTypes = {
	expenses: PropTypes.array,
	fetchError: PropTypes.bool,
	busyFetching: PropTypes.bool
}

export default ExpensesList
