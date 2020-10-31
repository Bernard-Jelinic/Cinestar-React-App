import React from "react";
import { Component } from "react";

export default class CinestarName extends Component {
  render() {
    return (
      <div className="cinestar-name">
        <div className="cinestar-name-small">
          <p>Naslovna &gt;&nbsp;</p>
          <p className="small-city-text">{this.props.selectedCity}</p>
        </div>
        <div className="cinestar-name-big">
          <h1 className="big-city-text">{this.props.selectedCity}</h1>
        </div>
      </div>
    );
  }
}
