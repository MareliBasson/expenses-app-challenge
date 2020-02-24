import React from 'react'
import './settings.css'

const SettingsPage = setTheme => {
	console.log(setTheme.setTheme)

	return (
		<div className="settings">
			<p>A mock settings page</p>
			<button onClick={e => setTheme.setTheme(e)}>Toggle Theme</button>
		</div>
	)
}

export default SettingsPage
