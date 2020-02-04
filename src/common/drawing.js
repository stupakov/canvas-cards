function prepareCanvas (canvas, width, height) {
  canvas.width = width * 2
  canvas.height = height * 2
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  let context = canvas.getContext('2d')
  context.scale(2, 2)

  return context
}

const drawAt = (context, x, y, theta) => fn => {
  context.save()
  context.translate(x, y)
  context.rotate(theta)
  fn()
  context.restore()
}

const drawRotated = (context, theta) => fn => drawAt(context, 0, 0, theta)(fn)

export { prepareCanvas, drawAt, drawRotated }
