import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import { actionCreators } from "../../../store";
import {
  Box,
  Flex,
  Chrome,
  Header,
  Footer,
  Main,
  Sidebar,
  Aside
} from "../../index";
import { media } from "../../../theme/helpers";
import { template } from "../../layout/chrome/template";

const items = Array.from(Array(50), (x, index) => index + 1);

const StyledAside = styled(Aside)`
  ${media.xl`display:flex;`};
  ${media.lg`display:flex;`};
  ${media.md`display:none;`};
  ${media.sm`display:none;`};
`;

const App = ({ tracklocation, setState, ...rest }) => {
  return (
    <Chrome
      {...rest}
      overflowX="scroll"
      height="100vh"
      width={[ 1 ]}
      template={template}
      header={area => (
        <Header height={56} position="fixed" bg="pink" gridArea={area}>
          <Box mr={4}>header</Box>
        </Header>
      )}
      footer={area => (
        <Footer bg="green" gridArea={area}>
          <Box mr={4}>footer</Box>
        </Footer>
      )}
      sidebar={area => (
        <Sidebar
          alignItems={[ "flex-end", "center" ]}
          bg="blue"
          gridArea={area}
        >
          <Box mr={[ 4, 0 ]}>sd</Box>
        </Sidebar>
      )}
      main={area => (
        <Main bg="brown" gridArea={area}>
          <button
            onClick={() => {
              setState({ tracklocation: !tracklocation });
            }}
          >
            toto
          </button>
        </Main>
      )}
      aside={area => (
        <StyledAside bg="yellow" gridArea={area}>
          <Flex
            width={1}
            bg="orange"
            alignItems="flex-start"
            justifyContent="flex-start"
            flexDirection="column"
          >
            <Box>toto</Box>
            <Box>titi</Box>
          </Flex>
        </StyledAside>
      )}
    />
  );
};

export default App;
