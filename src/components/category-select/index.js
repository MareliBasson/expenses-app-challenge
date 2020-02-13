import React, { Component } from 'react'
import './comment-form.css'

import { ExpensesContext } from 'pages/expenses'

class CategorySelect extends Component {
	constructor(props) {
		super(props)
		this.state = {
			categorySelected: ''
		}

		this.handleSelection = this.handleSelection.bind(this)
		this.changeCategory = this.changeCategory.bind(this)
	}

	handleSelection(event) {
		this.setState({
			categorySelected: event.target.value
		})
	}

	changeCategory(event, cb) {
		event.preventDefault()
		console.log('testing')
		console.log(cb)

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
			.then(() => {
				cb()
			})
			.catch(err => {
				console.log(err)
			})
	}

	componentDidMount() {
		if (!this.state.categorySelected) {
			this.setState({
				categorySelected: this.props.category
			})
		}
	}

	render() {
		const { categorySelected } = this.state

		console.log(categorySelected)

		return (
			<ExpensesContext.Consumer>
				{data => {
					return (
						<div className="info-item">
							<div className="info-label">Comment</div>
							<button
								onClick={e => {
									console.log('clicked')
									this.changeCategory(e, data.fetchData)
								}}
								className="btn btn-primary btn-feature"
							>
								change category
							</button>
						</div>
					)
				}}
			</ExpensesContext.Consumer>
		)
	}
}

export default CategorySelect
