import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginContainer from './components/LoginContainer'
import GameContainer from './components/GameContainer'
import './styles/App.css';

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
  );
}

export default App;
