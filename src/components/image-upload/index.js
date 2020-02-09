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
		this.setState({ image: e.target.files[0] })
	}

	saveImages(event) {
		event.preventDefault()

		let formData = new FormData()
		formData.append('receipt', this.state.image)

		fetch(`http://localhost:3000/expenses/${this.props.id}/receipts`, {
			method: 'POST',
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

		const { preview } = this.props

		console.log('Preview')
		console.log(preview)

		return (
			<div className="info-item">
				<div className="info-label">Receipt</div>

				<div className="image-upload">
					<label htmlFor="upload" className="file">
						<input type="file" id="upload" onChange={this.handleChange} />
						<div className="file-custom">{image ? image.name : 'Choose a file...'}</div>
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

				<div className="previews">
					{preview &&
						preview.map(img => {
							console.log(img.url)
							return (
								<div className="preview-img">
									<img src={`http://localhost:3000${img.url}`} alt="" width="100" />
								</div>
							)
						})}
				</div>
			</div>
		)
	}
}

export default ImageUpload
