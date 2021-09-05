import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Navbar />
          </Route>
          <Route path="/login">
            <Navbar />
            <Login />
          </Route>
          <Route path="/register">
            <Navbar />
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
