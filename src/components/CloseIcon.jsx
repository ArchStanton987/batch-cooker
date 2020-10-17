import React from 'react'
import closeIcon from '../assets/icons/x-white.svg'

export default function CloseIcon(props) {
  const { onClick, parent, className } = props
  return (
    <>
      <img
        onClick={onClick}
        className={`icon ${className}`}
        src={closeIcon}
        alt={`close ${parent}`}
      />
    </>
  )
}
