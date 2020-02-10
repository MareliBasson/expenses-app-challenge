import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Moment from 'react-moment'
import ExpenseModal from 'components/expense-modal'
import './expenses-list.css'

class ExpensesList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedExpense: '',
			modalActive: false
		}

		this.selectExpense = this.selectExpense.bind(this)
		this.toggleExpenseModal = this.toggleExpenseModal.bind(this)
	}

	selectExpense(id) {
		this.setState({
			selectedExpense: id
		})
	}

	toggleExpenseModal() {
		const { fetchData } = this.props

		this.setState(
			{
				modalActive: !this.state.modalActive
			},
			() => {
				if (!this.state.modalActive) {
					fetchData()
				}
			}
		)
	}

	render() {
		const { selectedExpense, modalActive } = this.state
		const { expenses } = this.props

		return (
			<div className='expenses-list'>
				{expenses.map((expense, index) => {
					return (
						<div
							className='expense'
							key={`expense-${index}`}
							onClick={() => {
								this.selectExpense(expense.id)
								this.toggleExpenseModal()
							}}
						>
							<div className='user'>
								{expense.user.first} {expense.user.last}
							</div>
							<div className='merchant'>{expense.merchant}</div>

							<div className='date'>
								<Moment format='DD MMM YYYY'>{expense.date}</Moment>
							</div>

							<div className='amount'>{expense.amount.value}</div>
							<div className='currency'>{expense.amount.currency}</div>
						</div>
					)
				})}

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
	expenses: PropTypes.array
}

export default ExpensesList
