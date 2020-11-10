import './App.scss';
import Header from './Components/Header'
import SideBar from './Components/SideBar'
import Routes from './Routes';
import { withRouter } from 'react-router-dom'

function App(props) {
  return (
    <div className="App">
      {props.location.pathname !== '/' && <Header />}
      {props.location.pathname !== '/' && <SideBar/>}
      {Routes}
    </div>
  );
}

export default withRouter(App);