import { Component } from "react";

class StateContainer extends Component {
  state = { tracklocation: false, coords: {} };
  setState = this.setState.bind(this);

  render() {
    const { tracklocation, coords } = this.state;
    const { setState } = this;

    return this.props.children({
      tracklocation,
      setState,
      coords
    });
  }
}

export default StateContainer;
