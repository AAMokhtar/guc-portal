import React from 'react';
import './sidebar.css';
import {Link} from 'react-router-dom';


const notifDropDown = {
    href: "#notificationSubmenu",
    className: "list-group-item dropdown-toggle",
    "data-toggle" : "collapse",
    "aria-expanded" : "false",
    "aria-controls": "academicSubmenu" 
}

const editProfile = {
    to: "/editProfile",
    className: "list-group-item dropdown-toggle side-header",
    "data-toggle" : "collapse",
    "aria-expanded" : "false",
}


function SidebarComponent() {
    return (
        <div className="collapse list-group list-group-flush" id="sidebar">
            {/*<a href="#" className="list-group-item active">Home</a>
            <a {...academicDD}>Academic</a>*/}
            {/* <Link {...dashboard}>
                Dashboard
            </Link> */}
            
            <Link {...editProfile}>
                Edit Profile
            </Link>
            <div className="collapse" id="academicSubmenu">
                <a href="#" className="list-group-item">Schedule</a>
                <a {...notifDropDown}>Notifications<span className="badge rounded-pill bg-info" style={{marginLeft: "35%"}}>9</span></a>
                <div className="collapse list-group-item dropdown" id="notificationSubmenu" style={{"padding":"0", "border": "0"}}>
                    <a href="#" className="list-group-item">All</a>
                    <a href="#" className="list-group-item d-flex justify-content-between align-items-center">Accepted<span className="badge rounded-pill bg-info">6</span></a>
                    <a href="#" className="list-group-item d-flex justify-content-between align-items-center">Rejected<span className="badge rounded-pill bg-info">3</span></a>
                </div>
                <a href="#" className="list-group-item">Buy me smarties!</a>
            </div>
        </div>
    )
}

export default SidebarComponent;
