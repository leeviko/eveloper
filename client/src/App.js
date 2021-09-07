import './App.css';
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAuth } from "./actions/authActions"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Navbar from "./components/Navbar/Navbar";
import Spinner from "./components/Spinner";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Profile from "./components/pages/Profile";
import Logout from "./components/pages/Logout";

const AppContent = () => {
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
        <Route path="/profile">
          <Navbar />
          <Profile />
        </Route>
        <Route path="/logout">
          <Navbar />
          <Logout />
        </Route>
      </Switch>
    </div>
  </Router>
  )
}

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);

  useEffect(() => {
    dispatch(isAuth())
  }, [])

  return (
    <Fragment>
      {
        isLoading ? <Spinner /> : <AppContent />
      }
    </Fragment>
  );
}

export default App;
