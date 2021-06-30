import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import Login from "../pages/Login";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";
import { ProtectedRoute } from "./PrivateRouter";
import Details from "../pages/Details";

const AppRouter = () => {
  return (
    <div>
      <Router>
        <NavBar/>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/details/:id" component={Details} />
          <ProtectedRoute
            component={() => (
              <>
              <Route path="/profile" component={Profile} />
              <Route path="/upload" component={NewBlog} />
                {/* <Route path="/edit/:id" component={UpdateBlog} /> */}
              </>
            )}
          ></ProtectedRoute>
        </Switch>
      </Router>
    </div>
  );
};

export default AppRouter;
