import { Fragment } from 'react'
import ReactDOM from 'react-dom'

import classes from './Modal.module.css'

const Backdrop = ({ onHide }) => {
  return <div className={classes.backdrop} onClick={onHide} />
}

const ModalOverlay = props => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  )
}

const portalElement = document.getElementById('overlay')

const Modal = ({ onHide, children }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onHide={onHide} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  )
}

export default Modal
