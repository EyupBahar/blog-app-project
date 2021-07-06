import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";
import PrivateRouter from "./PrivateRouter";
import Details from "../pages/Details";
import Login from "../pages/Login";
import UpdateBlog from "../pages/UpdateBlog";

function AppRouter() {
  return (
    <div>
    <Router>
      <NavBar />
      <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/register" component={Register} />
      <Route path="/Login" component={Login} />
      <Route path="/details/:id" component={Details} />
      <PrivateRouter 
          component={() => (
            <>
          <Route path="/profile" component={Profile} />
          <Route path="/update-blog/:id" component={UpdateBlog} />
          <Route path="/newBlog" component={NewBlog} />
        </>
          )}
        ></PrivateRouter>
      </Switch>
    </Router>
  </div>
  );
}

export default AppRouter;