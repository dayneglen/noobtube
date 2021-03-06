// comment
import { Switch, Route } from "react-router-dom";
import Account from "./Components/Account";
import Auth from "./Components/Auth";
import Dash from "./Components/Dash";
import Video from "./Components/Video";
import Creator from './Components/Creator';
import Admin from './Components/Admin';
import Tags from './Components/Tags';


export default (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route path="/dash" component={Dash} />
    <Route path="/video" component={Video} />
    <Route path="/account" component={Account} />
    <Route path="/creator" component={Creator} />
    <Route path="/admin" component={Admin} />
    <Route path='/tags' component={Tags}/>
  </Switch>
);
