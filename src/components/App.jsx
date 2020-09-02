import React, {useRef, useState} from "react";
import styled, {createGlobalStyle} from "styled-components";
import {Canvas} from './canvas/Canvas';
import {buttonStyle, Code} from "./code/Code";
import {store, StoreProvider} from "../stores";
import {PartList} from "./partList/PartList";
import {Info} from "./Info";

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

export const App = () => {
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