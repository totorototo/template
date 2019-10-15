import React from "react";
import ReactDOM from "react-dom";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import { withEffects } from "refract-callbag";
import fromPromise from "callbag-from-promise";
import { filter, flatten, map, merge, combine, pipe } from "callbag-basics";

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
import { actionCreators, actionTypes, selectors } from "./store";
import store from "./setupStore";

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

const apiDependency = {
  getBranch: name =>
    fromPromise(
      fetch(`https://api.github.com/users/${name}`)
        .then(response => response.json())
        .catch(error => ({ error }))
    )
};

const aperture = (component, { store, api }) => {
  const combined$ = combine(
    store.observe(actionTypes.BRANCH_REQUEST),
    store.observe(selectors.getBranches)
  );

  const requestBranch$ = pipe(
    combined$,
    filter(([ request, branches ]) => !Boolean(branches[request.payload])),
    map(([ { payload: name } ]) => api.getBranch(name)),
    // flatten,
    map(
      ({ message, ...response }) =>
        Boolean(message)
          ? actionCreators.receiveError(message)
          : actionCreators.receiveBranch(response)
    )
  );

  const selectBranch$ = pipe(
    combined$,
    filter(([ request, branches ]) => Boolean(branches[request.payload])),
    map(([ { payload } ]) => payload),
    map(actionCreators.selectBranch)
  );

  return merge(selectBranch$);
};

const handler = ({ store }) => effect => {
  switch (effect.type) {
    case actionTypes.ERROR_RECEIVE:
      return console.log(effect);

    case actionTypes.BRANCH_RECEIVE:
      return store.dispatch(effect);

    case actionTypes.BRANCH_SELECT:
      return store.dispatch(effect);

    default:
      return;
  }
};

const Layout = () => (
  <Chrome
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
      <Sidebar alignItems={[ "flex-end", "center" ]} bg="blue" gridArea={area}>
        <Box mr={[ 4, 0 ]}>sd</Box>
      </Sidebar>
    )}
    main={area => (
      <Main bg="brown" gridArea={area}>
        {items.map(item => <Box>{item}</Box>)}
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

const EnhancedLayout = withEffects(aperture, { handler })(Layout);

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <EnhancedLayout store={store} api={apiDependency} />
        <GlobalStyle />
      </ThemeProvider>
    </Provider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
