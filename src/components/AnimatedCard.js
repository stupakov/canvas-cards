import React, { useEffect } from 'react'
import classNames from 'classnames-es'
import { prepareCanvas } from '../common/drawing.js'

import { gsap } from 'gsap'

const AnimatedCard = ({ draw, getInitialState, initAnimation, name }) => {
  let canvas
  const width = 300
  const height = 500

  let state = getInitialState()

  useEffect(() => {
    canvas = document.getElementById(name)
    let context = prepareCanvas(canvas, width, height)

    initAnimation({ gsap, state })

    gsap.ticker.add(() => {
      draw({ context, width, height, state })
    })

    draw({ context, width, height, state })
  })

  return (
    <div classNames={classNames('gallery-item', name)}>
      <div class='container'>
        <div class='item'>
          <div class='card front'>
            <canvas id={name} data-name={name}></canvas>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimatedCard
