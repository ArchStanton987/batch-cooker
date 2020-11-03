import React from 'react'

import minusIcon from '../assets/icons/minus.svg'
import '../sass/components/_DynamicFormTags.scss'

export default function DynamicFormTags({ ...props }) {
  const { tag, index, handleTagChange, removeTag } = props

  return (
    <li className="dynform--tag-container">
      <label className="recipe-form--label">
        <p>{`Tag #${index + 1}`}</p>
      </label>
      <div className="flexRow alignItemsCenter">
        <input
          type="text"
          id={`tag-${index}`}
          name={`tag-${index}`}
          className="recipe-form--tag-input"
          value={tag.tagname}
          onChange={e => handleTagChange(e, index)}
        />
        {
          <img
            className="remove-element-btn tag"
            onClick={() => removeTag(index)}
            src={minusIcon}
            alt={`remove tag ${index}`}
          />
        }
      </div>
    </li>
  )
}
