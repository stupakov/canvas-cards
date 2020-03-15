import { rgb, gradients } from '../common/colors.js'
import { prepareCanvas, drawAt, drawRotated } from '../common/drawing.js'

export default function (canvas) {
  const width = 300
  const height = 500
  let context = prepareCanvas(canvas, width, height)

  // Backgrounds
  const bgcolor = rgb(0.9, 0.7, 1).string()
  context.fillStyle = bgcolor
  context.fillRect(0, 0, width, height)

  // Draw some stuff
  sphere(context, width / 2, height / 2)
  // dot(context, width / 2, height / 2)
  // blurredCircle(context, width / 2, height / 2)
}

const sphere = (context, centerX, centerY) => {
  const yOffset = -0.3 // between -1 and 1
  const xOffset = 0.3 // between -1 and 1
  const maxRadius = 120

  drawAt(
    context,
    -maxRadius * xOffset,
    -maxRadius * yOffset,
    0
  )(() => {
    for (let i = maxRadius; i > 0; i--) {
      context.fillStyle = gradients[0](i / maxRadius).string()
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
  context.fillStyle = rgb(1, 0, 0).string()
  let radius = 5
  context.beginPath()
  context.arc(centerX, centerY + radius * 0.3, radius, 0, Math.PI * 2)
  context.fill()
}

// const blurredCircle = (context, centerX, centerY) => {}
