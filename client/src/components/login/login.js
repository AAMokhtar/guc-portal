import React, { Component } from "react";
import * as authService from "./authenticationService";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import axios from "axios";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      serverErr: "",
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  //update state
  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  //API call
  handleLogin(event) {
    event.preventDefault();
    const payload = {
      email: this.state.email,
      password: this.state.password,
    };

    async function onLogin(payload) {
      var config = {
        method: "post",
        url: "http://localhost:4000/general/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: payload,
      };

      let result = await axios(config);

      return result.data.token;
    }
    (async () => {
      let token = await onLogin(payload);
      console.log(token);
      localStorage.setItem("token", token);
      console.log(token);
      //get user info
      authService
        .fetchUser()
        .then(function (response) {
          console.log(response);
          localStorage.setItem("user", JSON.stringify(response));
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    })();
  }

  render() {
    return (
      <div className="background">
        <form className="login-container">
          <h3 className="text-center">Log in</h3>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={this.handleEmailChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={this.handlePasswordChange}
            />
          </div>

          <div className="form-group text-center text-danger">
            {this.state.serverErr}
          </div>

          <button
            type="submit"
            className="btn royal-blue text-white btn-lg btn-block"
            onClick={this.handleLogin}
          >
            Sign in
          </button>
        </form>
      </div>
    );
  }
}
