import React, {useState} from "react";
import {observer} from "mobx-react";
import {usePartList} from "../models/PartsListModel";
import styled from "styled-components";

const BlueprintArea = styled.textarea`
  height: 200px;
  width: 200px;
  font-family: monospace;
  outline: none;
  border: 1px solid ${p => p.isInvalid ? 'red' : 'black'}
`;

const Code = observer(() => {
  const partListStore = usePartList();
  const [invalidEdition, setInvalidEdition] = useState(null);

  const handleEdit = e => {
    const value = e.target.value;

    try {
      const parsed = JSON.parse(value.replace(/'/g, '"'));
      partListStore.updateBlueprint(parsed);

      if (invalidEdition) setInvalidEdition(null);
    } catch (err) {
      setInvalidEdition(value)
    }
  };

  return (
    <div>
      <BlueprintArea
        onChange={handleEdit}
        value={invalidEdition || partListStore.bluePrint}
        isInvalid={invalidEdition}
      />
      {invalidEdition && <button onClick={() => setInvalidEdition(null)}>handleBackToValid</button>}
      <button onClick={() => partListStore.addProbe()}>add probe</button>
    </div>
  )
});

export default Code;
