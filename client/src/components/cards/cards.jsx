import React from "react";
import PropType from "prop-types";
import { Link } from "react-router-dom";

export const Cards = (props) => {
  return (
    <div className="card text-center" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.text}.</p>
        <Link to={props.link} className="btn btn-primary">
          Open Link
        </Link>
      </div>
    </div>
  );
};

Cards.propTypes = {
  title: PropType.string,
  src: PropType.string,
};
