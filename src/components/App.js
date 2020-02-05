import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CanvasCard from './CanvasCard.js'
import Colors from './Colors.js'
import one from '../cards/one.js'
import two from '../cards/two.js'
import three from '../cards/three.js'

const App = () => (
  <Router>
    <Switch>
      <Route path='/colors'>
        <Colors />
      </Route>

      <Route path='/'>
        <div class='gallery'>
          <CanvasCard fn={three} name='three' />
          <CanvasCard fn={two} name='two' />
          <CanvasCard fn={one} name='one' />
        </div>
      </Route>
    </Switch>
  </Router>
)

export default App
