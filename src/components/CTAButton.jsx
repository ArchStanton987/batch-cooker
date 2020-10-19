import React from 'react'

import '../sass/components/_CTAButton.scss'

export default function CTAButton(props) {
  const { action, className } = props
  return (
    <>
      <button onClick={action} className={`cta-button ${className}`}>
        {props.children}
      </button>
    </>
  )
}
