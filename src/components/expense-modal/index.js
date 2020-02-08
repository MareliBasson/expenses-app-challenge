import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import './expense-modal.css'

class ExpenseModal extends Component {
	render() {
		const { expense, toggleModal, modalActive } = this.props

		console.log(expense)

		return (
			<div className={`expense-modal ${modalActive && 'active'}`}>
				<div className="modal-overlay" onClick={toggleModal}></div>
				<div className="modal-container">
					<div className="modal-header">
						<h2>Expense Information</h2>
						<button className="btn btn-primary" onClick={toggleModal}>
							Close
						</button>
					</div>

					<div className="modal-content">
						{expense && (
							<Fragment>
								<div className="amount">{expense.amount.value}</div>
								<div className="user">
									{expense.user.first} {expense.user.last}
								</div>
							</Fragment>
						)}
					</div>
				</div>
			</div>
		)
	}
}

ExpenseModal.propTypes = {
	expense: PropTypes.object
}

export default ExpenseModal
