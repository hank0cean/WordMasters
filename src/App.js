import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import HomeContainer from './components/homeContainer'
import GameContainer from './components/gameContainer'
import './styles/App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={HomeContainer}
          />
          <Route
            path="/game/:gameRefID"
            component={GameContainer}
          />
          {/* 
            As a best practice you should provide a Route with a path prop = "*" to catch/redirect invalid paths
            
            ex)
            <Route
              path="*"
              component={404Page}
            />

            In the apps current state I think you could just use your HomeContainer so all invalid paths are routed to your start screen
          */}
        </Switch>
      </Router>
    </div>
  )
}

export default App;
