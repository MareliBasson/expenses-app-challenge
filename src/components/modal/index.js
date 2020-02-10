import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './modal.css'

class Modal extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const { className, title, toggleModal, modalActive, children } = this.props

		return (
			<div className={`modal ${className && className} ${modalActive && 'active'}`}>
				<div className='modal-overlay' onClick={toggleModal}></div>
				<div className='modal-container'>
					<div className='modal-header'>
						<h3>{title}</h3>
						<button className='btn btn-primary btn-icon' onClick={toggleModal}>
							<FontAwesomeIcon icon={faTimes} />
						</button>
					</div>

					<div className='modal-content'>{children}</div>
				</div>
			</div>
		)
	}
}

Modal.propTypes = {
	className: PropTypes.string,
	children: PropTypes.any,
	title: PropTypes.string,
	toggleModal: PropTypes.func,
	modalActive: PropTypes.bool
}

export default Modal
