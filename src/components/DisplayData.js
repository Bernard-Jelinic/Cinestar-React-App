import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

export default class DisplayData extends Component {
  addToStorage(selectedData){
    localStorage.setItem("buyTicket", JSON.stringify(selectedData))
  }
  render() {
    // when you first open app or refresh the browser
    if (this.props.reservation === false) {
      return (
        <div className="display-data">
          {/*this.state.datas because in the Home component the name of the prop is datas*/}
          {this.props.datas.map((data, index) => {
            let arrayActors = data.actors;
            let arrayGenre = data.genre;

            let joinArrayActors = arrayActors.join(", ");
            let joinArrayGenre = arrayGenre.join(", ");

            return (
              <div key={index} className="single-data">
                <img
                  className="data-image"
                  src={data.image.fields.file.url}
                  alt="image picture"
                />
                <div className="movie-desc">
                  <h2>{data.name}</h2>
                  <p><span>Izvorno ime: </span>{data.engName}</p>
                  <p><span>Redatelj: </span>{data.director}</p>
                  <p><span>Glumci: </span>{joinArrayActors}</p>
                  <p><span>Žanr: </span>{joinArrayGenre}</p>
                  <p><span>Trajanje: </span>{data.duration} min</p>
                  <p><span>Država: </span>{data.state}</p>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    else if (this.props.datas.length > 0) {
      return (
        <div className="display-data">
          {this.props.datas.map((data, index) => {
            let arrayActors = data.actors;
            let arrayGenre = data.genre;

            let joinArrayActors = arrayActors.join(", ");
            let joinArrayGenre = arrayGenre.join(", ");
            return (
              <div key={index} className="single-data">
                <img
                  className="data-image"
                  src={data.image.fields.file.url}
                  alt="image picture"
                />
                <div className="movie-desc">
                  <h2>{data.name}</h2>
                  <p><span>Izvorno ime: </span>{data.engName}</p>
                  <p><span>Redatelj: </span>{data.director}</p>
                  <p><span>Glumci: </span>{joinArrayActors}</p>
                  <p><span>Žanr: </span>{joinArrayGenre}</p>
                  <p><span>Trajanje: </span>{data.duration} min</p>
                  <p><span>Država: </span>{data.state}</p>
                  {/*this button is display if you select cinestar city of write something into search*/}
                  <button className="buy-btn">
                  <Link
                    to={`/buymovieticket/${this.props.selectedCity}/${data.name}`}
                    onClick={this.addToStorage}
                    onClick={()=>this.addToStorage(data)}
                  >
                    Rezerviraj kartu
                  </Link>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="single-data">
          <p>Pronađeno 0 filmova za pojam {this.props.selectedZanrTime}</p>
        </div>
      );
    }
  }
}
