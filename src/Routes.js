// comment
import { Switch, Route } from "react-router-dom";
import Account from "./Components/Account";
import Auth from "./Components/Auth";
import Dash from "./Components/Dash";
import Video from "./Components/Video";
import Header from "./Components/Header";


export default (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route path="/dash" component={Dash} />
    <Route path="/video" component={Video} />
    <Route path="/header" component={Header} />
    <Route path="/account" component={Account} />
  </Switch>
);
