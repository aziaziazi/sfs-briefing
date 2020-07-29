import React, {Fragment, useRef, useState} from "react";
import {observer} from "mobx-react";
import Konva from 'konva';
import {Image, Layer, Stage} from "react-konva";
import useImage from "use-image";
import probeSrc from '../../assets/parts/probe.png'

import {useStore, StoreProvider, useCanvas} from "../../stores";
import backgroundPattern from '../../assets/backgroundPattern.svg'
import {BLOC_SIZE} from "../../models/constants";

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

    const roundByHalfBlocSize = x => Math.round(x * 2 / BLOC_SIZE) / 2 * BLOC_SIZE;

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

export const Canvas = observer(() => {
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
          width={500}
          height={400}
          scaleY={-1}
          offsetY={400}
        >
          <StoreProvider store={store}>
            <Layer>
              <Background/>
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
