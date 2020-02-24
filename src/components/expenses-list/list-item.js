import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentAlt, faReceipt } from '@fortawesome/free-solid-svg-icons'

const ListItem = ({ expense, selectExpense, toggleExpenseModal }) => {
	return (
		<div
			className="expense"
			onClick={() => {
				selectExpense(expense.id)
				toggleExpenseModal()
			}}
		>
			<div className="date">{moment(expense.date).format('DD MMM YYYY')}</div>

			<div className="merchant">{expense.merchant}</div>

			<div className="user">
				{expense.user.first} {expense.user.last}
			</div>

			<div className="category">{expense.category && <span>{expense.category}</span>}</div>

			<div className="comment">
				{/* NOTE: the API doesn't update if a blank string is sent so I'm mocking a comment removal by allowing a single space to be read as if there's no comment */}
				{expense.comment !== ''
					? expense.comment !== ' ' && (
							<Fragment>
								<span>{expense.comment !== '' && <FontAwesomeIcon icon={faCommentAlt} />}</span>
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
						<span>{expense.receipts.length > 0 && <FontAwesomeIcon icon={faReceipt} />}</span>
						<div className="info-tip">
							<div>
								{expense.receipts.length} receipt
								{expense.receipts.length > 1 && 's'}
							</div>
						</div>
					</Fragment>
				)}
			</div>

			<div className="amount text-right">
				{new Intl.NumberFormat('da', { style: 'currency', currency: expense.amount.currency }).format(
					expense.amount.value
				)}
			</div>
		</div>
	)
}

ListItem.propTypes = {
	expense: PropTypes.object,
	selectExpense: PropTypes.func,
	toggleExpenseModal: PropTypes.func
}

export default ListItem
