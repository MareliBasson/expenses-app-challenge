import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Modal from 'components/modal'
import CommentForm from 'components/comment-form'
import ImageUpload from 'components/image-upload'
import CategorySelect from 'components/category-select'
import './expense-modal.css'

const ExpenseModal = ({ expense, toggleModal, modalActive }) => (
	<Modal className="expense-modal" toggleModal={toggleModal} title="Expense Information" modalActive={modalActive}>
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
							<div className="info-value">{moment(expense.date).format('DD MMM YYYY')}</div>
						</div>
					</div>
				</div>

				<CategorySelect id={expense.id} category={expense.category} />

				<CommentForm id={expense.id} comment={expense.comment} />

				<ImageUpload id={expense.id} previews={expense && expense.receipts} />
			</Fragment>
		)}
	</Modal>
)

ExpenseModal.propTypes = {
	expense: PropTypes.object,
	toggleModal: PropTypes.func,
	modalActive: PropTypes.bool
}

export default ExpenseModal
