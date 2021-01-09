import React from 'react';
import * as authService from '../login/authenticationService';

const styleLogOut = {
    "margin-left":"auto",
    "margin-right":"2vw"
}

const styleLI = {
    "margin-right":"1vw"
}
const handleClick = () =>
{
    const elem = document.getElementById('sidebar');
    elem.classList.toggle('collapse');
}
const btn = {
    className:"btn btn-outline-info",
    style: {
        "margin-left" : "2vw",
        "margin-right": "2vw"
    },
    onClick : handleClick
}

function handleLogout(event){
    event.preventDefault();

    authService.onLogout()
    .then(res =>{
        localStorage.removeItem('token');
        window.location.reload();
    })
    .catch(error => {
        console.log(error.response.data.msg);
    })
}

function NavComponent()
{
    return (
        <nav className="navbar navbar-expand-lg sticky-top">
            <button {...btn}>&#9776;</button>
            <div className="d-lg-inline-flex flex-row" style={{"width":"60%"}}><h2 className="mx-auto">Welcome to hell reincarnate</h2></div>
            <div className="d-lg-inline-flex flex-row" style={{"width":"25%"}}>
            <ul className="navbar-nav mx-auto">
                <li className="nav-item" style={styleLI}>
                    <a className="nav-link" href="#">Schedule</a>
                </li>
                <li className="nav-item" style={styleLI}>
                    <a className="nav-link" href="#">Report Uni</a>
                </li>
            </ul>
            </div>
            <div className="d-lg-inline-flex flex-row" style={{"width":"20%"}}><button className="btn btn-danger" style={styleLogOut}
            onClick={handleLogout}>Log Out</button></div>
        </nav>
    )
}

export default NavComponent;
