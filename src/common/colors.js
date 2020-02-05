const rgb = (r, g, b) => rgba(r, g, b, 1)
const rgba = (r, g, b, a) => `rgb(${r * 255}, ${g * 255}, ${b * 255}, ${a})`

const gradients = [
  i => rgb(0.2 + i * 0.2, 0.9 - i, 1 - i * 0.7),
  i => rgb(0.9, 0.9 - i * 0.5, 1 - i * 0.2)
]

export { rgb, rgba, gradients }
