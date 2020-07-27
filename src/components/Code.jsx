import React from "react";
import {observer} from "mobx-react";
import {usePartList} from "../models/PartsListModel";

const Code = observer(() => {
  const partListStore = usePartList()

  return (
    <div>
      <button onClick={() => partListStore.addProbe()}>add part</button>
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
