import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './image-upload.css'

import { ExpensesContext } from 'pages/expenses'

class ImageUpload extends Component {
	constructor(props) {
		super(props)
		this.state = {
			image: null,
			verificationMsg: '',
			errorMsg: null
		}

		this.handleChange = this.handleChange.bind(this)
		this.saveImages = this.saveImages.bind(this)
	}

	handleChange = e => {
		this.setState({ image: e.target.files[0], uploadSuccess: false, errorMsg: false })
	}

	saveImages(event, cb) {
		event.preventDefault()

		let formData = new FormData()
		if (!this.state.image) {
			this.setState({
				errorMsg: true
			})
		}
		formData.append('receipt', this.state.image)

		fetch(`http://localhost:3000/expenses/${this.props.id}/receipts`, {
			method: 'POST',
			body: formData
		})
			.then(res => {
				if (res.ok) {
					this.setState(
						{
							image: null,
							uploadSuccess: true
						},
						() => {
							cb()
						}
					)
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		const { image, uploadSuccess } = this.state

		const { images } = this.props

		return (
			<ExpensesContext.Consumer>
				{data => {
					return (
						<div className="info-item info-input image-upload">
							<div className="info-label">Receipts</div>

							<div className="input-wrapper">
								<label htmlFor="upload" className="file">
									<input
										type="file"
										id="upload"
										onChange={this.handleChange}
										disabled={images.length >= 3}
									/>
									<div className={`file-custom ${images.length >= 3 ? 'disabled' : ''}`}>
										{image ? image.name : 'Select a file...'}
									</div>
									<div className="file-limit">3 Image limit</div>
								</label>
								<div className="upload-btn">
									<button
										onClick={e => {
											this.saveImages(e, data.fetchData)
										}}
										className="btn btn-primary btn-feature"
										disabled={images.length >= 3}
									>
										Upload
									</button>
									{this.state.errorMsg && (
										<span className="error-msg">
											Please select a <br />
											file first
										</span>
									)}

									{uploadSuccess ? <span className="success-msg">Uploaded and saved successfully</span> : ''}
								</div>
							</div>

							{images.length > 0 && (
								<div className="previews">
									{images.map((image, index) => {
										return (
											<a
												href={image.url}
												download
												className="preview-wrapper"
												key={`image-preview-${index}`}
											>
												<div className="preview-image">
													<img src={`http://localhost:3000${image.url}`} alt={`receipt-${index}`} />
												</div>
											</a>
										)
									})}
								</div>
							)}
						</div>
					)
				}}
			</ExpensesContext.Consumer>
		)
	}
}

ImageUpload.propTypes = {
	id: PropTypes.string,
	images: PropTypes.array
}

export default ImageUpload
