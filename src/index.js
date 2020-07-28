import React from "react";
import { render } from "react-dom";
import {Canvas} from './components/Canvas';
import CanvasModel from './models/CanvasModel';
import {Code} from "./components/Code";
import {StoreProvider} from "./stores";
import PartListModel from "./models/PartListModel";
import {PartList} from "./components/PartList";

const store = {
  canvas: new CanvasModel(),
  partList: new PartListModel() // new PartListModel()
};

store.canvas.addDefaultProbe();

render(
  <div>
    <StoreProvider store={store}>
      <Code />
      <Canvas />
      <PartList />
    </StoreProvider>
  </div>,
  document.getElementById("root")
);