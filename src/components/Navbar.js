import React, { Component } from "react";
import { Link } from "react-router-dom";

export default function Navbar(){
    return (
      <nav className="header">
        <div className="zvijezda">
          <Link to="/" >
            <img src="img/cinestar-logotip.png" alt="CineStar" height="105" />
          </Link>
        </div>
        <div className="najbolji">
          <a
            href="https://www.youtube.com/watch?v=TUqa4fhc4us"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="img/najbolji-kinoprikazivac.png"
              alt="Najbolji kinoprikazivač"
            />
          </a>
        </div>
        <div className="social">
          <a
            className="fab fa-facebook"
            href="https://www.facebook.com/CineStarCinemasHrvatska"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
          <a
            className="fab fa-instagram"
            href="https://instagram.com/cinestarcinemas_hr"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
          <a
            className="fab fa-youtube"
            href="http://www.youtube.com/user/CineStarMultiplexi"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </div>
      </nav>
    );
}
