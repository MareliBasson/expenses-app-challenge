import React from 'react'
import ReactDOM from 'react-dom'
import Routes from 'routes.js'
import registerServiceWorker from './registerServiceWorker'

// Stylesheets
import './index.css'

//Redux
import { Provider } from 'react-redux'
import store from './store/index'
window.store = store

ReactDOM.render(
	<Provider store={store}>
		<Routes />
	</Provider>,
	document.getElementById('root')
)
registerServiceWorker()
