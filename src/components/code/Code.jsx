import React, {Fragment, useState} from "react";
import {observer} from "mobx-react";
import styled from "styled-components";
import {useCanvas} from "../../stores";

const BlueprintArea = styled.textarea`
  flex-shrink: 0;
  height: calc(100vh - 16px);
  box-sizing: border-box;
  width: 200px;
  font-family: monospace;
  outline: none;
  border: 1px solid ${p => p.isInvalid ? 'red' : 'black'}
`;

const ResetButton = styled.button`
  position: absolute;
`;

export const Code = observer(() => {
  const canvasStore = useCanvas();

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
      />
      {invalidEdition && <ResetButton onClick={() => setInvalidEdition(null)}>back to previous valid code</ResetButton>}
    </Fragment>
  )
});
