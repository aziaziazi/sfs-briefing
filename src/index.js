import React, {useState} from "react";
import { render } from "react-dom";
import styled, {createGlobalStyle, css} from "styled-components";
import {Canvas} from './components/canvas/Canvas';
import {buttonStyle, Code} from "./components/code/Code";
import {store, StoreProvider} from "./stores";
import {PartList} from "./components/partList/PartList";
import {Info} from "./components/Info";

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
    font-family: monospace;
    font-weight: lighter;
  }
`;

const InfoButton = styled.button`
  ${buttonStyle};
  align-self: flex-start;
  background-color: #edf2f4;
  color: #2b2d42;
  border: none;
`

const App = () => {
  const [infoIsOpen, setInfoIsOpen] = useState(true);

  return (
    <div>
      <StoreProvider store={store}>
        <GlobalStyle />
        <Wrapper>
          <Code />
          <Canvas />
          <InfoButton onClick={() => setInfoIsOpen(true)}>info</InfoButton>
          <PartList />
          {infoIsOpen && <Info close={() => setInfoIsOpen(false)}/>}
        </Wrapper>
      </StoreProvider>
    </div>
  )
}

render(
  <App />,
  document.getElementById("root")
);