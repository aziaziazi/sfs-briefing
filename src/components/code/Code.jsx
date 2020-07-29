import React, {useState} from "react";
import {observer} from "mobx-react";
import styled from "styled-components";
import {useStore} from "../../stores";

const BlueprintArea = styled.textarea`
  height: 200px;
  width: 200px;
  font-family: monospace;
  outline: none;
  border: 1px solid ${p => p.isInvalid ? 'red' : 'black'}
`;

export const Code = observer(() => {
  const store = useStore();
  const [invalidEdition, setInvalidEdition] = useState(null);

  const handleEdit = e => {
    const value = e.target.value;

    try {
      const parsed = JSON.parse(value.replace(/'/g, '"'));
      store.canvas.updateBlueprint(parsed);

      if (invalidEdition) setInvalidEdition(null);
    } catch (err) {
      setInvalidEdition(value)
    }
  };

  return (
    <div>
      <BlueprintArea
        onChange={handleEdit}
        value={invalidEdition || store.canvas.bluePrint}
        isInvalid={invalidEdition}
      />
      <button onClick={() => store.canvas.addDefaultProbe()}>add probe</button>
      {invalidEdition && <button onClick={() => setInvalidEdition(null)}>handleBackToValid</button>}
    </div>
  )
});
