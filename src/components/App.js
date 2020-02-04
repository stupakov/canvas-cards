import React from 'react'
import CanvasCard from './CanvasCard.js'
import one from '../cards/one.js'
import two from '../cards/two.js'
import three from '../cards/three.js'

const App = () => (
  <div class='gallery'>
    <CanvasCard fn={three} name='three' />
    <CanvasCard fn={two} name='two' />
    <CanvasCard fn={one} name='one' />
  </div>
)

export default App
