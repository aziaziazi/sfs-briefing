import React, {Fragment, useRef, useState} from "react";
import {observer} from "mobx-react";
import Konva from 'konva';
import {Image, Layer, Stage} from "react-konva";
import useImage from "use-image";

import {StoreProvider, useCanvas} from "../../stores";
import backgroundPattern from '../../assets/backgroundPattern.svg'

export const SCALE = 100

const Part = observer(({p, handleRemove}) => {
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
      offsetX: p.offset.x * SCALE,
      offsetY: p.offset.y * SCALE,
      width: p.size.width * SCALE,
      height: p.size.height * SCALE,
      rotation: p.orientation,
    }

    const roundByHalfBlocSize = x => Math.round(x * 2) / 2;

    return (
      <Fragment>
        <Image
          {...sharedProps}
          ref={shadowRef}
          image={image}
          x={roundByHalfBlocSize(p.position.x) * SCALE}
          y={roundByHalfBlocSize(p.position.y) * SCALE}
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
          x={p.position.x * SCALE}
          y={p.position.y * SCALE}
          onClick={() => handleRemove(p)}
          onTouch={() => handleRemove(p)}
          draggable={true}
          onDragMove={(e) => {
            setDragging(true)
            p.move(e.target.attrs.x / SCALE, e.target.attrs.y / SCALE);
          }}
          onDragEnd={(e) => {
            setDragging(false);
            p.move(e.target.attrs.x / SCALE, e.target.attrs.y / SCALE);
            p.snapToGrid();
          }}
        />
      </Fragment>
    )
  }
)

const Background = ({stageWidth, stageHeight}) => {
  const [backgroundImage] = useImage(backgroundPattern)
  const offset = 1
                  / 2  // two (svg contains two lines)
                  / 2; // two (offset half of size)

  return (
    <Image
      fillPatternImage={backgroundImage}
      opacity={1}
      x={- offset * SCALE}
      y={- offset * SCALE}
      width={(stageWidth + offset) * SCALE}
      height={(stageHeight + offset) * SCALE}
    />
  )
}

export const Canvas = observer(() => {
  const stageWidth = 3;
  const stageHeight = 5;
  const store = useCanvas();
  const stageRef = useRef(null);

  const handleRemove = part => store.removePart(part);

  return (
    <Fragment>
      <Stage
        ref={stageRef}
        width={SCALE * stageWidth}
        height={SCALE * stageHeight}
        scaleX={1}
        scaleY={-1}
        offsetY={stageHeight * SCALE}
      >
        <StoreProvider store={store}>
          <Layer>
            <Background stageWidth={stageWidth} stageHeight={stageHeight}/>
          </Layer>
          <Layer>
            {store.canvasElements.map((p, i) => (
              <Part
                key={i}
                p={p}
                handleRemove={handleRemove}
              />
              ))}
          </Layer>
        </StoreProvider>
      </Stage>
    </Fragment>
  );
});
