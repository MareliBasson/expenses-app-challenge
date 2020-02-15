import React, { Component } from 'react'
import './category-select.css'

import { ExpensesContext } from 'pages/expenses'

class CategorySelect extends Component {
	constructor(props) {
		super(props)
		this.state = {
			category: ''
		}

		this.handleCategory = this.handleCategory.bind(this)
		this.saveCategory = this.saveCategory.bind(this)
	}

	handleCategory(event) {
		this.setState({
			category: event.target.value
		})
	}

	saveCategory(event, cb) {
		event.preventDefault()

		fetch(`http://localhost:3000/expenses/${this.props.id}`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				category: this.state.category
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
		if (!this.state.category) {
			this.setState({
				category: this.props.category
			})
		}
	}

	render() {
		const { category } = this.state

		return (
			<ExpensesContext.Consumer>
				{data => {
					return (
						<div className="info-item">
							<div className="info-label">Category</div>
							<form
								onSubmit={e => {
									this.saveCategory(e, data.fetchData)
								}}
								className="comment-form"
							>
								<textarea
									type="text"
									placeholder="Set a category..."
									onChange={this.handleCategory}
									value={category ? category : ''}
								/>
								<div className="btn-wrap-center">
									<button type="submit" className="btn btn-primary btn-feature">
										Save Category
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

export default CategorySelect
