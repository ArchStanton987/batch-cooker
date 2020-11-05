import React from 'react'

import '../../sass/components/_Section.scss'

export default function SectionCTA(props) {
  return (
    <>
      <section className={`section-container cta ${props.className}`}>{props.children}</section>
    </>
  )
}
