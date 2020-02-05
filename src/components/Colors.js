import React from 'react'
import GradientPreview from './GradientPreview.js'
import { gradients } from '../common/colors.js'

export default () => {
  return (
    <div className='colors-preview'>
      {gradients.map((gradient, idx) => (
        <GradientPreview gradient={gradient} name={idx} />
      ))}
    </div>
  )
}
