import { rgb } from '../common/colors.js'
import { prepareCanvas, drawAt, drawRotated } from '../common/drawing.js'

const identity = x => x
const partial = (f = identity, ...x) => (...y) => f(...x, ...y)
const withContext = ctx => fn => partial(fn, ctx)

export default function (canvas) {
  const width = 300
  const height = 500
  let context = prepareCanvas(canvas, width, height)

  // Backgrounds
  const bgcolor = rgb(0.7, 0.9, 1)
  context.fillStyle = bgcolor
  context.fillRect(0, 0, width, height)

  // Draw some stuff
  withContext(context)(vignette)(width / 2, height / 2)
  withContext(context)(branches)(width / 2, height / 2)
}

function vignette (context, centerX, centerY) {
  for (let i = 350; i > 0; i--) {
    context.fillStyle = rgb(0.2, 0.9 - i / 600, 1 - i / 700)
    let radius = i
    context.beginPath()
    context.arc(centerX, centerY, radius, 0, Math.PI * 2)
    context.fill()
  }
}

const branches = (context, startX, startY) => {
  drawAt(
    context,
    startX,
    startY,
    Math.PI
  )(() => {
    drawRotated(
      context,
      Math.PI / 6
    )(() => {
      spiral({
        context,
        strokeStyle: i => rgb(0.9, 0.9 - i / 500, 1 - i / 200),
        v: 0.5,
        omega: Math.PI / 200,
        segments: 800
      })
    })

    drawRotated(
      context,
      -Math.PI / 3
    )(() => {
      spiral({
        context,
        strokeStyle: i => rgb(0.2 + i / 1900, 0.7 - i / 900, 0.9 - i / 900),
        v: 0.35,
        omega: -Math.PI / 160,
        segments: 900
      })
    })

    spiral({
      context,
      strokeStyle: i => rgb(0.9 - i / 200, 0.8 - i / 400, 0.9 - i / 500),
      v: 0.8,
      omega: -Math.PI / 160,
      segments: 800
    })
  })
}

const spiralPath = ({ v, omega }) => i => {
  let c = 0

  let x = (v * i + c) * Math.cos(omega * i)
  let y = (v * i + c) * Math.sin(omega * i)

  return { x: x, y: y }
}

const spiral = ({ context, strokeStyle, v, omega, segments }) => {
  let path = spiralPath({ v, omega })

  for (let i = 1; i < segments; i++) {
    let from = path(i)
    let to = path(i + 2)

    context.beginPath()

    context.moveTo(from.x, from.y)
    context.strokeStyle = strokeStyle(i)

    context.lineTo(to.x, to.y)
    context.lineWidth = (10 * i) / 200
    context.stroke()
  }
}
