import React, { useEffect } from 'react'
import { prepareCanvas } from '../common/drawing.js'

import { gsap } from 'gsap'

const AnimatedPage = ({ draw, getInitialState, initAnimation, name }) => {
  useEffect(() => {
    gsap.ticker.fps(30)

    let canvas = document.getElementById(name)
    let width
    let height
    let state
    let context

    const prepareAnimation = () => {
      width = window.innerWidth
      height = window.innerHeight
      state = getInitialState({ width, height })
      context = prepareCanvas(canvas, width, height)
      initAnimation({ gsap, state })
    }

    window.addEventListener('resize', prepareAnimation, false)
    prepareAnimation()

    gsap.ticker.add(() => {
      draw({ context, width, height, state })
    })
  })

  return <canvas id={name} data-name={name}></canvas>
}

export default AnimatedPage
