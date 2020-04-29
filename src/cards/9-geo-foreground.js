import { rgb, rgba, gradients, themes } from '../common/colors.js'
import { drawAt, drawRotated } from '../common/drawing.js'

const sphereRadius = 15
const formationRadius = 55

const getVertices = (points, radius) =>
  points == 1
    ? [{ x: 0, y: 0 }]
    : [...Array(points).keys()].map(idx => ({
        x: +radius * Math.sin((Math.PI * 2 * idx) / points),
        y: -radius * Math.cos((Math.PI * 2 * idx) / points)
      }))

const vertexGroups = [...Array(5).keys()].map(n =>
  getVertices(n + 1, formationRadius)
)

const getInitialCoordinates = () => ({
  x0: 0,
  y0: 0,
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  x3: 0,
  y3: 0,
  x4: 0,
  y4: 0
})

const getInitialState = () =>
  Object.assign(
    {
      introProgress: 0,
      fadeProgress: 0
    },
    getInitialCoordinates()
  )

const transitionPoints = ({ point, from, to, duration, at, state, tl }) => {
  tl.fromTo(
    state,
    { [`x${point}`]: vertexGroups[from[0]][from[1]].x },
    { [`x${point}`]: vertexGroups[to[0]][to[1]].x, duration: duration },
    at
  )
  tl.fromTo(
    state,
    { [`y${point}`]: vertexGroups[from[0]][from[1]].y },
    { [`y${point}`]: vertexGroups[to[0]][to[1]].y, duration: duration },
    at
  )
}

const initAnimation = ({ gsap, state }) => {
  var tl = gsap.timeline({
    repeat: -1,
    repeatDelay: 0
  })
  // tl.to(state, { x0: vertexGroups[1][0].x, duration: 1 }, 0)
  // tl.to(state, { y0: vertexGroups[1][0].y, duration: 1 }, 0)
  // tl.to(state, { x1: vertexGroups[1][1].x, duration: 1 }, 0)
  // tl.to(state, { y1: vertexGroups[1][1].y, duration: 1 }, 0)
  // tl.to(state, { x2: vertexGroups[1][1].x, duration: 1 }, 0)
  // tl.to(state, { y2: vertexGroups[1][1].y, duration: 1 }, 0)

  // tl.to(state, { x0: vertexGroups[2][0].x, duration: 1 }, 1)
  // tl.to(state, { y0: vertexGroups[2][0].y, duration: 1 }, 1)
  // tl.to(state, { x1: vertexGroups[2][1].x, duration: 1 }, 1)
  // tl.to(state, { y1: vertexGroups[2][1].y, duration: 1 }, 1)
  // tl.to(state, { x2: vertexGroups[2][2].x, duration: 1 }, 1)
  // tl.to(state, { y2: vertexGroups[2][2].y, duration: 1 }, 1)

  const introDuration = 7
  const fadeDuration = 2

  tl.set(
    state,
    { x0: 0, y0: 0, x1: 0, y1: 0, x2: 0, y2: 0, x3: 0, y3: 0, x4: 0, y4: 0 },
    0
  )

  // zoom first point
  tl.fromTo(
    state,
    { introProgress: 0 },
    { introProgress: 1, duration: introDuration - fadeDuration },
    0
  )

  // fade from intro to main animation
  tl.fromTo(
    state,
    { fadeProgress: 0 },
    { fadeProgress: 1, duration: fadeDuration },
    introDuration - fadeDuration
  )

  // 1->2 points
  transitionPoints({
    point: 0,
    from: [0, 0],
    to: [1, 0],
    duration: 1,
    at: introDuration,
    state,
    tl
  })
  transitionPoints({
    point: 1,
    from: [0, 0],
    to: [1, 1],
    duration: 1,
    at: introDuration,
    state,
    tl
  })

  tl.set(state, { x2: 0, y2: 0, x3: 0, y3: 0, x4: 0, y4: 0 }, 1)

  // 2->3 points
  transitionPoints({
    point: 1,
    from: [1, 1],
    to: [2, 1],
    duration: 1,
    at: 1 + introDuration,
    state,
    tl
  })
  transitionPoints({
    point: 2,
    from: [1, 1],
    to: [2, 2],
    duration: 1,
    at: 1 + introDuration,
    state,
    tl
  })

  tl.set(state, { x3: 0, y3: 0, x4: 0, y4: 0 }, 2)

  // 3->4 points
  transitionPoints({
    point: 1,
    from: [2, 1],
    to: [3, 1],
    duration: 1,
    at: 2 + introDuration,
    state,
    tl
  })
  transitionPoints({
    point: 2,
    from: [2, 2],
    to: [3, 2],
    duration: 1,
    at: 2 + introDuration,
    state,
    tl
  })
  transitionPoints({
    point: 3,
    from: [2, 2],
    to: [3, 3],
    duration: 1,
    at: 2 + introDuration,
    state,
    tl
  })

  tl.set(state, { x4: 0, y4: 0 }, 3)

  // 4->5 points
  transitionPoints({
    point: 1,
    from: [3, 1],
    to: [4, 1],
    duration: 1,
    at: 3 + introDuration,
    state,
    tl
  })
  transitionPoints({
    point: 2,
    from: [3, 2],
    to: [4, 2],
    duration: 1,
    at: 3 + introDuration,
    state,
    tl
  })
  transitionPoints({
    point: 3,
    from: [3, 3],
    to: [4, 3],
    duration: 1,
    at: 3 + introDuration,
    state,
    tl
  })
  transitionPoints({
    point: 4,
    from: [3, 3],
    to: [4, 4],
    duration: 1,
    at: 3 + introDuration,
    state,
    tl
  })

  // 5->1 points
  transitionPoints({
    point: 0,
    from: [4, 0],
    to: [0, 0],
    duration: 1,
    at: 4 + introDuration,
    state,
    tl
  })
  transitionPoints({
    point: 1,
    from: [4, 1],
    to: [0, 0],
    duration: 1,
    at: 4 + introDuration,
    state,
    tl
  })
  transitionPoints({
    point: 2,
    from: [4, 2],
    to: [0, 0],
    duration: 1,
    at: 4 + introDuration,
    state,
    tl
  })
  transitionPoints({
    point: 3,
    from: [4, 3],
    to: [0, 0],
    duration: 1,
    at: 4 + introDuration,
    state,
    tl
  })
  transitionPoints({
    point: 4,
    from: [4, 4],
    to: [0, 0],
    duration: 1,
    at: 4 + introDuration,
    state,
    tl
  })

  tl.call(() => {
    tl.set(state, getInitialCoordinates(), introDuration)
    tl.seek(introDuration)
  })

  // tl.fromTo(
  //   state,
  //   { x0: vertexGroups[0][0].x },
  //   { x0: vertexGroups[1][0].x, duration: 1 },
  //   0
  // )
  // tl.fromTo(
  //   state,
  //   { y0: vertexGroups[0][0].y },
  //   { y0: vertexGroups[1][0].y, duration: 1 },
  //   0
  // )
  // tl.fromTo(
  //   state,
  //   { x1: vertexGroups[0][0].x },
  //   { x1: vertexGroups[1][1].x, duration: 1 },
  //   0
  // )
  // tl.fromTo(
  //   state,
  //   { y1: vertexGroups[0][0].y },
  //   { y1: vertexGroups[1][1].y, duration: 1 },
  //   0
  // )

  // transitionPoints({ from: [1, 0], to: [2, 0], duration: 1, at: 1, state, tl })

  // tl.fromTo(
  //   state,
  //   { x0: vertexGroups[1][0].x },
  //   { x0: vertexGroups[2][0].x, duration: 1 },
  //   1
  // )
  // tl.fromTo(
  //   state,
  //   { y0: vertexGroups[1][0].y },
  //   { y0: vertexGroups[2][0].y, duration: 1 },
  //   1
  // )
  // tl.fromTo(
  //   state,
  //   { x1: vertexGroups[1][1].x },
  //   { x1: vertexGroups[2][1].x, duration: 1 },
  //   1
  // )
  // tl.fromTo(
  //   state,
  //   { y1: vertexGroups[1][1].y },
  //   { y1: vertexGroups[2][1].y, duration: 1 },
  //   1
  // )
  // tl.fromTo(
  //   state,
  //   { x2: vertexGroups[1][1].x },
  //   { x2: vertexGroups[2][2].x, duration: 1 },
  //   1
  // )
  // tl.fromTo(
  //   state,
  //   { y2: vertexGroups[1][1].y },
  //   { y2: vertexGroups[2][2].y, duration: 1 },
  //   1
  // )

  // tl.to(state, { x0: vertexGroups[2][0].x, duration: 1 }, 1)
  // tl.to(state, { y0: vertexGroups[2][0].y, duration: 1 }, 1)
  // tl.to(state, { x1: vertexGroups[2][1].x, duration: 1 }, 1)
  // tl.to(state, { y1: vertexGroups[2][1].y, duration: 1 }, 1)
  // tl.to(state, { x2: vertexGroups[2][2].x, duration: 1 }, 1)
  // tl.to(state, { y2: vertexGroups[2][2].y, duration: 1 }, 1)
}

const draw = ({ context, width, height, state, getCurrentTime }) => {
  let {
    introProgress,
    fadeProgress,
    x0,
    y0,
    x1,
    y1,
    x2,
    y2,
    x3,
    y3,
    x4,
    y4
  } = state

  const time = getCurrentTime()

  const rotationFrequency = 1 / 16
  const theta = (2 * Math.PI * rotationFrequency * time) / 1000

  const maxRadius = Math.min(width, height)
  const minRadius = sphereRadius

  let radius = maxRadius - (maxRadius - minRadius) * introProgress
  let opacity = 0.1 + 0.9 * introProgress

  const drawLines = () => {
    let lastLine = () => {}
    if (x1 || y1) {
      line(context, x0, y0, x1, y1)
    }
    if (x2 || y2) {
      line(context, x1, y1, x2, y2)
      lastLine = () => line(context, x2, y2, x0, y0)
    }
    if (x3 || y3) {
      line(context, x2, y2, x3, y3)
      lastLine = () => line(context, x3, y3, x0, y0)
    }
    if (x4 || y4) {
      line(context, x3, y3, x4, y4)
      lastLine = () => line(context, x4, y4, x0, y0)
    }
    lastLine()
  }

  drawAt(
    context,
    width / 2,
    height / 2,
    0
  )(() => {
    if (introProgress < 1) {
      sphere(context, 0, 0, radius, opacity)
    } else {
      if (fadeProgress < 1) {
        context.save()
        context.globalAlpha = 1 - fadeProgress
        sphere(context, x0, y0, radius, opacity)
        context.restore()

        context.save()
        context.globalAlpha = fadeProgress
        gradientSphere(context, x0, y0)
        context.restore()
      } else {
        drawRotated(
          context,
          theta
        )(() => {
          drawLines()
          gradientSphere(context, x0, y0)
          if (x1 || y1) {
            gradientSphere(context, x1, y1)
          }
          if (x2 || y2) {
            gradientSphere(context, x2, y2)
          }
          if (x3 || y3) {
            gradientSphere(context, x3, y3)
          }
          if (x4 || y4) {
            gradientSphere(context, x4, y4)
          }
        })
      }
    }
  })

  // getVertices(5, 100).forEach(coords => {
  //   gradientSphere(context, width / 2 + coords.x + x, height / 2 + coords.y + y)
  // })
}

const gradientSphere = (
  context,
  centerX,
  centerY,
  maxRadius = sphereRadius,
  opacity = 1
) => {
  const yOffset = -0.3 // between -1 and 1
  const xOffset = 0.3 // between -1 and 1

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

const sphere = (
  context,
  centerX,
  centerY,
  radius = sphereRadius,
  opacity = 1
) => {
  context.save()
  var initialAlpha = context.globalAlpha
  context.globalAlpha = opacity * initialAlpha

  context.fillStyle = gradients[0](1).string()
  context.strokeStyle = gradients[0](0).string()
  context.strokeWidth = 10
  context.beginPath()
  context.arc(centerX, centerY, radius, 0, Math.PI * 2)
  context.fill()
  context.stroke()

  context.globalAlpha = initialAlpha

  context.restore()
}

const line = (context, x0, y0, x1, y1) => {
  for (let i = 5; i > 0; i--) {
    context.beginPath()
    context.moveTo(x0, y0)
    context.lineTo(x1, y1)
    context.lineWidth = i
    context.strokeStyle = rgba(0.7, 0.8, 1, 0.17).string()
    context.lineCap = 'round'
    context.stroke()
  }
}

const dot = (context, centerX, centerY) => {
  context.fillStyle = rgb(1, 0, 0).string()
  let radius = 5
  context.beginPath()
  context.arc(centerX, centerY + radius * 0.3, radius, 0, Math.PI * 2)
  context.fill()
}

export default { draw, getInitialState, initAnimation }
