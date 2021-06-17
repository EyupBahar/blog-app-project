import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Main from "../pages/Main";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Newblog from "../pages/Newblog";
import Profile from "../pages/Profile";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
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
