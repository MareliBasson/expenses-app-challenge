import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import Modal from 'components/modal'
import CommentForm from 'components/comment-form'
import ImageUpload from 'components/image-upload'
import './expense-modal.css'

class ExpenseModal extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const { expense, toggleModal, modalActive } = this.props

		return (
			<Modal className='expense-modal' toggleModal={toggleModal} title='Expense Information' modalActive={modalActive}>
				{expense && (
					<Fragment>
						<div className='row'>
							<div className='col'>
								<div className='info-item merchant'>
									<div className='info-label'>Merchant</div>
									<div className='info-value'>{expense.merchant}</div>
								</div>
							</div>
							<div className='col'>
								<div className='info-item amount'>
									<div className='info-label'>Amount</div>
									<div className='info-value'>
										{expense.amount.value} ({expense.amount.currency})
									</div>
								</div>
							</div>
						</div>
						<div className='row'>
							<div className='col'>
								<div className='info-item user'>
									<div className='info-label'>User</div>
									<div className='info-value'>
										{expense.user.first} {expense.user.last}
									</div>
								</div>
							</div>
							<div className='col'>
								<div className='info-item amount'>
									<div className='info-label'>Date</div>
									<div className='info-value'>
										<Moment format='DD MMM YYYY'>{expense.date}</Moment>
									</div>
								</div>
							</div>
						</div>

						<CommentForm id={expense.id} comment={expense.comment} modalActive={modalActive} />

						<ImageUpload id={expense.id} preview={expense && expense.receipts} />
					</Fragment>
				)}
			</Modal>
		)
	}
}

ExpenseModal.propTypes = {
	expense: PropTypes.object,
	toggleModal: PropTypes.func,
	modalActive: PropTypes.bool
}

export default ExpenseModal
