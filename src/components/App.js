import React from 'react'
import CanvasCard from './CanvasCard.js'
import one from '../cards/one.js'
import two from '../cards/two.js'

const App = () => (
  <div class='gallery'>
    <CanvasCard fn={two} name='two' />
    <CanvasCard fn={one} name='one' />
  </div>
)

export default App
