import React, {Fragment, useRef, useState} from "react";
import {observer} from "mobx-react";
import Konva from 'konva';
import {Image, Layer, Stage} from "react-konva";
import useImage from "use-image";
import probeSrc from '../../assets/parts/probe.png'

import {useStore, StoreProvider, useCanvas} from "../../stores";
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
      offsetX: p.offset.x,
      offsetY: p.offset.y,
      width: p.size.width,
      height: p.size.height,
      rotation: p.orientation,
    }

    const roundByHalfBlocSize = x => Math.round(x * 2) / 2;

    return (
      <Fragment>
        <Image
          {...sharedProps}
          ref={shadowRef}
          image={image}
          x={roundByHalfBlocSize(p.position.x)}
          y={roundByHalfBlocSize(p.position.y)}
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
          onClick={() => handleRemove(p)}
          onTouch={() => handleRemove(p)}
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

const Background = ({scale, stageWidth, stageHeight}) => {
  const [backgroundImage] = useImage(backgroundPattern)
  const offset = 1
                  / 2  // two (svg contains two lines)
                  / 2; // two (offset half of size)
  const svgSize = 100;

  return (
    <Image
      fillPatternImage={backgroundImage}
      opacity={1}
      x={- offset}
      y={- offset}
      scaleX={1 / scale}
      scaleY={1 / scale}
      width={(stageWidth + offset) * scale}
      height={(stageHeight + offset) * scale}
      fillPatternScale={{x: scale / svgSize, y: scale / svgSize}}
    />
  )
}

export const Canvas = observer(() => {
  const stageWidth = 3;
  const stageHeight = 3;
  const store = useCanvas();
  const stageRef = useRef(null);

  const handleDrop = e => {
    // stageRef.current.setPointersPositions(e);
    // const posOnStage = stageRef.current.getPointerPosition()
    // store.addProbe(posOnStage);
  }

  const handleRemove = part => store.removePart(part);

  return (
    <Fragment>
      <div
        onDragOver={e => {e.preventDefault();}}
        onDrop={handleDrop}
      >
        <Stage
          ref={stageRef}
          width={SCALE * stageWidth}
          height={SCALE * stageHeight}
          scaleX={SCALE}
          scaleY={SCALE * -1}
          offsetY={stageHeight}
        >
          <StoreProvider store={store}>
            <Layer>
              <Background scale={SCALE} stageWidth={stageWidth} stageHeight={stageHeight}/>
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
      </div>
    </Fragment>
  );
});
