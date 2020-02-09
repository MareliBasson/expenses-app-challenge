import React, { Component } from 'react'

class ImageUpload extends Component {
	constructor(props) {
		super(props)
		this.state = {
			image: null
			// url: '',
			// progress: 0
		}

		this.handleChange = this.handleChange.bind(this)
		this.saveImages = this.saveImages.bind(this)
	}

	// handleUpload = () => {
	// 	const { image } = this.state
	// 	const uploadTask = storage.ref(`images/${image.name}`).put(image)
	// 	uploadTask.on(
	// 		'state_changed',
	// 		snapshot => {
	// 			// progress function ...
	// 			const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
	// 			this.setState({ progress })
	// 		},
	// 		error => {
	// 			// Error function ...
	// 			console.log(error)
	// 		},
	// 		() => {
	// 			// complete function ...
	// 			storage
	// 				.ref('images')
	// 				.child(image.name)
	// 				.getDownloadURL()
	// 				.then(url => {
	// 					this.setState({ url })
	// 				})
	// 		}
	// 	)
	// }

	handleChange = e => {
		// if (e.target.files[0]) {
		this.setState({ image: e.target.files[0] })
		// }
	}

	saveImages(event) {
		event.preventDefault()

		console.log('saving image')

		let formData = new FormData()
		formData.append('receipt', this.state.image)

		fetch(`http://localhost:3000/expenses/${this.props.id}/receipts`, {
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			body: formData
		})
			.then(res => {
				if (res.ok) {
					console.log(res.data)
					alert('File uploaded successfully.')
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		console.log(this.state.image)

		return (
			<div className="center">
				<div className="file-field input-field">
					<div className="btn">
						<input type="file" onChange={this.handleChange} />
					</div>
				</div>
				<button onClick={this.saveImages}>Upload</button>

				{/* <button onClick={this.handleUpload} className="waves-effect waves-light btn">
					Upload <progress value={this.state.progress} max="100" className="progress" />
				</button>
				<div className="image-preview">
					<img
						src={this.state.url || 'https://via.placeholder.com/400x300'}
						width="200"
						alt="Uploaded Images"
					/>
				</div> */}
			</div>
		)
	}
}

export default ImageUpload
