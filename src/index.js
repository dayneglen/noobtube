import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import './index.css';
import App from './App';
import { BrowserRouter, HashRouter } from "react-router-dom";
const Router = process.env.NODE_ENV === "development" ? HashRouter : BrowserRouter;

<<<<<<< HEAD
// import reportWebVitals from './reportWebVitals';
=======
>>>>>>> 7bffcdc9a0cd87bed031aaf004715fb70a375294

ReactDOM.render(
  
    
    <React.StrictMode>
      <Provider store={store}>
      <Router>
        <App />
      </Router>
      </Provider>
    </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
