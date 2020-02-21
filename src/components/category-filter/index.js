import React from 'react'
import './category-filter.css'
import { ExpensesContext } from 'pages/expenses'

const CategoryFilter = () => {
	return (
		<ExpensesContext.Consumer>
			{data => (
				<div className="category-filter">
					<select
						name="category"
						className=""
						onChange={e => {
							data.setCategory(e)
						}}
						value={data.selectedCategory ? data.selectedCategory : ''}
					>
						<option value="">Category:</option>
						{data.categories.map((category, index) => {
							return (
								<option key={`category-option-${index}`} value={category}>
									{category}
								</option>
							)
						})}
					</select>
				</div>
			)}
		</ExpensesContext.Consumer>
	)
}

export default CategoryFilter
