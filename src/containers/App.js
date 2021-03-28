import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import HomeContainer from './homeContainer'
import GameContainer from './gameContainer'
import DeckEditorContainer from './deckEditorContainer'
import '../styles/App.css'

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
          <Route
            path="/decks"
            component={DeckEditorContainer}
          />
          <Route 
            path="*"
            component={HomeContainer}
          />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
