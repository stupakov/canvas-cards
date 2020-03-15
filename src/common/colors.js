import Color from 'color'

const rgb = (r, g, b) => Color.rgb(fromRatio(r, g, b))
const rgba = (r, g, b, a) => rgb(r, g, b).fade(a)

const fromRatio = (r, g, b) => [r * 255, g * 255, b * 255]

const gradients = [
  i => rgb(0.2 + i * 0.2, 0.9 - i, 1 - i * 0.7),
  i => rgb(0.9, 0.9 - i * 0.5, 1 - i * 0.2),
  i => rgb(0.9, 0.6, 0.1),
  i => rgb(1, 0.9, 0),
  i => rgb(0.564, 0.047, 0.25),

  i => {
    let r, g, b
    if (i < 0.5) {
      r = 0.9 + 0.1 * i * 2
      g = 0.6 + 0.3 * i * 2
      b = 0.1 - 0.1 * i * 2
    } else {
      r = 1 - (1 - 0.564) * (i - 0.5) * 2
      g = 0.9 - (1 - 0.047) * (i - 0.5) * 2
      b = 0 + 0.25 * (i - 0.5) * 2
    }
    return rgb(r, g, b)
  }
]

const geoNavy = Color('#00225e')
const geoGreen = Color('#005c0d')
const geoGold = Color('#f7df00')
const geoMaroon = Color('#4e067d')
// const geoBlue = Color('00399c')

const themes = {
  geo: [geoNavy, geoGreen, geoGold, geoMaroon]
}

export { rgb, rgba, gradients, themes }
