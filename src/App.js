import React from "react";
import "./Style.scss";
import { Component } from "react";
import Home from "./pages/Home";
import BuyMovieTicket from "./pages/BuyMovieTicket.js";
import Error from "./pages/Error";
import CopyrightFooter from "./components/CopyrightFooter";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/buymovieticket/:city/:name"
            component={BuyMovieTicket}
          />
          <Route component={Error} />
        </Switch>
        <CopyrightFooter />
      </>
    );
  }
}

export default App;