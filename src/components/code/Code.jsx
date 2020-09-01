import React, {Fragment, useRef, useState} from "react";
import {observer} from "mobx-react";
import styled from "styled-components";
import {useCanvas} from "../../stores";
import {useWindowSize} from "../../helpers/useWindowSize";

const BlueprintArea = styled.textarea`
  flex-shrink: 0;
  flex-basis: calc(${p => p.height}px / 3);
  box-sizing: border-box;
  font-family: monospace;
  font-weight: lighter;
  font-size: 0.8rem;
  outline: none;
  border: 2px dashed ${p => p.isInvalid ? '#ef233c' : 'transparent'};
  background-color: transparent;
  resize: none;
`;

const ResetWrapper = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ErrorButton = styled.button`
  background-color: #ef233c;
  border: none;
  cursor: pointer;
`;

const CopyButton = styled.button`
  border: none;
  background-color: #edf2f4;
  color: #2b2d42;
  cursor: pointer;
`;

export const Code = observer(() => {
  const canvasStore = useCanvas();
  const {height} = useWindowSize();
  const textAreaRef = useRef(null);
  const [invalidEdition, setInvalidEdition] = useState(null);
  const [copied, updateCopied] = useState(false);


  const handleEdit = e => {
    const value = e.target.value;

    try {
      const parsed = JSON.parse(value.replace(/'/g, '"'));
      canvasStore.updateBlueprint(parsed);

      if (invalidEdition) setInvalidEdition(null);
    } catch (err) {
      setInvalidEdition(value)
    }
  };

  const handleCopy = () => {
    textAreaRef.current.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    updateCopied(true)
    setTimeout(() => updateCopied(false), 500)
  };

  return (
    <Fragment>
      <BlueprintArea
        onChange={handleEdit}
        value={invalidEdition || canvasStore.bluePrint}
        isInvalid={invalidEdition}
        height={height}
        ref={textAreaRef}
      />
      <ResetWrapper>
        {invalidEdition
          ? <ErrorButton onClick={() => setInvalidEdition(null)}>back to valid</ErrorButton>
          : <CopyButton onClick={handleCopy}>{copied ? 'copied' : 'copy blueprint'}</CopyButton>
        }
      </ResetWrapper>
    </Fragment>
  )
});
