import React from "react";
import { Component } from "react";

export default class BoxZanrTime extends Component {
  render() {
    return (
      <div
        className="box-zanr-time"
        onClick={(event) => this.props.callFunc(event)}
      >
        <div id="Odabir prema žanru" className="zanr">
          Odabir prema žanru
        </div>
        <div id="Odabir prema vremenu prikazivanja" className="time">
          Odabir prema vremenu prikazivanja
        </div>
      </div>
    );
  }
}
