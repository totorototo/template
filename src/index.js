import React from "react";
import ReactDOM from "react-dom";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

import {
  Box,
  Flex,
  Chrome,
  Header,
  Footer,
  Main,
  Sidebar,
  Aside
} from "./components";
import { theme } from "./theme/theme";
import { template } from "./components/layout/chrome/template";
import { media } from "./theme/helpers";

const GlobalStyle = createGlobalStyle`
  body {    
    font-family: "gilbert";
    font-size:2em;
    margin: 0px;
  }
`;

const StyledAside = styled(Aside)`
  ${media.xl`display:flex;`};
  ${media.lg`display:flex;`};
  ${media.md`display:none;`};
  ${media.sm`display:none;`};
`;

const items = Array.from(Array(50), (x, index) => index + 1);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Chrome
          overflowX="scroll"
          height="100vh"
          width={[1]}
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
              alignItems={["flex-end", "center"]}
              bg="blue"
              gridArea={area}
            >
              <Box mr={[4, 0]}>sd</Box>
            </Sidebar>
          )}
          main={area => (
            <Main bg="brown" gridArea={area}>
              {items.map(item => (
                <Box>{item}</Box>
              ))}
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

        <GlobalStyle />
      </>
    </ThemeProvider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
