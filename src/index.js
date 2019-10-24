import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { withEffects } from "refract-callbag";
import fromPromise from "callbag-from-promise";
import { map, pipe, fromEvent, flatten, combine } from "callbag-basics";
import CbOf from "callbag-of";
import interval from "callbag-interval";
import startWith from "callbag-start-with";
import dropRepeats from "callbag-drop-repeats";

import { App } from "./components";
import { theme } from "./theme/theme";
import { location } from "./helpers/location";
import StateContainer from "./StateContainer";

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

const toState = payload => ({ type: "SET_STATE", payload });
const isVisible = () => document.visibilityState === "visible";

const aperture = (component, { api }) => {
  const tracklocation$ = component.observe("tracklocation");

  const visible$ = pipe(
    fromEvent.default(document, "visibilitychange"),
    map(isVisible),
    startWith(isVisible())
  );

  const track$ = pipe(
    combine(visible$, tracklocation$),
    map(([ visible, tracked ]) => visible && tracked),
    dropRepeats(),
    map(
      visibleAndTracked =>
        visibleAndTracked
          ? pipe(
              interval(1000),
              map(() => api.getCurrentlocation()),
              flatten.default,
              map(({ coords }) => ({ coords })),
              map(toState)
            )
          : CbOf({ type: "Oops" })
    ),
    flatten.default
  );

  return track$;
};

const handler = ({ setState }) => effect => {
  switch (effect.type) {
    case "SET_STATE":
      return setState(effect.payload);
    default:
      return;
  }
};

const errorHandler = () => err => console.error(err);

const LayoutWithEffects = withEffects(aperture, { handler, errorHandler })(App);

const Application = () => {
  return (
    <ThemeProvider theme={theme}>
      <StateContainer>
        {state => <LayoutWithEffects {...state} api={apiDependency} />}
      </StateContainer>
      <GlobalStyle />
    </ThemeProvider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<Application />, rootElement);
