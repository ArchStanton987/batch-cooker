import React from 'react'

import '../sass/components/_Section.scss'

export default function Section(props) {
  return (
    <>
      <section className={`section-container ${props.className}`}>{props.children}</section>
    </>
  )
}
