import React, { Component } from "react";
import * as authService from './authenticationService';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./login.css"


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            serverErr: ''
        };
    
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
      }

    //update state
    handleEmailChange(event) {
        this.setState({email: event.target.value});
     };
    handlePasswordChange(event) {
        this.setState({password: event.target.value});
     };

    //API call
    handleLogin(event){
        event.preventDefault();
        const payload = {
            email: this.state.email,
            password: this.state.password
        };

        authService.onLogin(payload)
        .then(res =>{
            localStorage.setItem('token', res);
            window.location.reload();
        })
        .catch(error => {
            this.setState({serverErr: error.response.data.msg});
        })
    }


    render() {
        return (

            <div className="background">
            <form className="login-container">

                <h3 className="text-center">Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={this.handleEmailChange}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={this.handlePasswordChange}/>
                </div>

                <div className="form-group text-center text-danger">
                {this.state.serverErr}
                </div>

                <button type="submit" className="btn royal-blue text-white btn-lg btn-block" onClick={this.handleLogin}>Sign in</button>
            </form>
            </div>
        );
    }
}