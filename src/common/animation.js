import { gsap } from 'gsap'

const initTimeCounter = () => {
  const start = new Date()
  let currentTime
  const getCurrentTime = () => currentTime

  const updateTime = () => {
    let now = new Date()
    currentTime = now - start
  }

  gsap.ticker.add(updateTime)

  return getCurrentTime
}

export { initTimeCounter }
