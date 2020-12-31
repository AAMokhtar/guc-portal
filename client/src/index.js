import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
import Sidebar from './sidebar';
import Main from './main';
import Nav from './navbar';
import reportWebVitals from './reportWebVitals';
/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/
const wrapper = {
  className : "d-flex",
  "width": "100%",
  "align-items" : "stretch"
}

ReactDOM.render(
  <React.StrictMode>
    <div {...wrapper}>
      <Sidebar />
      <div className="container-fluid">
        <Nav />
        <Main />
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
