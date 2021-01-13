//TOP LEVEL (ROOT) FILE

import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {Router, Route,} from 'react-router-dom';
import axios from 'axios';
import {onTokenExpire} from './components/login/authenticationService';


//import your components
import Sidebar from './components/sidebar/sidebar';
import Home from './components/home/home';
import Nav from './components/navbar/navbar';
import Login from './components/login/login';
import StaffProfile from "./views/staffProfile";

//for routing
const createHistory = require("history").createBrowserHistory;
const browserHistory = createHistory();

//================================:-AXIOS-:====================================

//add token to every request, even login (doesn't hurt).
axios.defaults.headers.common['auth-token'] = localStorage.getItem('token');

//refresh token if when it expires
axios.interceptors.response.use( (response) => {
  // Return a successful response back to the calling service
  return response;
}, (error) => {
  // Return any error which is not due to authentication back to the calling service
  if (error.response.status !== 401) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

  if(error.config.url === 'http://localhost:4000/general/refresh-token'){
    localStorage.removeItem('token');
    browserHistory.push('/');

    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

  // Try request again with new token
  return onTokenExpire({jwt: localStorage.getItem('token')})
    .then((token) => {

      // New request with new token
      const config = error.config;
      config.headers['auth-token'] = token;
      localStorage.setItem('token', token);

      return new Promise((resolve, reject) => {
        axios.request(config).then(response => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        })
      });

    })
    .catch((error) => {
      Promise.reject(error);
    });
});


//==============================:-RENDERING-:==================================
const wrapper = {
  className : "d-flex",
  "width": "100%",
  "align-items" : "stretch"
}

ReactDOM.render(
  <React.StrictMode>
    <div {...wrapper}>

      {localStorage.getItem('token')?
      <>
      
      
      
      {/*<Nav />*/}

        {/* ADD YOUR ROUTES BELOW */}
        <Router history={browserHistory}>
        <Sidebar />

        <div className="container-fluid">
          <Nav/>
          
        <Route exact path="/" component={Home}/>
        <Route path="/editProfile" component={StaffProfile}></Route>
        </div>
       

        </Router>

      </>
      :
      <Login />
      }
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
