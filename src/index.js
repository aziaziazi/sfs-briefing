import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";
import PartsList from './components/PartsList';
import PartsListModel from './models/PartsListModel';

const store = new PartsListModel();

render(
  <div>
    <DevTools />
    {<PartsList store={store} />}
  </div>,
  document.getElementById("root")
);

store.addProbe();
store.addProbe();
store.addProbe();

// playing around in the console
window.store = store;
