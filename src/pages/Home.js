import React from "react";
import ImageContainer from "../components/ImageContainer";
import FilterSection from "../components/FilterSection";
import CinestarName from "../components/CinestarName";
import BoxZanrTime from "../components/BoxZanrTime";
import DisplayZanrTime from "../components/DisplayZanrTime";
import DisplayData from "../components/DisplayData";
import { Component } from "react";
import Client from "../Contentful"

class Home extends Component {
  constructor() {
    super();
    this.state = {
      data:[],
      selectedCity: "Najave filmova",
      visibleBoxZanrTime: false,
      visibleDisplayZanrTime: false,
      //  this two array are data to display in the boxes inside the DOM
      arrayZanr: [
        "Akcija",
        "Dokumentarni",
        "Drama",
        "Komedija",
        "Horor",
        "Kriminalistički",
        "Ratni",
        "Sf",
      ],
      arrayTime: [
        "Ponedjeljak",
        "Utorak",
        "Srijeda",
        "Četvrtak",
        "Petak",
        "Subota",
        "Nedjelja",
      ],
      displayArray: [],
      //  datas are what is display on the screen
      datas:[],
      reservation: false,
      selectedZanrTime: "",
    };
    this.getData();
  }

  async getData(){
  try {
      Client.getEntries({ content_type: "cinestar" }).then((response) =>
      this.setState({data:this.formatData(response.items)})
  ).then((()=>{
    this.setIncoming()
  }))
  } catch (error) {
    console.log(error);
  }
  }

  formatData(items){
    let arrayData=[];
    items.map((item)=>{
      arrayData.push(item.fields);
    })
    return arrayData;
  }

  setIncoming(){
    this.setState({
      datas: this.state.data.filter((item) => {
        if (item.incoming) {
          return item.incoming;
          }
        }),
    })
  }
  //  this function change the data inside constuctor above
  //  this function is called when user click on the select tag and write name of the city into DOM
  //  params event -> object
  //  return -> nothing
  setParameter(selectedParam,searchText) {
    let filterSelectedCity=[];
    if (searchText==undefined) {
      this.state.data.filter((item)=>{
      //  OSIJEK IS FOR TESTING
      if (item.price[selectedParam]!==undefined) {
        filterSelectedCity.push(item)
      }
      this.setState({
        selectedCity: selectedParam,
        visibleBoxZanrTime: true,
        visibleDisplayZanrTime: false,
        reservation: true,
        datas: filterSelectedCity,
      });
    })
    } else if(searchText!==undefined){
      for (let movie of Object.values(this.state.data)){
        
        let lowName = movie.name.toLowerCase()
        let lowEngName = movie.engName.toLowerCase()
        let lowSearch = selectedParam.toLowerCase()

        if (lowName.includes(lowSearch) || lowEngName.includes(lowSearch)) {
          filterSelectedCity.push(movie)
        }
         this.setState({
            selectedCity: 'Tražilica',
            visibleBoxZanrTime: false,
            visibleDisplayZanrTime: false,
            reservation: true,
            datas: filterSelectedCity,
            selectedZanrTime:selectedParam,
          });
      }
    }
  }

  setSelectedBox(event) {
    let filterZanrTime;
    //  independently what user click it gets display days or zanr
    if (event.target.id === "Odabir prema žanru") {
      filterZanrTime = this.state.arrayZanr;
    } else if (event.target.id === "Odabir prema vremenu prikazivanja") {
      filterZanrTime = this.state.arrayTime;
    }
    //  this filterZanrTime is array from constructor function
    this.setState({
      visibleDisplayZanrTime: true,
      displayArray: filterZanrTime,
    });
  }

  setSelectedZanr(event) {
    this.setState({
      selectedZanrTime: event.target.id,
      datas: this.state.data.filter((item) => {
        for (let arrayItem in item.genre) {
          if (item.genre[arrayItem] === event.target.id & item.price[this.state.selectedCity]!==undefined) {
            return item;
          } else if (item.time[arrayItem] === event.target.id & item.price[this.state.selectedCity]!==undefined) {
            return item;
          }
        }
      }),
    });
  }

  render() {
    return (
      <div className="main-container">
        <ImageContainer />
        <FilterSection callFunc={this.setParameter.bind(this)} />
        <CinestarName selectedCity={this.state.selectedCity} />
        {this.state.visibleBoxZanrTime ? (
          <BoxZanrTime callFunc={this.setSelectedBox.bind(this)} />
        ) : null}
        {this.state.visibleDisplayZanrTime ? (
          <DisplayZanrTime
          //  depending what is clicked in this component it pass parameter into function setSelectedZanr
            callFunc={this.setSelectedZanr.bind(this)}
            displayArray={this.state.displayArray}
          />
        ) : null}
        <DisplayData
          datas={this.state.datas}
          reservation={this.state.reservation}
          selectedZanrTime={this.state.selectedZanrTime}
          selectedCity={this.state.selectedCity}
        />
      </div>
    );
  }
}

export default Home;
