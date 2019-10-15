import React, { Component } from "react";

export const Context = React.createContext(null);

export default class Provider extends Component {
  state = {
    slots: new Map(),
    // eslint-disable-next-line react/no-unused-state
    getFillForSlot: name => this.getFillForSlot(name),
    // eslint-disable-next-line react/no-unused-state
    setFillForSlot: (name, callback) => this.setFillForSlot(name, callback)
  };

  // eslint-disable-next-line
  getFillForSlot = name => this.state.slots.get(name);

  // eslint-disable-next-line
  setFillForSlot = (name, callback) => this.state.slots.set(name, callback);

  render() {
    const { children } = this.props;
    return <Context.Provider value={this.state}>{children}</Context.Provider>;
  }
}
