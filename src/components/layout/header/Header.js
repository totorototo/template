import React from "react";

import { Flex } from "../../index";

const Header = ({ children, ...rest }) => (
  <Flex
    width={[1]}
    flexDirection="row"
    alignItems="center"
    justifyContent="flex-end"
    bg="white"
    {...rest}
  >
    {children}
  </Flex>
);

export default Header;
