import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './category-select.css'

import { ExpensesContext } from 'pages/expenses'

class CategorySelect extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedCategory: null
		}

		this.setCategory = this.setCategory.bind(this)
	}

	setCategory(event, cb) {
		event.preventDefault()

		this.setState(
			{
				selectedCategory: event.target.value
			},
			() => {
				fetch(`http://localhost:3000/expenses/${this.props.id}`, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						category: this.state.selectedCategory
					})
				})
					.then(() => {
						cb()
					})
					.catch(err => {
						console.log(err)
					})
			}
		)
	}

	componentDidMount() {
		const { selectedCategory } = this.state

		if (selectedCategory === null) {
			this.setState({
				selectedCategory: this.props.category
			})
		}
	}

	render() {
		const { selectedCategory } = this.state

		return (
			<ExpensesContext.Consumer>
				{data => {
					return (
						<div className="info-item category-select">
							<div className="info-label">Category</div>
							<select
								name="category"
								className=""
								onChange={e => {
									this.setCategory(e, data.fetchData)
								}}
								value={selectedCategory ? selectedCategory : ''}
							>
								<option value="">Select a Category</option>
								{data.categories.map((category, index) => {
									return (
										<option key={`category-option-${index}`} value={category}>
											{category}
										</option>
									)
								})}
							</select>
						</div>
					)
				}}
			</ExpensesContext.Consumer>
		)
	}
}

CategorySelect.propTypes = {
	id: PropTypes.string,
	category: PropTypes.string
}

export default CategorySelect
