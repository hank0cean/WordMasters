import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import LoginContainer from './components/loginContainer'
import GameContainer from './components/gameContainer'
import './styles/App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <LoginContainer />
          </Route>
          <Route path="/game">
            <GameContainer />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
