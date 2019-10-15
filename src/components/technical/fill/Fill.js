import React, { Component } from "react";
import PropTypes from "prop-types";

import { Context } from "../slotProvider/SlotProvider";

export default class Fill extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  };

  setFillForSlot = context => {
    const { name, children } = this.props;
    context.setFillForSlot(name, () => children);
    return false;
  };

  render() {
    return <Context.Consumer>{this.setFillForSlot}</Context.Consumer>;
  }
}
