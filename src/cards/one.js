export default function (canvas) {
  var context = canvas.getContext('2d')

  // New Retina canvas
  canvas.width = 600
  canvas.height = 1000
  canvas.style.width = '300px'
  canvas.style.height = '500px'
  context.scale(2, 2)

  var width = canvas.width / 2
  var height = canvas.height / 2

  const bgcolor = '#ccccdd' //'#200F8C';

  // Backgrounds
  context.fillStyle = bgcolor
  context.fillRect(0, 0, width, height)

  const countX = 7
  const countY = 11
  const marginX = 38
  const marginY = 57

  const grid = createGrid(countX, countY)

  drawOnGrid(grid, width, height, marginX, marginY, (x, y) => {
    const angle = Math.atan2(y - height / 2, x - width / 2) // y, x
    const magnitude = Math.sqrt(
      Math.pow(y - height / 2, 2) + Math.pow(x - width / 2, 2)
    )
    const maximum = Math.sqrt(Math.pow(height / 2, 2) + Math.pow(width / 2, 2))
    const relativeMagnitude = (magnitude / maximum) * 1.2

    drawAt(context, x, y, angle, () => {
      cone(context, relativeMagnitude)
    })
  })
}

function drawAt (context, x, y, theta, fn) {
  context.save()
  context.translate(x, y)
  context.rotate(theta)
  fn()
  context.restore()
}

function drawOnGrid (gridPoints, width, height, marginX, marginY, fn) {
  gridPoints.forEach(points => {
    // Deconstruct into variables
    // u and v values are between 0..1
    var u = points[0]
    var v = points[1]

    // Lerp will distribute the point on our canvas based on
    // it's value between 0..1
    var x = lerp(marginX, width - marginX, u)
    var y = lerp(marginY, height - marginY, v)

    fn(x, y)
  })
}

// TODO pass the length into this function
function cone (context, scale) {
  let arcWidth = 1 / 8

  for (let i = 0; i < 40; i++) {
    context.fillStyle = 'rgb(200, ' + (200 - i * 7) + ', 0)'
    drawAt(context, scale * i, 0, 0, () => {
      context.beginPath()
      context.arc(0, 0, i * arcWidth, 0, 2 * Math.PI, false)
      context.fill()
    })
  }

  for (let i = 0; i < 10; i++) {
    context.fillStyle = 'rgba(0, 0, 200, 0.1)'
    drawAt(context, scale * (i + 40), 0, 0, () => {
      context.beginPath()
      context.arc(0, 0, (40 + i) * arcWidth, 0, 2 * Math.PI, false)
      context.fill()
    })
  }

  for (let i = 0; i < 10; i++) {
    context.fillStyle = 'rgba(50, 200, 0, 0.1)'
    drawAt(context, scale * (i + 50), 0, 0, () => {
      context.beginPath()
      context.arc(0, 0, (50 + i) * arcWidth, 0, 2 * Math.PI, false)
      context.fill()
    })
  }
}

function createGrid (countX, countY) {
  const points = []

  // Will return a set of points between 0..1
  for (let x = 0; x < countX; x++) {
    for (let y = 0; y < countY; y++) {
      const u = countX <= 1 ? 0.5 : x / (countX - 1)
      const v = countY <= 1 ? 0.5 : y / (countY - 1)

      points.push([u, v])
    }
  }
  return points
}

// Math stuff
function lerp (min, max, t) {
  return min * (1 - t) + max * t
}

function rangeFloor (min, max) {
  // Return a random whole number between min and max
  return Math.floor(Math.random() * (max - min) + min)
}

function pick (array) {
  // Pick a random item out of an array
  if (array.length === 0) return undefined
  return array[rangeFloor(0, array.length)]
}
