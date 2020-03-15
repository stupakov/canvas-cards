import { themes, gradients, rgb } from '../common/colors.js'
import { drawAt } from '../common/drawing.js'

const getInitialState = ({ width, height }) => {
  const density = 700

  return {
    time: 0,
    stars: generateStars({
      width,
      height,
      count: Math.floor((width * height) / density)
    })
  }
}

const initAnimation = ({ gsap, state }) => {
  const start = new Date()

  const updateTime = () => {
    let now = new Date()
    state.time = now - start
  }

  gsap.ticker.add(updateTime)
}

const draw = ({ context, width, height, state }) => {
  let { stars, time } = state
  const twinkle = 0.6

  const bgcolor = themes['geo'][0].string()
  context.fillStyle = bgcolor
  context.fillRect(0, 0, width, height)

  stars.forEach(star => {
    const radius =
      star.radius * 1 +
      twinkle * Math.sin((2 * Math.PI * time) / 1000 / star.period)

    return drawGradientSphere(context, star.x, star.y, radius)
  })
}

// const drawStar = (context, centerX, centerY, radius) => {
//   context.fillStyle = rgb(1, 1, 1).string()
//   context.beginPath()
//   context.arc(centerX, centerY, radius, 0, Math.PI * 2)
//   context.fill()
// }

const drawGradientSphere = (context, centerX, centerY, maxRadius) => {
  const yOffset = 0 // between -1 and 1
  const xOffset = 0 // between -1 and 1

  drawAt(
    context,
    -maxRadius * xOffset,
    -maxRadius * yOffset,
    0
  )(() => {
    for (let i = maxRadius; i > 0; i--) {
      context.fillStyle = rgb(1, 1, 1)
        .fade(0.5)
        .string()

      let radius = i
      context.beginPath()
      context.arc(
        centerX + radius * xOffset,
        centerY + radius * yOffset,
        radius,
        0,
        Math.PI * 2
      )
      context.fill()
    }
  })
}

const generateStars = ({ width, height, count }) => {
  const maxRadius = 3

  return Array.from(Array(count)).map(i => {
    const x = rangeRand(0, width)
    const y = rangeRand(0, height)
    const radius = rangeRand(0, maxRadius) // linear distribution of radii
    const period = rangeRand(2, 5)
    return { x, y, radius, period }
  })
}

// MATH STUFF

// Return a random number between min and max
const rangeRand = (min, max) => Math.random() * (max - min) + min

export default { draw, getInitialState, initAnimation }
