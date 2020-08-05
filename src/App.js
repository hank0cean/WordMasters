import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import LoginContainer from './components/loginContainer'
import GameContainer from './components/gameContainer'
import './styles/App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            path="/login"
            component={LoginContainer}
          />
          <Route
            path="/game/:gameRefID"
            component={GameContainer}
          />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
