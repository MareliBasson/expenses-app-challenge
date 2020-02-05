import React, { Component } from 'react'
import PageTemplate from 'components/page-template'
import './home.css'

class HomePage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			expenses: []
		}
	}

	componentDidMount() {
		fetch('http://localhost:3000/expenses')
			.then(response => response.json())
			.then(expenses => this.setState({ expenses: expenses.expenses }))
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		console.log(this.state.expenses)

		return (
			<PageTemplate pageHead="Home Page">
				<p>Some text goes here</p>
			</PageTemplate>
		)
	}
}

export default HomePage
