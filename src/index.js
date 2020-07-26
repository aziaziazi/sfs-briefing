import React from "react";
import { render } from "react-dom";
import Canvas from './components/Canvas';
import PartsListModel, {PartsListProvider} from './models/PartsListModel';
import Code from "./components/Code";

const store = new PartsListModel();

render(
  <div>
    <PartsListProvider partListStore={store}>
      <Code />
      <Canvas/>
    </PartsListProvider>
  </div>,
  document.getElementById("root")
);

store.addProbe();

// playing around in the console
window.store = store;
