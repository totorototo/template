import { grid } from "styled-system";
import styled from "styled-components";

import Box from "./Box";
import themed from "./helpers";

const Grid = styled(Box)({ display: "grid" }, grid, themed("Grid"));

export default Grid;
