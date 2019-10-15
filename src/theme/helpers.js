import { css } from "styled-components";

// TODO: use breakpoints defined in theme
const breakpoints = {
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em"
};

export const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${breakpoints[label]}) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});
