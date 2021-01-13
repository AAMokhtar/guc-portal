import React from 'react';
import './card-styling.css';

const Card = (props) => {
    return ( 
        <a href="/editProfile" className="card text-center shadow">
            <div className="overflow">
                <img src="https://www.11kbw.com/content/uploads/Banner01.jpg" alt="" className='card-img-top'/>
            </div>
            <div className="card-body text-dark">
                <h4 className="card-title">
                    <p className="card-text text-secondary">
                        Edit Profile
                    </p>
                </h4>
            </div>
        </a>
     );
}

 
export default Card;