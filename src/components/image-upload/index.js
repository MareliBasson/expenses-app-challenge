import React, { Component } from 'react'
import storage from 'firebase/index.js'

class ImageUpload extends Component {
	constructor(props) {
		super(props)
		this.state = {
			image: null,
			url: '',
			progress: 0
		}

		this.saveImages = this.saveImages.bind(this)
	}

	handleChange = e => {
		if (e.target.files[0]) {
			const image = e.target.files[0]
			this.setState(() => ({ image }))
		}
	}

	handleUpload = () => {
		const { image } = this.state
		const uploadTask = storage.ref(`images/${image.name}`).put(image)
		uploadTask.on(
			'state_changed',
			snapshot => {
				// progress function ...
				const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
				this.setState({ progress })
			},
			error => {
				// Error function ...
				console.log(error)
			},
			() => {
				// complete function ...
				storage
					.ref('images')
					.child(image.name)
					.getDownloadURL()
					.then(url => {
						this.setState({ url })
					})
			}
		)
	}

	saveImages(event) {
		event.preventDefault()

		fetch(`http://localhost:3000/expenses/${this.props.expense.id}/receipts`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				receipts: this.state.url
			})
		})
	}

	render() {
		console.log(this.state.url)

		return (
			<div className="center">
				<div className="file-field input-field">
					<div className="btn">
						<input type="file" onChange={this.handleChange} />
					</div>
				</div>
				<button onClick={this.handleUpload} className="waves-effect waves-light btn">
					Upload <progress value={this.state.progress} max="100" className="progress" />
				</button>
				<div className="image-preview">
					<img src={this.state.url || 'https://via.placeholder.com/400x300'} alt="Uploaded Images" />
				</div>

				<button onClick={this.saveImages}>Save Receipts</button>
			</div>
		)
	}
}

export default ImageUpload
