import React, { useEffect } from 'react'
import { prepareCanvas } from '../common/drawing.js'
import { initTimeCounter } from '../common/animation.js'
import { gsap } from 'gsap'

const AnimatedPage = ({ animations, name }) => {
  useEffect(() => {
    gsap.ticker.fps(30)

    let canvas = document.getElementById(name)
    let width, height, state, context
    
    const getCurrentTime = initTimeCounter()

    const prepareAnimation = () => {
      width = window.innerWidth
      height = window.innerHeight
      state = Object.assign(
        ...animations.map(animation =>
          animation.getInitialState({ width, height })
        )
      )
      context = prepareCanvas(canvas, width, height)
      animations.forEach(animation => animation.initAnimation({ gsap, state }))
    }

    window.addEventListener('resize', prepareAnimation, false)
    prepareAnimation()

    gsap.ticker.add(() => {
      animations.forEach(animation =>
        animation.draw({ context, width, height, state, getCurrentTime })
      )
    })
  })

  return <canvas id={name} data-name={name}></canvas>
}

export default AnimatedPage
