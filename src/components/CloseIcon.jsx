import React from 'react'
import closeIcon from '../assets/icons/x-white.svg'

export default function CloseIcon(props) {
  const { onClick, parent, additionalClasses } = props
  return (
    <>
      <img
        onClick={onClick}
        className={`${parent}--close-icon icon ${additionalClasses}`}
        src={closeIcon}
        alt={`close ${parent}`}
      />
    </>
  )
}
