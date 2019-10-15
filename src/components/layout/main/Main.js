import React from "react";

import { Flex } from "../../index";

const Main = props => (
  <Flex
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    bg="white"
    {...props}
  />
);

export default Main;
