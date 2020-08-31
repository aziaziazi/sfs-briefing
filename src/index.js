import React from "react";
import { render } from "react-dom";
import styled from "styled-components";
import {Canvas} from './components/canvas/Canvas';
import {Code} from "./components/code/Code";
import {store, StoreProvider} from "./stores";
import {PartList} from "./components/partList/PartList";
import {parts} from "./models/PartModel";

store.canvas.addPart(parts.Probe.bluePrint);

const Wrapper = styled.div`
  display: flex;
`;

render(
  <div>
    <StoreProvider store={store}>
      <Wrapper>
        <Code />
        <Canvas />
        <PartList />
      </Wrapper>
    </StoreProvider>
  </div>,
  document.getElementById("root")
);