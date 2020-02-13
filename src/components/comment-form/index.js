import React, { Component } from 'react'
import './comment-form.css'

import { ExpensesContext } from 'pages/expenses'

class CommentForm extends Component {
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

	saveComment(event, cb) {
		event.preventDefault()

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
				cb()
			})
			.catch(err => {
				console.log(err)
			})
	}

	componentDidMount() {
		if (!this.state.comment) {
			this.setState({
				comment: this.props.comment
			})
		}
	}

	render() {
		const { comment } = this.state

		return (
			<ExpensesContext.Consumer>
				{data => {
					return (
						<div className="info-item">
							<div className="info-label">Comment</div>
							<form
								onSubmit={e => {
									this.saveComment(e, data.fetchData)
								}}
								className="comment-form"
							>
								<textarea
									type="text"
									placeholder="Add a comment about this expense..."
									onChange={this.handleComment}
									value={comment ? comment : ''}
								/>
								<div className="btn-wrap-center">
									<button type="submit" className="btn btn-primary btn-feature">
										Save Comment
									</button>
								</div>
							</form>
						</div>
					)
				}}
			</ExpensesContext.Consumer>
		)
	}
}

export default CommentForm
