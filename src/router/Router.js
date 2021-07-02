import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState} from "react";
import NavBar from "../components/NavBar";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import Login from "../pages/Login";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";
import PrivateRouter from "./PrivateRouter";
import Details from "../pages/Details";

function AppRouter() {
  const [isAuth, setIsAuth] = useState(true);

  const AuthContainer = () => (
    <div>
      <PrivateRouter isAuth={isAuth} path="/details" component={Details} />
      {/* <PrivateRouter path="/about" component={About} /> */}
      <PrivateRouter path="/profile" component={Profile} />
      <PrivateRouter path="/newBlog" component={NewBlog} />
      <PrivateRouter path="/detail/:id" exact component={Details} />
      {/* <PrivateRouter path="/update-blog/:id" component={UpdateBlog} /> */}
    </div>
  );
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route
          path="/login"
          exact
          component={() => <Login setIsAuth={setIsAuth} isAuth={isAuth} />}
        />
        <Route path="/" exact component={Dashboard} />
        <Route path="/register" exact component={Register} />
        {/* <Route path="/about" exact component={About} /> */}
        <Route component={AuthContainer} />
      </Switch>
    </Router>
  );
}

export default AppRouter;