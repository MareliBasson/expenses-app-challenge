import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'
import ExpenseModal from 'components/expense-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentAlt, faReceipt } from '@fortawesome/free-solid-svg-icons'

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
		const { expenses, fetchError, busyFetching } = this.props

		return (
			<div className="expenses-list">
				<div className="legend">
					<div className="date">Date</div>
					<div className="merchant">Merchant</div>
					<div className="user">User</div>
					{/* <div className="category">Category</div> */}
					<div className="comment"></div>
					<div className="images"></div>
					<div className="amount">Amount</div>
					<div className="currency"></div>
				</div>
				<div className="legend-buffer"></div>

				{busyFetching && <img src={loader} alt="" />}

				{fetchError ? (
					<div className="expense">
						There's been an error retrieving your expenses, please try refreshing or contact support.
					</div>
				) : expenses.length > 0 ? (
					expenses.map((expense, index) => {
						return (
							<div
								className="expense"
								key={`expense-${index}`}
								onClick={() => {
									this.selectExpense(expense.id)
									this.toggleExpenseModal()
								}}
							>
								<div className="date">{moment(expense.date).format('DD MMM YYYY')}</div>

								<div className="merchant">{expense.merchant}</div>

								<div className="user">
									{expense.user.first} {expense.user.last}
								</div>

								{/* <div className="category">{expense.category}</div> */}

								<div className="comment">
									{/* NOTE: the API doesn't update if a blank string is sent so I'm mocking a comment removal by allowing a single space to be read as if there's no comment */}
									{expense.comment !== ''
										? expense.comment !== ' ' && (
												<Fragment>
													<span>
														{expense.comment !== '' && (
															<FontAwesomeIcon icon={faCommentAlt} />
														)}
													</span>
													<div className="info-tip">
														<div>{expense.comment}</div>
													</div>
												</Fragment>
										  )
										: ''}
								</div>

								<div className="images">
									{expense.receipts.length > 0 && (
										<Fragment>
											<span>
												{expense.receipts.length > 0 && <FontAwesomeIcon icon={faReceipt} />}
											</span>
											<div className="info-tip">
												<div>
													{expense.receipts.length} image
													{expense.receipts.length > 1 && 's'}
												</div>
											</div>
										</Fragment>
									)}
								</div>

								<div className="amount">{expense.amount.value}</div>
								<div className="currency">{expense.amount.currency}</div>
							</div>
						)
					})
				) : (
					<div className="expense">No expenses match your request</div>
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
	expenses: PropTypes.array
}

export default ExpensesList
