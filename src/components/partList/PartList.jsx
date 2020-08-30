import React from "react";
import {observer} from "mobx-react";
import styled from "styled-components";
import {useCanvas, usePartList} from "../../stores";
import {SCALE} from "../canvas/Canvas";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledPart = styled.img`
  image-rendering: pixelated;
  margin-bottom: 1rem;
`;

const Part = observer(({part}) => {
  const canvasStore = useCanvas();

  const addPart = () => {
    canvasStore.addPart(part.jsData);
  };

  return (
    <StyledPart
      src={part.img}
      alt={`${part.name} element`}
      width={part.size.width * SCALE}
      height={part.size.height * SCALE}
      onClick={addPart}
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
        >
          {p.name}
        </Part>
      ))}
    </Wrapper>
  )
});
