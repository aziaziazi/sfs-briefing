import React from "react";
import { render } from "react-dom";
import {Canvas} from './components/canvas/Canvas';
import CanvasModel from './models/CanvasModel';
import {Code} from "./components/code/Code";
import {store, StoreProvider} from "./stores";
import PartListModel from "./models/PartListModel";
import {PartList} from "./components/partList/PartList";

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