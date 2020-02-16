// Used to refresh data after the user makes a change - it uses values from this.state to make sure view context is maintained (entry limit and page number), unless custom values are assigned
export function fetchData(page, limit, prop, cb = () => {}) {
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
			setTimeout(() => {
				this.setState(
					{
						[prop]: expenses.expenses,
						entriesTotal: expenses.total,
						fetchError: false,
						busyFetching: false
					},
					() => {
						cb()
					}
				)
			}, 1000)
		})
		.catch(err => {
			console.log(err)

			if (err) {
				this.setState({
					fetchError: true
				})
			}
		})
}
