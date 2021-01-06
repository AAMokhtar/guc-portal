import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {Router, Route} from 'react-router';
import createHistory from 'history/createBrowserHistory';

//import your components
import Sidebar from './components/sidebar/sidebar';
import Home from './components/home/home';
import Nav from './components/navbar/navbar';

const browserHistory = createHistory();

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
        
        {/* ADD YOUR ROUTES BELOW */}
        <Router history={browserHistory}>
          <Route exact path="/" component={Home}/>
        </Router>

      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
