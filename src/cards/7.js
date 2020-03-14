import { rgb, rgba, gradients } from '../common/colors.js'
import { drawAt } from '../common/drawing.js'

// TODO get this working later.
// static image of the #6 animation but at them moment when 5 spheres are introduced. the layering of the spheres looks nice.

const getVertices = (points, radius) =>
  points == 1
    ? [{ x: 0, y: 0 }]
    : [...Array(points).keys()].map(idx => ({
        x: +radius * Math.sin((Math.PI * 2 * idx) / points),
        y: -radius * Math.cos((Math.PI * 2 * idx) / points)
      }))

const vertexGroups = [...Array(5).keys()].map(n => getVertices(n + 1, 100))

const draw = ({ context, width, height }) => {
  let x0 = vertexGroups[4][0].x,
    y0 = vertexGroups[4][0].y,
    x1 = vertexGroups[4][1].x,
    y1 = vertexGroups[4][1].y,
    x2 = vertexGroups[4][2].x,
    y2 = vertexGroups[4][2].y,
    x3 = vertexGroups[4][3].x,
    y3 = vertexGroups[4][3].y,
    x4 = vertexGroups[4][4].x,
    y4 = vertexGroups[4][4].y

  // Backgrounds
  // const bgcolor = rgba(0.9, 0.7, 1, 0.06)
  const bgcolor = rgb(0.9, 0.7, 1)
  context.fillStyle = bgcolor
  context.fillRect(0, 0, width, height)

  // Draw some stuff
  // sphere(context, width / 2, height / 2)
  // dot(context, width / 2, height / 2)
  // blurredCircle(context, width / 2, height / 2)

  // console.log({ x1, y1 })

  let lastLine = () => {}
  if (x1 || y1) {
    line(
      context,
      width / 2 + x0,
      height / 2 + y0,
      width / 2 + x1,
      height / 2 + y1
    )
  }
  if (x2 || y2) {
    line(
      context,
      width / 2 + x1,
      height / 2 + y1,
      width / 2 + x2,
      height / 2 + y2
    )
    lastLine = () =>
      line(
        context,
        width / 2 + x2,
        height / 2 + y2,
        width / 2 + x0,
        height / 2 + y0
      )
  }
  if (x3 || y3) {
    line(
      context,
      width / 2 + x2,
      height / 2 + y2,
      width / 2 + x3,
      height / 2 + y3
    )
    lastLine = () =>
      line(
        context,
        width / 2 + x3,
        height / 2 + y3,
        width / 2 + x0,
        height / 2 + y0
      )
  }
  if (x4 || y4) {
    line(
      context,
      width / 2 + x3,
      height / 2 + y3,
      width / 2 + x4,
      height / 2 + y4
    )
    lastLine = () =>
      line(
        context,
        width / 2 + x4,
        height / 2 + y4,
        width / 2 + x0,
        height / 2 + y0
      )
  }
  lastLine()

  sphere(context, width / 2 + x0, height / 2 + y0)
  if (x1 || y1) {
    sphere(context, width / 2 + x1, height / 2 + y1)
  }
  if (x2 || y2) {
    sphere(context, width / 2 + x2, height / 2 + y2)
  }
  if (x3 || y3) {
    sphere(context, width / 2 + x3, height / 2 + y3)
  }
  if (x4 || y4) {
    sphere(context, width / 2 + x4, height / 2 + y4)
  }
}

const sphere = (context, centerX, centerY, maxRadius = 200) => {
  const yOffset = -0.3 // between -1 and 1
  const xOffset = 0.3 // between -1 and 1

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

const line = (context, x0, y0, x1, y1) => {
  for (let i = 7; i > 0; i--) {
    context.beginPath()
    context.moveTo(x0, y0)
    context.lineTo(x1, y1)
    context.lineWidth = i
    context.strokeStyle = rgba(0.1, 0.2, 0.4, 0.17)
    context.lineCap = 'round'
    context.stroke()
  }
}

const dot = (context, centerX, centerY) => {
  context.fillStyle = rgb(1, 0, 0)
  let radius = 5
  context.beginPath()
  context.arc(centerX, centerY + radius * 0.3, radius, 0, Math.PI * 2)
  context.fill()
}

export default { draw }
