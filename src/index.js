import React from "react";
import {render} from "react-dom";
import ReactGA from 'react-ga';
import {App} from "./components/App";

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-177054355-1');
  ReactGA.pageview(window.location.pathname + window.location.search);
}

render(
  <App/>,
  document.getElementById("root")
);
