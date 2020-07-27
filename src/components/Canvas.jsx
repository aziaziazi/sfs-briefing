import React from "react";
import {observer} from "mobx-react";
import {Image, Layer, Stage} from "react-konva";
import useImage from "use-image";

import {PartsListProvider, usePartList} from "../models/PartsListModel";
import backgroundPattern from '../assets/backgroundPattern.svg'

const Part = ({p}) => {
  const [image] = useImage(p.img)

  return (
    <Image
      image={image}
      x={p.position.x}
      y={p.position.y}
      offsetX={p.offset.x}
      offsetY={p.offset.y}
      width={p.size.width}
      height={p.size.height}
      rotation={p.orientation}
      onClick={() => p.remove()}
    />
  )
}

const Background = () => {
  const [backgroundImage] = useImage(backgroundPattern)

  return (
    <Image
      fillPatternImage={backgroundImage}
      opacity={0.5}
      x={-75}
      y={-75}
      width={575}
      height={575}
    />
  )
}

const Canvas = observer(() => {
  const partListStore = usePartList();

  return (
    <Stage width={500} height={400} scaleY={-1} offsetY={400}>
      <PartsListProvider partListStore={partListStore}>
        <Layer>
          <Background/>
        </Layer>
        <Layer>
          {partListStore.parts.map((p, i) => <Part key={i} p={p}/>)}
        </Layer>
      </PartsListProvider>
    </Stage>
  );
});

export default Canvas;
