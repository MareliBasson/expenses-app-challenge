import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './comment-form.css'

import { ExpensesContext } from 'pages/expenses'

class CommentForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			comment: '',
			commentSaved: false,
			errorMsg: false,
			hasChanged: false
		}

		this.handleComment = this.handleComment.bind(this)
		this.saveComment = this.saveComment.bind(this)
	}

	handleComment(event) {
		this.setState({
			comment: event.target.value,
			commentSaved: false,
			errorMsg: false
		}, ()=>{
			this.setState({
				hasChanged: this.props.comment !== this.state.comment ? true : false
			}) 
		})
	}

	saveComment(event, cb) {
		event.preventDefault()

		if (this.state.hasChanged) {
			fetch(`http://localhost:3000/expenses/${this.props.id}`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					comment: this.state.comment
				})
			})
				.then(() => {
					this.setState({
						commentSaved: true
					})
				})
				.then(() => {
					cb()
				})
				.catch(err => {
					console.log(err)
					this.setState({
						commentSaved: false,
						errorMsg: true
					})
				})
		}
	}

	componentDidMount() {
		if (!this.state.comment) {
			this.setState({
				comment: this.props.comment
			})
		}
	}

	render() {
		const { comment, commentSaved, errorMsg, hasChanged } = this.state

		console.log(hasChanged)

		return (
			<ExpensesContext.Consumer>
				{data => {
					return (
						<div className="info-item info-input comment-form">
							<div className="info-label">Comment</div>
							<form
								onSubmit={e => {
									this.saveComment(e, data.fetchData)
								}}
							>
								<textarea
									type="text"
									placeholder="Add a comment about this expense..."
									onChange={this.handleComment}
									value={comment ? comment : ''}
								/>
								<div className="btn-wrap-center">
									<button type="submit" className="btn btn-primary btn-feature">
										{commentSaved && hasChanged ? 'Saved' : 'Save Comment'}
									</button>
									{errorMsg && (
										<div className="error-msg">
											Your comment can't be saved right now, please try again later.
										</div>
									)}
								</div>
							</form>
						</div>
					)
				}}
			</ExpensesContext.Consumer>
		)
	}
}

CommentForm.propTypes = {
	id: PropTypes.string,
	comment: PropTypes.string
}

export default CommentForm
