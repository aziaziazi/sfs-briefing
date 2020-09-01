import React from "react";
import { render } from "react-dom";
import styled, {createGlobalStyle} from "styled-components";
import {Canvas} from './components/canvas/Canvas';
import {Code} from "./components/code/Code";
import {store, StoreProvider} from "./stores";
import {PartList} from "./components/partList/PartList";
import {parts} from "./models/PartModel";

store.canvas.addPart(parts.Probe.bluePrint);

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  overflow: hidden;
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #2b2d42;
  }
  
  * > * {
    color: #edf2f4;
  }
`;

render(
  <div>
    <StoreProvider store={store}>
      <GlobalStyle />
      <Wrapper>
        <Code />
        <Canvas />
        <PartList />
      </Wrapper>
    </StoreProvider>
  </div>,
  document.getElementById("root")
);