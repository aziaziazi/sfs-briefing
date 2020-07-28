import React, {Fragment, useState} from "react";
import {observer} from "mobx-react";
import Konva from 'konva';
import {Image, Layer, Stage} from "react-konva";
import useImage from "use-image";

import {PartsListProvider, usePartList} from "../models/PartsListModel";
import backgroundPattern from '../assets/backgroundPattern.svg'
import {BLOC_SIZE} from "../models/constants";

const Part = observer(({p}) => {
    const [image] = useImage(p.img);
    const [isDragging, setDragging] = useState(false);
    const shadowRef = React.useRef();

    React.useEffect(() => {
      if (image) {
        shadowRef.current.cache();
        shadowRef.current.getLayer().batchDraw();
      }
    }, [image]);

    const sharedProps = {
      offsetX: p.offset.x,
      offsetY: p.offset.y,
      width: p.size.width,
      height: p.size.height,
      rotation: p.orientation,
    }

    return (
      <Fragment>
        <Image
          {...sharedProps}
          ref={shadowRef}
          image={image}
          x={Math.round(p.position.x * 2 / BLOC_SIZE) / 2 * BLOC_SIZE}
          y={Math.round(p.position.y * 2 / BLOC_SIZE) / 2 * BLOC_SIZE}
          opacity={isDragging ? 1 : 0}
          filters={[Konva.Filters.RGBA]}
          red={255}
          green={123}
          blue={23}
        />
        <Image
          {...sharedProps}
          image={image}
          opacity={1}
          x={p.position.x}
          y={p.position.y}
          onClick={() => p.remove()}
          onTouch={() => p.remove()}
          draggable={true}
          onDragMove={(e) => {
            setDragging(true)
            p.move(e.target.attrs.x, e.target.attrs.y);
          }}
          onDragEnd={(e) => {
            setDragging(false);
            p.move(e.target.attrs.x, e.target.attrs.y);
            p.snapToGrid();
          }}
        />
      </Fragment>
    )
  }
)

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
