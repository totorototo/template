import React, { Component } from "react";
import PropTypes from "prop-types";

import { Context } from "../slotProvider/SlotProvider";

export default class Slot extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  };

  componentDidMount() {
    this.forceUpdate();
  }

  getFillForSlot = context => {
    const { name } = this.props;
    const render = context.getFillForSlot(name);

    if (render) {
      return render();
    }

    return false;
  };

  render() {
    return <Context.Consumer>{this.getFillForSlot}</Context.Consumer>;
  }
}
