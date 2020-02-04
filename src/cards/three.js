const identity = x => x
const partial = (f = identity, ...x) => (...y) => f(...x, ...y)
const withContext = ctx => fn => partial(fn, ctx)

export default function (canvas) {
  let { context, width, height } = prepareCanvas(canvas)

  // Backgrounds
  const bgcolor = rgb(0.7, 0.9, 1)
  context.fillStyle = bgcolor
  context.fillRect(0, 0, width, height)

  // Draw some stuff
  withContext(context)(vignette)(width / 2, height / 2)
  withContext(context)(branches)(width / 2, height / 2)
}

function prepareCanvas (canvas) {
  canvas.width = 600
  canvas.height = 1000
  canvas.style.width = '300px'
  canvas.style.height = '500px'

  let context = canvas.getContext('2d')
  context.scale(2, 2)

  let width = canvas.width / 2
  let height = canvas.height / 2

  return {
    context,
    width,
    height
  }
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

const drawAt = (context, x, y, theta) => fn => {
  context.save()
  context.translate(x, y)
  context.rotate(theta)
  fn()
  context.restore()
}

const drawRotated = (context, theta) => fn => drawAt(context, 0, 0, theta)(fn)

const rgb = (r, g, b) => rgba(r, g, b, 1)
const rgba = (r, g, b, a) => `rgb(${r * 255}, ${g * 255}, ${b * 255}, ${a})`
