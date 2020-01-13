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

  const bgcolor = rgb(0.7, 0.9, 1)

  // Backgrounds
  context.fillStyle = bgcolor
  context.fillRect(0, 0, width, height)

  bg(context, width / 2, height / 2)
  radiatingCircles(context, width / 2, height / 2)
  rays(context, width / 2, height / 2)
  circles(context, width / 2, height / 2)
}

function bg (context, centerX, centerY) {
  for (let i = 350; i > 0; i--) {
    context.fillStyle = rgb(0.7, 0.9 - i / 1000, 1 - i / 1500)
    let radius = i
    context.beginPath()
    context.arc(centerX, centerY, radius, 0, Math.PI * 2)
    context.fill()
  }
}

function radiatingCircles (context, centerX, centerY) {
  context.strokeStyle = rgba(0.94, 0.85, 0.65, 0.3) // '#F1D9A3'
  context.beginPath()
  for (let k = 0; k < 25; k++) {
    context.arc(centerX, centerY, 120 + Math.pow(k, 1.7), 0, Math.PI * 2)
  }
  context.stroke()
}

function rays (context, centerX, centerY) {
  const delta = (Math.PI * 2) / 32
  for (let theta = 0; theta < Math.PI * 2; theta += delta) {
    drawAt(
      context,
      centerX,
      centerY,
      theta
    )(() => {
      context.strokeStyle = rgba(0.94, 0.85, 0.65, 0.3) // '#F1D9A3'
      context.beginPath()
      context.moveTo(0, 0)
      context.setLineDash([3, 2])

      context.lineTo(1000, 0)
      // context.arc(centerX / 1.5, centerY / 1.5, 50, 0, Math.PI * 2)
      context.stroke()

      // for (let j = 10; j > 0; j -= 1) {
      //   let arcWidth = 1 / (20 + j * 2)
      //   let alpha = 0.005 * j
      //   cone(context, 1, arcWidth, alpha)
      // }
    })
  }
}

function cone (context, scale, arcWidth, alpha) {
  // let arcWidth = 1 / 30

  for (let i = 0; i < 400; i++) {
    context.fillStyle = rgba(1, (200 - i / 2) / 200, 0, alpha)
    drawAt(
      context,
      scale * i,
      0,
      0
    )(() => {
      context.beginPath()
      context.arc(0, 0, i * arcWidth, 0, 2 * Math.PI, false)
      context.fill()
    })
  }
}

function circles (context, centerX, centerY) {
  for (let i = 150; i > 0; i--) {
    context.fillStyle = rgba(
      0.2,
      1 - i / 150,
      1 - i / 150,
      (0.4 * (150 - i)) / 150
    )
    let radius = i
    context.beginPath()
    context.arc(centerX, centerY, radius, 0, Math.PI * 2)
    context.fill()
  }

  for (let i = 100; i > 0; i--) {
    // context.fillStyle = rgba(0.2, 1 - i / 100, 0, 0.1)
    context.fillStyle = rgba(0.7, 0.9 - i / 100, 0.1, 0.1)

    let radius = i
    context.beginPath()
    context.arc(centerX, centerY, radius, 0, Math.PI * 2)
    context.fill()
  }
}

const drawAt = (context, x, y, theta) => fn => {
  context.save()
  context.translate(x, y)
  context.rotate(theta)
  fn()
  context.restore()
}

const rgb = (r, g, b) => rgba(r, g, b, 1)
const rgba = (r, g, b, a) => `rgb(${r * 255}, ${g * 255}, ${b * 255}, ${a})`
