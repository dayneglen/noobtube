import './App.css';
import Video from './Components/Video'
import Creator from './Components/Creator';
import Routes from './Routes';

function App() {
  return (
    <div className="App">

      <Video/>
      <Creator />
     {Routes}
    </div>
  );
}

export default App;
