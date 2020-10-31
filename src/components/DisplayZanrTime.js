import React from "react";
import { Component } from "react";

export default class DisplayZanrTime extends Component {
  render() {
    return (
      <div
        className="display-zanr-time"
        onClick={(event) => this.props.callFunc(event)}
      >
        <ul>
          {this.props.displayArray.map((item, index) => {
            return (
              <li key={index} id={item}>
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
