import React from 'react'
import './settings.css'

const SettingsPage = ({ setTheme, selectedTheme }) => {
	console.log(setTheme)
	console.log(selectedTheme)

	return (
		<div className="settings">
			<div className="section">
				<h4 className="section-heading">Theme options</h4>
				<div className="section-content">
					<div className="setting-item">
						<div className="setting-label">Select a theme:</div>
						<div className="setting-input">
							<select
								name="theme"
								onChange={e => setTheme(e)}
								value={selectedTheme ? 'themed' : 'default'}
							>
								<option value="default">Default Theme</option>
								<option value="themed">Let's Roll</option>
							</select>
							{/* <button onClick={e => setTheme(e)}>Toggle Theme</button> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SettingsPage
