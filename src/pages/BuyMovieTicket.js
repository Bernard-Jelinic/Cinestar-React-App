import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';

export default class BuyMovieTicket extends Component {

  constructor(props) {
    super(props);
    this.selectedMovieName = props.match.params.name;
    this.selectedCity = props.match.params.city;    
    this.data = JSON.parse(localStorage.getItem("buyTicket"));
    this.state={
      selectedDay:undefined,
      typeOfTicket:undefined,
      numberOfTicket:0,
      priceOfOneTicket:0,
      sumOfTicketPrice:0,
      displayBuyBtn:false,
    }
  }

  checkSelectedCity(){
    if (this.selectedCity==='Tražilica') {
      //  in the case that the user search through the seach box this.selecedCity=Tražilica and it there is no a key with that name
      let arrayOfCities = Object.keys(this.data.price);
        return(<select
          id="select-city"
          onChange={(event) => this.selectedCity=event.target.value}
          onClick={()=>{this.displayPriceOfOneTicket()}}
        >
          <option defaultValue hidden>
            Odaberi kino
          </option>
          {arrayOfCities.map((item, index) => {
            return <option key={index}>{item}</option>;
          })}
        </select>)

    } else {
      return this.selectedCity
    }
  }

  setSelectedDay(clickedDay){
    //  setState work a lil bit and that is the reason to call this.displayPriceOfOneTicket on the end of that process
    this.setState({selectedDay:clickedDay},()=>{this.displayPriceOfOneTicket();})
  }

  setTypeOfTicket(selectedValue){
    this.setState({typeOfTicket:selectedValue},()=>{this.displayPriceOfOneTicket();})
  }

  displayPriceOfOneTicket(){
    if (this.state.selectedDay !== undefined && this.state.typeOfTicket !== undefined && this.selectedCity!=='Tražilica') {
      this.setState({
        priceOfOneTicket:this.data.price[this.selectedCity][this.state.typeOfTicket],
        numberOfTicket:1,
      },()=>this.displaySumOfTicketPrice())
    }
  }

  displaySumOfTicketPrice(){
    this.setState({sumOfTicketPrice:this.state.priceOfOneTicket*this.state.numberOfTicket},()=>{
      this.setState({displayBuyBtn:true})
    })
  }

  addSubtract(operation){
    if(this.state.selectedDay===undefined || this.state.typeOfTicket===undefined || this.selectedCity==='Tražilica'){
      if (this.selectedCity==='Tražilica') {
        this.displayWarning("[Prvo odaberite grad, dan i vrstu ulaznice]");
      } else {
        this.displayWarning("[Prvo odaberite dan i vrstu ulaznice]");
      }
    } else if(this.state.selectedDay !== undefined && this.state.typeOfTicket !== undefined && this.selectedCity!=='Tražilica'){
      if (operation==='add' && this.state.numberOfTicket<5) {
        this.setState({numberOfTicket: ++this.state.numberOfTicket},()=>this.displaySumOfTicketPrice())
        document.querySelector("#warning").innerText = "";

      } else if(operation==='subtract' && this.state.numberOfTicket>1){
        this.setState({numberOfTicket: --this.state.numberOfTicket},()=>this.displaySumOfTicketPrice())
        document.querySelector("#warning").innerText = "";

      } else if(operation==='add' && this.state.numberOfTicket===5){
        this.displayWarning("[Ne možete kupiti više od 5 ulaznica]");

      } else if(operation==='subtract' && this.state.numberOfTicket===1){
        this.displayWarning("[Ne možete kupiti manje od 1 ulaznice]");

      }
    }
  }

  displayWarning(textDisplay){
    document.querySelector("#warning").innerText = textDisplay
    setTimeout(() => {
        try {
          document.querySelector("#warning").innerText = "";
        } catch (error) {
          //console.log(error);
        }
      }, 3000);
    }

  showAlert(){
    if (this.state.displayBuyBtn===true) {
      //  in the case that the user first clicked on the "kupi" button and than fast select data
      document.querySelector("#buy-warning").innerText = ''
      let txtKarta;
    if (this.state.numberOfTicket===1) {
      txtKarta = 'kartu'
    } else if(this.state.numberOfTicket>1 && this.state.numberOfTicket<5){
      txtKarta = 'karte'
    } else if(this.state.numberOfTicket===5){
      txtKarta = 'karti'
    }

    swal("Kupljeno!", `Uspješno ste kupili ${this.state.numberOfTicket} ${txtKarta} za film ${this.selectedMovieName}
          za sjedalo ${this.state.typeOfTicket} po cijeni od ${this.state.sumOfTicketPrice} kn!`, "success").then(()=>{
          this.props.history.push('/');
          });
    } else{
      document.querySelector("#buy-warning").innerText = '[Niste odabrali ništa za kupnju]'
        setTimeout(() => {
          try {
            document.querySelector("#buy-warning").innerText = "";
          } catch (error) {
            //console.log(error);
          }
      }, 3000);
    }
  }

  render() {
    //  check if the URL parameter contain not extist movie
    if (this.selectedMovieName===this.data.name) {
      let arrayActors = this.data.actors;
      let arrayGenre = this.data.genre;

      let joinArrayActors = arrayActors.join(", ");
      let joinArrayGenre = arrayGenre.join(", ");
    return (
      <div className="display-data">
        <div className="single-data">
            <img className="data-image" src={this.data.image.fields.file.url} alt="picture of movie"/>
            <div className="movie-desc">
              <h2>{this.data.name}</h2>
                <p><span>Izvorno ime: </span>{this.data.engName}</p>
                <p><span>Sadržaj filma: </span>{this.data.desc}</p>
                <p><span>Redatelj: </span>{this.data.director}</p>
                <p><span>Glumci: </span>{joinArrayActors}</p>
                <p><span>Žanr: </span>{joinArrayGenre}</p>
                <p><span>Trajanje: </span>{this.data.duration} min</p>
                <p><span>Država: </span>{this.data.state}</p>
            </div>
        </div>
        <div className="buying-details">
          <p><span>Grad: </span>{this.checkSelectedCity()}</p>
          <div className="day-select">
            <span>Odaberi dan:</span>
            <select onChange={(event)=>{this.setSelectedDay(event.target.value)}}>
            <option defaultValue hidden>
              Odaberi dan
            </option>
            {this.data.time.map((day,index)=>{
              return <option key={index}>{day}</option>
            })}
            </select>
          </div>
          <div className="ticket-type">
            <span>Vrsta ulaznice:</span>
            <select onChange={(event) => {this.setTypeOfTicket(event.target.value)}}>
              <option defaultValue hidden>
              Odaberi vrstu ulaznice
              </option>
              <option>4DX</option>
              <option>REALD 3D</option>
              <option>pretpremijera</option>
            </select>
          </div>
       
          <div className="ticket-number">
            <span>Broj ulaznica:</span>
            <button onClick={()=>{this.addSubtract('subtract')}}>-</button>
              <a>{this.state.numberOfTicket}</a>
            <button onClick={()=>{this.addSubtract('add')}}>+</button>
            <a id="warning"></a>
          </div>
          <div className="end-details">
            <p>Cijena jedne ulaznice: <span>{this.state.priceOfOneTicket} kn</span></p>
            <p>Ukupno: <span>{this.state.sumOfTicketPrice} kn</span></p>
            <button onClick={()=>{this.showAlert()}}>Kupi kartu</button>
            <a id="buy-warning"></a>
          </div>
        </div>
      </div>
    );
    }else{
      return(
        <Link to="/" className="error">
          <h1>404</h1>
          <div></div>
          <p>Page Not Found</p>
          Povratak na početak
        </Link>
      )
    }   
  }
}
