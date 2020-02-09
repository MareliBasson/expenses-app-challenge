import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import './expense-modal.css'

class ExpenseModal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			comment: ''
		}

		this.handleComment = this.handleComment.bind(this)
		this.saveComment = this.saveComment.bind(this)
	}

	handleComment(event) {
		this.setState({
			comment: event.target.value
		})
	}

	saveComment(event) {
		event.preventDefault()

		fetch(`http://localhost:3000/expenses/${this.props.expense.id}`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				comment: this.state.comment
			})
		})
	}

	render() {
		const { expense, toggleModal, modalActive } = this.props

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
								<div className="comment">{expense.comment}</div>
								<form onSubmit={this.saveComment}>
									<input
										type="text"
										placeholder="Add a comment about this expense"
										onChange={this.handleComment}
										value={expense.comment}
									/>
									<button type="submit">Save Comment</button>
								</form>
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
