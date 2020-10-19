import React from 'react'

import '../sass/components/_Section.scss'

export default function Section(props) {
  const {className, children} = props
  return (
    <>
      <section className={`section-container ${className}`}>{children}</section>
    </>
  )
}
