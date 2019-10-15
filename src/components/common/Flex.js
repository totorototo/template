import { flexbox } from "styled-system";
import styled from "styled-components";

import Box from "./Box";
import themed from "./helpers";

const Flex = styled(Box)(
  {
    display: "flex"
  },
  flexbox,
  themed("Flex")
);

export default Flex;
