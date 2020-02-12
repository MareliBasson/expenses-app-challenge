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
		this.changeCategory = this.changeCategory.bind(this)
	}

	handleComment(event) {
		this.setState({
			comment: event.target.value
		})
	}

	saveComment(event) {
		event.preventDefault()
		const { fetchData } = this.props

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
				fetchData()
			})
			.catch(err => {
				console.log(err)
			})
	}

	changeCategory(event) {
		event.preventDefault()

		fetch(`http://localhost:3000/expenses/${this.props.id}`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				category: "i'm a new category"
			})
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
					console.log(data)
					return (
						<div className="info-item">
							<div className="info-label">Comment</div>
							<form onSubmit={this.saveComment} className="comment-form">
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
								<button onClick={this.changeCategory} className="btn btn-primary btn-feature">
									change category
								</button>
							</form>
						</div>
					)
				}}
			</ExpensesContext.Consumer>
		)
	}
}

export default CommentForm
