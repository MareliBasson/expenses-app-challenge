import React, { Component } from 'react'
import './image-upload.css'

class ImageUpload extends Component {
	constructor(props) {
		super(props)
		this.state = {
			image: null
		}

		this.handleChange = this.handleChange.bind(this)
		this.saveImages = this.saveImages.bind(this)
	}

	handleChange = e => {
		this.setState({ image: e.target.files })
	}

	saveImages(event) {
		event.preventDefault()

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
		const { image } = this.state
		console.log(image)

		return (
			<div className="info-item">
				<div className="info-label">Receipt</div>

				<div className="image-upload">
					<label htmlFor="upload" className="file">
						<input type="file" id="upload" onChange={this.handleChange} />
						<div className="file-custom">{image && image[0] ? image[0].name : 'Choose a file...'}</div>
					</label>
					<button onClick={this.saveImages} className="btn btn-primary btn-feature">
						Upload
					</button>

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
			</div>
		)
	}
}

export default ImageUpload