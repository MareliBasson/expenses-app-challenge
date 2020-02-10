import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './pagination.css'

class Pagination extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const { page, total, limit, handlePrev, handleNext } = this.props

		return (
			<div className='pagination'>
				<button onClick={handlePrev} disabled={page === 1}>
					Prev
				</button>
				<div className='page-count'>
					{page}/{Math.ceil(total / limit)}
				</div>
				<button onClick={handleNext} disabled={page === Math.ceil(total / limit)}>
					Next
				</button>
			</div>
		)
	}
}

Pagination.propTypes = {
	page: PropTypes.number,
	total: PropTypes.number,
	limit: PropTypes.string
}

export default Pagination
