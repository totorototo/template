import React from "react";

import { Flex } from "../../index";

const Sidebar = ({ children, ...rest }) => (
  <Flex
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
    bg="white"
    {...rest}
  >
    {children}
  </Flex>
);

export default Sidebar;
