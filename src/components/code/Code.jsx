import React, {Fragment, useRef, useState} from "react";
import {observer} from "mobx-react";
import styled, {css} from "styled-components";
import {useCanvas} from "../../stores";
import {useWindowSize} from "../../helpers/useWindowSize";

const BlueprintArea = styled.textarea`
  flex-shrink: 0;
  flex-basis: calc(${p => p.height}px / 3);
  box-sizing: border-box;
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

export const buttonStyle = css`
  padding: 0.4rem;
  font-size: 0.6rem;
  font-weight: bold;
  cursor: pointer;
  border: none;
`;

const ErrorButton = styled.button`
  ${buttonStyle};
  background-color: #ef233c;
`;

export const Code = observer(({textAreaRef}) => {
  const canvasStore = useCanvas();
  const {height} = useWindowSize();
  const [invalidEdition, setInvalidEdition] = useState(null);

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
        {invalidEdition && <ErrorButton onClick={() => setInvalidEdition(null)}>back to valid</ErrorButton>}
      </ResetWrapper>
    </Fragment>
  )
});
