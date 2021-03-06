import './App.css';
import "./Markdown.css";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAuth } from "./actions/authActions"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/pages/home/Home";
import CreateNewNav from "./components/pages/CreateNew/CreateNewNav";
import Spinner from "./components/Spinner";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Profile from "./components/pages/profile/Profile";
import CreatePost from "./components/pages/CreateNew/CreatePost";
import Post from "./components/pages/post/Post";
import Logout from "./components/pages/Logout";
import Search from "./components/pages/Search";
import Settings from './components/pages/settings/Settings';

const AppContent = () => {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Navbar />
          <Home currentPage="recent" />
        </Route>
        <Route path="/top">
          <Navbar />
          <Home currentPage="top" />
        </Route>
        <Route path="/login">
          <Navbar />
          <Login />
        </Route>
        <Route path="/register">
          <Navbar />
          <Register />
        </Route>
        <Route path="/profile/:name">
          <Navbar />
          <Profile />
        </Route>
        <Route path="/logout">
          <Navbar />
          <Logout />
        </Route>
        <Route path="/post/:id">
          <Navbar />
          <Post />
        </Route>
        <Route path="/create-new">
          <CreateNewNav />
          <CreatePost />
        </Route>
        <Route path="/search/:query">
          <Navbar />
          <Search />
        </Route>
        <Route path="/settings">
          <Navbar />
          <Settings />
        </Route>
      </Switch>
    </div>
  </Router>
  )
}

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(isAuth())
  }, [])

  return (
    <Fragment>
      {
        isAuthenticated === null ? <Spinner /> : <AppContent />
      }
    </Fragment>
  );
}

export default App;
