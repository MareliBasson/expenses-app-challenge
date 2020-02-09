import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import CommentForm from 'components/comment-form'
import ImageUpload from 'components/image-upload'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './expense-modal.css'

class ExpenseModal extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const { expense, toggleModal, modalActive } = this.props

		return (
			<div className={`expense-modal ${modalActive && 'active'}`}>
				<div className="modal-overlay" onClick={toggleModal}></div>
				<div className="modal-container">
					<div className="modal-header">
						<h3>Expense Information</h3>
						<button className="btn btn-primary btn-icon" onClick={toggleModal}>
							<FontAwesomeIcon icon={faTimes} />
						</button>
					</div>

					<div className="modal-content">
						{expense && (
							<Fragment>
								<div className="row">
									<div className="col">
										<div className="info-item merchant">
											<div className="info-label">Merchant</div>
											<div className="info-value">{expense.merchant}</div>
										</div>
									</div>
									<div className="col">
										<div className="info-item amount">
											<div className="info-label">Amount</div>
											<div className="info-value">
												{expense.amount.value} ({expense.amount.currency})
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col">
										<div className="info-item user">
											<div className="info-label">User</div>
											<div className="info-value">
												{expense.user.first} {expense.user.last}
											</div>
										</div>
									</div>
									<div className="col">
										<div className="info-item amount">
											<div className="info-label">Date</div>
											<div className="info-value">{expense.date}</div>
										</div>
									</div>
								</div>

								<CommentForm id={expense.id} comment={expense.comment} modalActive={modalActive} />

								<ImageUpload id={expense.id} />
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
