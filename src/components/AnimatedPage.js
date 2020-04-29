import React, { useEffect } from 'react'
import { prepareCanvas } from '../common/drawing.js'
import { initTimeCounter } from '../common/animation.js'
import { gsap } from 'gsap'

import Logo from '../images/logo1.svg'

const Header = () => {
  return (
    <div className='header'>
      <div className='logo'>
        <img src={Logo} alt='Logo' />
        <div className='logo-text'>Geometer</div>
      </div>
    </div>
  )
}

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-left'>+1-415-555-GEOS</div>
      <div className='footer-right'>
        <a href='mailto:hello@geometer.io'>hello@geometer.io</a>
      </div>
    </div>
  )
}

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

  return (
    <div className='page-container'>
      <Header />
      <Footer />
      <canvas id={name} data-name={name}></canvas>
    </div>
  )
}

export default AnimatedPage
