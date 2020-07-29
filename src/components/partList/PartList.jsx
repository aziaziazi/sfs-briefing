import React from "react";
import {observer} from "mobx-react";
import styled from "styled-components";
import {useCanvas, usePartList} from "../../stores";
import probeSrc from "../../assets/parts/probe.png";

const Wrapper = styled.div`
`;

const Part = observer(({part, dragPart}) => {
  const canvasStore = useCanvas();
  const addDefaultProbe = () => canvasStore.addDefaultProbe();

  return (
    <img
      src={probeSrc}
      alt={`${part.name} element`}
      width={200}
      height={100}
      onClick={addDefaultProbe}
      onDragStart={e => dragPart(e, part, addDefaultProbe)}
    />
  )
});

export const PartList = observer(() => {
  const partList = usePartList();

  return (
    <Wrapper>
      {partList.parts.map((p, i) => (
        <Part
          key={i}
          part={p}
          dragPart={partList.dragPart}
        >
          {p.name}
        </Part>
      ))}
    </Wrapper>
  )
});
