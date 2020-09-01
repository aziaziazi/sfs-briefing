import React, {Fragment, useState} from "react";
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
    
  button {
    background-color: #ef233c;
    border: none;
    cursor: pointer;
  }
`;

export const Code = observer(() => {
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
      />
      {invalidEdition &&
        <ResetWrapper>
          <button onClick={() => setInvalidEdition(null)}>back to previous valid code</button>
        </ResetWrapper>
        }
    </Fragment>
  )
});
