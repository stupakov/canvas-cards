import { rgb, themes } from '../common/colors.js'

const getInitialState = ({ width, height }) => ({
  time: 0,
  stars: generateStars({ width, height, count: 100 })
})

const initAnimation = ({ gsap, state }) => {}

const draw = ({ context, width, height, state }) => {
  let { stars } = state

  const bgcolor = themes['geo'][0].string()
  context.fillStyle = bgcolor
  context.fillRect(0, 0, width, height)

  stars.forEach(star => drawStar(context, star.x, star.y, star.radius))
}

const drawStar = (context, centerX, centerY, radius) => {
  context.fillStyle = rgb(1, 1, 1).string()
  context.beginPath()
  context.arc(centerX, centerY, radius, 0, Math.PI * 2)
  context.fill()
}

const generateStars = ({ width, height, count }) => {
  const maxRadius = 5

  return Array.from(Array(count)).map(i => {
    const x = rangeFloor(0, width)
    const y = rangeFloor(0, height)
    const radius = rangeFloor(0, maxRadius)
    return { x, y, radius }
  })
}

// MATH STUFF

// TODO is it better to not be a whole number of pixels?

// Return a random whole number between min and max
const rangeFloor = (min, max) => Math.floor(Math.random() * (max - min) + min)

export default { draw, getInitialState, initAnimation }
