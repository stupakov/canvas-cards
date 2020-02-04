const rgb = (r, g, b) => rgba(r, g, b, 1)
const rgba = (r, g, b, a) => `rgb(${r * 255}, ${g * 255}, ${b * 255}, ${a})`

export { rgb, rgba }
