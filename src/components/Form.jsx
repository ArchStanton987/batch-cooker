import React from 'react'

export default function Form(props) {
  const { className, handleSubmit, method } = props

  return (
    <form className={className} onSubmit={handleSubmit} method={method}>
      {props.children}
    </form>
  )
}
