import React from 'react';

const styleMain = {
    "margin-left":"2vw"
}
const cardImg = {
    width: "200",
    height: "200",
    style: {
        "display":"block",
        "margin":"auto"
    }
}
function MainComponent()
{
    return (
        <div className="mt-4" style={styleMain} id="home">
            <div>
            <h1>GUC Portal</h1>
            <h2>The key to your neverending nightmares</h2>
            </div>
            <div className="d-flex">
                <a href="#getsmart" style={{"text-decoration":"none"}}>
                    <div className="card text-white bg-info" style={{"max-width":"18rem", "margin":"2rem"}}>
                        <div className="card-body">
                            <h5 className="card-title" style={{"text-align":"center"}}>Smarties</h5>
                            <img src="https://www.svgrepo.com/show/140572/smarties.svg" alt="It's smarties you dumbass" {...cardImg}></img>
                        </div>
                    </div>
                </a>
                <a href="#Eminem" style={{"text-decoration":"none"}}>
                    <div className="card text-white bg-info" style={{"max-width":"18rem","margin":"2rem"}}>
                        <div className="card-body">
                            <h5 className="card-title" style={{"text-align":"center"}}>M&amp;Ms</h5>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/62/M%26M%27s_logo.svg" alt="It's m&amp;ms you dumbass" {...cardImg}></img>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default MainComponent;
