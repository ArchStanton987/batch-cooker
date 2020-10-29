import React from 'react'

import CloseIcon from './CloseIcon'
import '../sass/components/_Modal.scss'

export default function Modal(props) {
  const { handleClose, title, parent } = props
  return (
    <>
      <div className="modal--overlay">
        <div className="modal--box">
          <div className="flexRow spaceBetween alignItemsCenter">
            <h4>{title}</h4>
            {handleClose && <CloseIcon onClick={handleClose} parent={`${parent} modal`} />}
          </div>
          {props.children}
        </div>
      </div>
    </>
  )
}
