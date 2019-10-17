import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import { withEffects } from "refract-callbag";
import fromPromise from "callbag-from-promise";
import { filter, map, merge, combine, pipe, flatten } from "callbag-basics";

import { App } from "./components";
import { theme } from "./theme/theme";
import { actionCreators, actionTypes, selectors } from "./store";
import store from "./setupStore";

const GlobalStyle = createGlobalStyle`
  body {    
    font-family: "gilbert";
    font-size:2em;
    margin: 0px;
  }
`;

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
    map(([ { payload: name } ]) => {
      debugger;
      return api.getBranch(name);
    }),
    flatten.default,
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

  return merge(requestBranch$, selectBranch$);
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

const LayoutWithEffects = withEffects(aperture, { handler })(App);

const Application = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LayoutWithEffects store={store} api={apiDependency} />
        <GlobalStyle />
      </ThemeProvider>
    </Provider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<Application />, rootElement);
