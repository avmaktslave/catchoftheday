import React, { Component } from "react";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // Take a copy of existing state
    const fishes = { ...this.state.fishes };
    // Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // Set tha vew fishes object to state
    this.setState({ fishes });
  };

  updateFish = (key, updateFish) => {
    // Take a copy of existing state
    const fishes = { ...this.state.fishes };
    // Update that state
    fishes[key] = updateFish;
    //Set that to state
    this.setState({ fishes });
  };

  deleteFish = key => {
    // Take a copy of existing state
    const fishes = { ...this.state.fishes };
    // Update that state
    fishes[key] = null;
    //Set that to state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    // Take a copy of existing state
    const order = { ...this.state.order };
    // Either add to the order , or update the number in our order
    order[key] = order[key] + 1 || 1;
    // Call setState to update our state object
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="John Wick is cool" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
