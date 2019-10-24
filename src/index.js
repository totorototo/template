import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import { withEffects } from "refract-callbag";
import fromPromise from "callbag-from-promise";
import { map, pipe, fromEvent, flatten, combine } from "callbag-basics";
import CbOf from "callbag-of";
import interval from "callbag-interval";
import startWith from "callbag-start-with";
import dropRepeats from "callbag-drop-repeats";
import trace from "callbag-trace";

import { App } from "./components";
import { theme } from "./theme/theme";
import { location } from "./helpers/location";
import store from "./setupStore";
import { actionCreators, actionTypes } from "./store";

const GlobalStyle = createGlobalStyle`
  body {    
    font-family: "roboto";
    font-size:2em;
    margin: 0px;
  }
`;

const apiDependency = {
  getCurrentlocation: settings => fromPromise(location(settings))
};

const isVisible = () => document.visibilityState === "visible";

const aperture = (component, { store, api }) => {
  const trackLocation$ = store.observe(actionTypes.LOCATION_REQUEST);

  const visible$ = pipe(
    fromEvent.default(document, "visibilitychange"),
    map(isVisible),
    startWith(isVisible())
  );

  const track$ = pipe(
    combine(visible$, trackLocation$),
    trace(console.log),
    map(([ visible, tracked ]) => visible && tracked.payload),
    dropRepeats(),
    trace(console.log),
    map(
      visibleAndTracked =>
        visibleAndTracked
          ? pipe(
              interval(1000),
              map(() => api.getCurrentlocation()),
              flatten.default,
              map(({ coords }) => coords),
              map(({ longitude, latitude }) =>
                actionCreators.receiveLocation({ longitude, latitude })
              )
            )
          : CbOf({ type: "Oops" })
    ),
    flatten.default
  );

  return track$;
};

const handler = ({ store }) => effect => {
  switch (effect.type) {
    case actionTypes.LOCATION_RECEIVE:
      return store.dispatch(effect);
    default:
      return;
  }
};

const errorHandler = () => err => console.error(err);

const LayoutWithEffects = withEffects(aperture, { handler, errorHandler })(App);

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
