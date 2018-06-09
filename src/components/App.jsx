import React, { Component } from "react";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="John Wick is cool" />
        </div>
        <Order />
        <Inventory />
      </div>
    );
  }
}

export default App;
