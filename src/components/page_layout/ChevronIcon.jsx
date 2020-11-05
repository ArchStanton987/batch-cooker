import React from 'react'

import chevron from '../../assets/icons/chevron.svg'

export default function ChevronIcon(props) {
  const { isExpended } = props
  return (
    <>
      <img
        className={isExpended ? 'chevron' : 'chevron rotated'}
        src={chevron}
        alt={`${props.parent} drawer`}
      />
    </>
  )
}
