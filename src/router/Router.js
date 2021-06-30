import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import Main from "../pages/Dashboard";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Newblog from "../pages/NewBlog";
import Profile from "../pages/Profile";

const AppRouter = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Main} />
        <Route path="/newblog" component={Newblog} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
