import React from "react";
import { Component } from "react";
import Client from "../Contentful";

export default class FilterSection extends Component {
  constructor() {
    super();
    this.state = {
      arrayCities: [],
    };
    this.getData();
  }

async getData(){
  Client.getEntries({
    content_type: "cinestarCities",
  }).then((response) => {
    //  in the function are passed data which is respones from the contentful, because it can't be used map function on that response
    let arrayOfCities = this.formatData(response.items[0].fields.cities);
    this.setState({arrayCities: arrayOfCities})
  });
}

//  parametar -> object
//  return -> array
formatData(items){
  let array = []
  items.map((item)=>{
    array.push(item)
  })
  return array;
}

  render() {
    return (
      <div className="filter-section">
        <select
          id="select-city"
          onChange={(event) => this.props.callFunc(event.target.value)}
        >
          <option defaultValue hidden>
            Odaberi kino
          </option>
          {this.state.arrayCities.map((item, index) => {
            return <option key={index}>{item}</option>;
          })}
        </select>
        <div className="input-search">
          <input
            className="input"
            type="text"
            placeholder="Traži na Cinestaru"
            onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.props.callFunc(event.target.value,'searchText')
                }
              }}
          />
          <i className="fa fa-search"
          onClick={()=> this.props.callFunc(document.querySelector('.input').value,'searchText')}></i>
        </div>
      </div>
    );
  }
}
