import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Moment from 'react-moment'
import ExpenseModal from 'components/expense-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentAlt, faReceipt } from '@fortawesome/free-solid-svg-icons'
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
							<div className='date'>
								<Moment format='DD MMM YYYY'>{expense.date}</Moment>
							</div>

							<div className='merchant'>{expense.merchant}</div>

							<div className='user'>
								{expense.user.first} {expense.user.last}
							</div>

							<div className='comment'>
								<span>{expense.comment !== '' && <FontAwesomeIcon icon={faCommentAlt} />}</span>
								<div className='info-tip'>{expense.comment}</div>
							</div>

							<div className='images'>
								{expense.receipts && (
									<Fragment>
										<span>{expense.receipts.length > 0 && <FontAwesomeIcon icon={faReceipt} />}</span>
										<div className='info-tip'>
											{expense.receipts.length} image{expense.receipts.length > 1 && 's'}
										</div>
									</Fragment>
								)}
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
