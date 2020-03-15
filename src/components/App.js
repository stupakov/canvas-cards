import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CanvasCard from './CanvasCard.js'
import AnimatedCard from './AnimatedCard.js'
import Colors from './Colors.js'
import one from '../cards/1.js'
import two from '../cards/2.js'
import three from '../cards/3.js'
import four from '../cards/4.js'
import five from '../cards/5.js'
import six from '../cards/6.js'
import stars from '../cards/8-stars.js'

const App = () => (
  <Router>
    <Switch>
      <Route path='/colors'>
        <Colors />
      </Route>

      <Route path='/'>
        <div class='gallery'>
          <AnimatedCard {...stars} name='stars' />
          <AnimatedCard {...six} name='six' />
          <CanvasCard fn={five} name='five' />
          <CanvasCard fn={four} name='four' />
          <CanvasCard fn={three} name='three' />
          <CanvasCard fn={two} name='two' />
          <CanvasCard fn={one} name='one' />
        </div>
      </Route>
    </Switch>
  </Router>
)

export default App
