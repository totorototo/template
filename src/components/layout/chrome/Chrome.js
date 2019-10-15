import React from "react";
import PropTypes from "prop-types";

import { template } from "./template";
import { Grid, Flex } from "../../index";

const Chrome = ({
  header,
  footer,
  main,
  sidebar,
  aside,
  template,
  ...rest
}) => {
  return (
    <Grid
      {...rest}
      gridTemplateColumns={[
        template.sm.columns,
        template.md.columns,
        template.lg.columns,
        template.xl.columns
      ]}
      gridTemplateRows={[
        template.sm.rows,
        template.md.rows,
        template.lg.rows,
        template.xl.rows
      ]}
      gridTemplateAreas={[
        template.sm.area,
        template.md.area,
        template.lg.area,
        template.xl.area
      ]}
    >
      {header("header")}
      {main("main")}
      {footer("footer")}
      {sidebar("sidebar")}
      {aside("aside")}
    </Grid>
  );
};

Chrome.propTypes = {
  template: PropTypes.shape({
    mobile: PropTypes.shape({
      row: PropTypes.string,
      columns: PropTypes.string,
      area: PropTypes.string
    }),
    tablet: PropTypes.shape({
      row: PropTypes.string,
      columns: PropTypes.string,
      area: PropTypes.string
    }),
    desktop: PropTypes.shape({
      row: PropTypes.string,
      columns: PropTypes.string,
      area: PropTypes.string
    })
  }),
  header: PropTypes.func,
  main: PropTypes.func,
  footer: PropTypes.func,
  sidebar: PropTypes.func,
  aside: PropTypes.func
};

Chrome.defaultProps = {
  template,
  header: () => <Flex gridArea="header" />,
  main: () => <Flex gridArea="main" />,
  sidebar: () => <Flex gridArea="sidebar" />,
  footer: () => <Flex gridArea="footer" />,
  aside: () => <Flex gridArea="aside" />
};

export default Chrome;
