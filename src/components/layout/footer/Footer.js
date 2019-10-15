import React from "react";

import { Flex } from "../../index";

const Footer = ({ children, ...rest }) => (
  <Flex
    alignItems="flex-end"
    justifyContent="center"
    flexDirection="column"
    bg="white"
    {...rest}
  >
    {children}
  </Flex>
);

export default Footer;
