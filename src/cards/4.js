import { rgb } from '../common/colors.js'
import { prepareCanvas, drawAt, drawRotated } from '../common/drawing.js'

function roundRect (ctx, x, y, width, height, radius, strokeStyle) {
  if (typeof radius === 'undefined') {
    radius = 5
  }
  if (typeof radius === 'number') {
    radius = { tl: radius, tr: radius, br: radius, bl: radius }
  } else {
    var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 }
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side]
    }
  }
  ctx.beginPath()
  ctx.moveTo(x + radius.tl, y)
  ctx.lineTo(x + width - radius.tr, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr)
  ctx.lineTo(x + width, y + height - radius.br)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height)
  ctx.lineTo(x + radius.bl, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl)
  ctx.lineTo(x, y + radius.tl)
  ctx.quadraticCurveTo(x, y, x + radius.tl, y)
  ctx.closePath()

  ctx.strokeStyle = strokeStyle
  ctx.lineWidth = 2
  ctx.stroke()
}

const stroke1 = i => rgb(0, 0, 0)
const stroke2 = stroke1

export default function (canvas) {
  const width = 300
  const height = 500
  let context = prepareCanvas(canvas, width, height)

  // Backgrounds
  const bgcolor = rgb(1, 1, 1)
  context.fillStyle = bgcolor
  context.fillRect(0, 0, width, height)

  // Draw some stuff
  branches(context, width / 2, height / 2)

  for (let i = 1; i < 14; i++) {
    roundRect(context, i, i, width - 2 * i, height - 2 * i, 40, rgb(0, 0, 0))
  }
  for (let i = -20; i < 1; i++) {
    roundRect(context, i, i, width - 2 * i, height - 2 * i, 40, rgb(1, 1, 1))
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
      0
    )(() => {
      spiral({
        context,
        strokeStyle: stroke1,
        v: 0.5,
        omega: Math.PI / 150,
        segments: 800
      })
    })

    drawRotated(
      context,
      (Math.PI * 2) / 3
    )(() => {
      spiral({
        context,
        strokeStyle: stroke1,
        v: 0.5,
        omega: Math.PI / 150,
        segments: 800
      })
    })

    drawRotated(
      context,
      (Math.PI * 4) / 3
    )(() => {
      spiral({
        context,
        strokeStyle: stroke1,
        v: 0.5,
        omega: Math.PI / 150,
        segments: 800
      })
    })

    drawRotated(
      context,
      0
    )(() => {
      spiral({
        context,
        strokeStyle: stroke2,
        v: 0.5,
        omega: -Math.PI / 150,
        segments: 800
      })
    })

    drawRotated(
      context,
      (Math.PI * 2) / 3
    )(() => {
      spiral({
        context,
        strokeStyle: stroke2,
        v: 0.5,
        omega: -Math.PI / 150,
        segments: 800
      })
    })

    drawRotated(
      context,
      (Math.PI * 4) / 3
    )(() => {
      spiral({
        context,
        strokeStyle: stroke2,
        v: 0.5,
        omega: -Math.PI / 150,
        segments: 800
      })
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

  for (let i = 0; i < segments; i++) {
    let from = path(i)
    let to = path(i + 2)

    context.beginPath()

    context.moveTo(from.x, from.y)
    context.strokeStyle = strokeStyle(i)

    context.lineTo(to.x, to.y)
    context.lineWidth = (10 * i + 2000) / 300
    context.stroke()
  }
}
