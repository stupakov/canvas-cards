import React from 'react'
import GradientPreview from './GradientPreview.js'
import ThemePreview from './ThemePreview.js'
import { gradients, themes } from '../common/colors.js'

export default () => {
  return (
    <div className='colors-preview'>
      {gradients.map((gradient, idx) => (
        <GradientPreview gradient={gradient} name={idx} />
      ))}

      {Object.keys(themes).map(themeName => (
        <ThemePreview colors={themes[themeName]} name={themeName} />
      ))}
    </div>
  )
}
