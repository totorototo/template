import React from "react";

import { Flex } from "../../index";

const Aside = ({ children, ...rest }) => (
  <Flex
    flexDirection="row"
    alignItems="flex-start"
    justifyContent="center"
    bg="yellow"
    {...rest}
  >
    {children}
  </Flex>
);

export default Aside;
