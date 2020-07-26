import React from "react";
import {observer} from "mobx-react";
import {Image, Layer, Stage} from "react-konva";
import useImage from "use-image";

import {PartsListProvider, usePartList} from "../models/PartsListModel";

const Part = observer(({p}) => {
  const [image] = useImage(p.img)

  return <Image image={image} x={p.P.x * 50}/>
})

const Canvas = observer(() => {
  const partListStore = usePartList();

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <PartsListProvider partListStore={partListStore}>
        <Layer>
          {partListStore.parts.map(p => <Part key={p.id} p={p}/>)}
        </Layer>
      </PartsListProvider>
    </Stage>
  );
});

export default Canvas;
