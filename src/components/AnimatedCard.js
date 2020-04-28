import React, { useEffect } from 'react'
import classNames from 'classnames'
import { prepareCanvas } from '../common/drawing.js'
import { initTimeCounter } from '../common/animation.js'
import { gsap } from 'gsap'

const AnimatedCard = ({ draw, getInitialState, initAnimation, name }) => {
  let canvas
  const width = 300
  const height = 500

  let state = getInitialState({ width, height })

  useEffect(() => {
    canvas = document.getElementById(name)
    let context = prepareCanvas(canvas, width, height)
    const getCurrentTime = initTimeCounter()

    initAnimation({ gsap, state })

    gsap.ticker.add(() => {
      draw({ context, width, height, state, getCurrentTime })
    })

    draw({ context, width, height, state, getCurrentTime })
  })

  return (
    <div className={classNames('gallery-item', name)}>
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
