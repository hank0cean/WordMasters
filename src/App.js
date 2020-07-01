import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CodenamesLogin from './components/CodenamesLogin'
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <CodenamesLogin />
          </Route>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
