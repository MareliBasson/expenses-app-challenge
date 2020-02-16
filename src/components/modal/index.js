import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './modal.css'

const Modal = ({ className, title, toggleModal, modalActive, children }) => (
	<div className={`modal ${className && className} ${modalActive && 'active'}`}>
		<div className="modal-container">
			<div className="modal-header">
				<h3>{title}</h3>
				<button className="btn btn-primary btn-icon" onClick={toggleModal}>
					<FontAwesomeIcon icon={faTimes} />
				</button>
			</div>

			<div className="modal-content">{children}</div>
		</div>
		<div className="modal-overlay" onClick={toggleModal}></div>
	</div>
)

Modal.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string,
	toggleModal: PropTypes.func,
	modalActive: PropTypes.bool,
	children: PropTypes.any
}

export default Modal
