import _ from 'lodash'
import moment from 'moment'

// Used to refresh data after the user makes a change - it uses values from this.state to make sure view context is maintained (expense limit and page number), unless custom values are assigned
export function fetchData(page, limit, prop, callback = () => {}) {
	this.setState({
		busyFetching: true
	})

	let entriesLimit
	let limitOffset

	if (limit === 'All') {
		entriesLimit = this.state.entriesTotal
		limitOffset = ''
	} else {
		entriesLimit = parseInt(limit)
		limitOffset = parseInt(limit) * (page - 1)
	}

	fetch(
		`http://localhost:3000/expenses${entriesLimit > 0 ? `?limit=${entriesLimit}` : ''}${
			entriesLimit > 0 && limitOffset > 0 ? `&offset=${limitOffset}` : ''
		}`
	)
		.then(response => response.json())
		.then(expenses => {
			// setTimeout(() => {
			this.setState({
				[prop]: expenses.expenses,
				entriesTotal: expenses.total,
				fetchError: false,
				busyFetching: false
			})
			// }, 1000)
		})
		.then(() => {
			callback()
		})
		.catch(err => {
			console.log(err)

			if (err) {
				// setTimeout(() => {
				this.setState({
					fetchError: true,
					busyFetching: false
				})
				// }, 1000)
			}
		})
}

// Pagination functions

export function setPaginationLimit(limit) {
	this.setState({ limit: limit, page: 1 }, () => {
		this.fetchData(this.state.page, this.state.limit, 'visibleExpenses')
	})
}

export function goToPage(modifier) {
	this.setState(
		{
			page: this.state.page + modifier
		},
		() => {
			this.fetchData(this.state.page, this.state.limit, 'visibleExpenses')
		}
	)
}

// Filter functions
export function filterExpenses() {
	const { startDate, endDate } = this.state

	const filterEntriesByRange = allExpenses => {
		const filterResult = _.filter(allExpenses, expense => {
			const expenseDate = moment(expense.date).format()

			return moment(expenseDate).isBetween(startDate, endDate)
		})

		this.setState({
			visibleExpenses: filterResult,
			filterActive: true
		})
	}

	this.fetchData(0, this.state.entriesTotal, 'allEntries', () => filterEntriesByRange(this.state.allEntries))
}

export function setDate(date, prop) {
	this.setState({ [prop]: date }, () => {
		if (this.state.startDate && this.state.endDate) {
			this.filterExpenses()
		}
	})
}

export function resetFilter() {
	this.fetchData(this.state.page, this.state.limit, 'visibleExpenses')
	this.setState({
		startDate: null,
		endDate: null,
		filterActive: false
	})
}
