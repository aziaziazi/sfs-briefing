import React from "react";
import {observer} from "mobx-react";
import {usePartList} from "../models/PartsListModel";

const Code = observer(() => {
  const partListStore = usePartList()

  return (
    <div>
      <h4>Parts</h4>
      <button onClick={() => partListStore.addProbe()}>add part</button>
      {partListStore.parts.map((p) => <div key={p.id} id={p.id} onClick={() => p.remove()}>{p.id}</div>)}

      <h4>Blueprint Code</h4>
      <div><small><i>update P.x to move the lions</i></small></div>
      <textarea
        style={{height: 300, width: 300, fontFamily: 'monospace'}}
        onChange={e => partListStore.updateBlueprint(e.target.value)}
        value={partListStore.bluePrint}
      />
    </div>
  )
});

export default Code;
