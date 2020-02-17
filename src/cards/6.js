import { rgb, rgba, gradients } from '../common/colors.js'
import { drawAt } from '../common/drawing.js'

const getInitialState = () => ({
  x: 0,
  y: 0
})

const initAnimation = ({ gsap, state }) => {
  var tl = gsap.timeline({ repeat: -1, repeatDelay: 0 })
  tl.to(state, { y: 25, duration: 1 })
  tl.to(state, { y: 0, duration: 1 })
}

const draw = ({ context, width, height, state }) => {
  let { x, y } = state

  // Backgrounds
  const bgcolor = rgba(0.9, 0.7, 1, 0.06)
  context.fillStyle = bgcolor
  context.fillRect(0, 0, width, height)

  // Draw some stuff
  // sphere(context, width / 2, height / 2)
  dot(context, width / 2, height / 2)
  // blurredCircle(context, width / 2, height / 2)

  getVertices(0, 0, 5, 100).forEach(coords => {
    sphere(context, width / 2 + coords.x + x, height / 2 + coords.y + y)
  })
}

const getVertices = (centerX, centerY, points, radius) =>
  [...Array(points).keys()].map(idx => ({
    x: centerX + radius * Math.sin((Math.PI * 2 * idx) / points),
    y: centerY - radius * Math.cos((Math.PI * 2 * idx) / points)
  }))

const sphere = (context, centerX, centerY) => {
  const yOffset = -0.3 // between -1 and 1
  const xOffset = 0.3 // between -1 and 1
  const maxRadius = 20

  drawAt(
    context,
    -maxRadius * xOffset,
    -maxRadius * yOffset,
    0
  )(() => {
    for (let i = maxRadius; i > 0; i--) {
      context.fillStyle = gradients[0](i / maxRadius)
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
const dot = (context, centerX, centerY) => {
  context.fillStyle = rgb(1, 0, 0)
  let radius = 5
  context.beginPath()
  context.arc(centerX, centerY + radius * 0.3, radius, 0, Math.PI * 2)
  context.fill()
}

// const blurredCircle = (context, centerX, centerY) => {}

export { draw, getInitialState, initAnimation }
