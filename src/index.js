import React from "react";
import { render } from "react-dom";
import {Canvas} from './components/canvas/Canvas';
import {Code} from "./components/code/Code";
import {store, StoreProvider} from "./stores";
import {PartList} from "./components/partList/PartList";
import {parts} from "./models/parts/ProbeModel";

store.canvas.addPart(parts.Probe);

render(
  <div>
    <StoreProvider store={store}>
      <div style={{display: 'flex'}}>
        <Code />
        <Canvas />
        <PartList />
      </div>
    </StoreProvider>
  </div>,
  document.getElementById("root")
);