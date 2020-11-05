import React from 'react'

import '../../sass/components/_Section.scss'

export default function SectionInfo(props) {
  return (
    <>
      <section className={`section-container info ${props.className}`}>{props.children}</section>
    </>
  )
}
