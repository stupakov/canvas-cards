import React, { useEffect } from 'react'
import classNames from 'classnames-es'

const CanvasCard = ({ fn, name }) => {
  let canvas

  useEffect(() => {
    canvas = document.getElementById(name)
    fn(canvas)
  })

  return (
    <div classNames={classNames('gallery-item', name)}>
      <div class='container'>
        <div class='item'>
          <div class='card front'>
            <canvas id={name} data-name={name}></canvas>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CanvasCard
