import React, {useRef, useState} from "react";
import {render} from "react-dom";
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

const MenuButton = styled.button`
  ${buttonStyle};
  background-color: #edf2f4;
  color: #2b2d42;
  border: none;
  margin: 0.4rem 0 0;
`;

const Menu = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const BottomThird = styled.div`
  overflow: auto;
  padding-top: 1.2rem;
`;

const App = () => {
  const [infoIsOpen, setInfoIsOpen] = useState(true);
  const [copied, updateCopied] = useState(false);
  const textAreaRef = useRef(null);

  const handleCopy = () => {
    textAreaRef.current.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    updateCopied(true);
    setTimeout(() => updateCopied(false), 500);
  };
  return (
    <div>
      <StoreProvider store={store}>
        <GlobalStyle/>
        <Wrapper>
          <Code textAreaRef={textAreaRef}/>
          <Canvas/>
          <BottomThird>
            <Menu>
              <MenuButton onClick={handleCopy}>{copied ? 'copied' : 'copy blueprint'}</MenuButton>
              <MenuButton onClick={() => setInfoIsOpen(true)}>info</MenuButton>
            </Menu>
            <PartList/>
          </BottomThird>
          {infoIsOpen && <Info close={() => setInfoIsOpen(false)}/>}
        </Wrapper>
      </StoreProvider>
    </div>
  )
}

render(
  <App/>,
  document.getElementById("root")
);