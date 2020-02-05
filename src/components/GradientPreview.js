import React, { useEffect } from 'react'
import { prepareCanvas } from '../common/drawing.js'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  gradientPreview: {
    display: 'flex',
    marginTop: '20px',
    alignItems: 'center',
    '& > .gradient': {
      border: '4px solid white',
      borderRadius: '4px',
      width: '400px',
      height: '30px',
      overflow: 'hidden'
    },
    '& > .gradient-label': {
      marginRight: '10px',
      marginLeft: '10px'
    }
  }
})

const drawGradient = (canvas, fn) => {
  const width = 400
  const height = 30
  let context = prepareCanvas(canvas, width, height)

  for (let i = 0; i < width; i++) {
    context.fillStyle = fn(i / width)
    context.fillRect(i, 0, 1, height)
  }
}

export default ({ gradient, name }) => {
  const classes = useStyles()

  const id = `gradient-preview-${name}`

  useEffect(() => {
    const canvas = document.getElementById(id)
    drawGradient(canvas, gradient)
  })

  return (
    <div className={classes.gradientPreview}>
      <div className='gradient-label'>{name}</div>
      <div className='gradient'>
        <canvas id={id} data-name={id}></canvas>
      </div>
    </div>
  )
}
