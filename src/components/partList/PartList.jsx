import React from "react";
import {observer} from "mobx-react";
import styled from "styled-components";
import {useCanvas, usePartList} from "../../stores";
import {SCALE} from "../canvas/Canvas";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const PartWrapper = styled.div`
  margin-top: 1.2rem;
  
  &:first-of-type {
    margin-top: 0;
  }
`;

const PartName = styled.h3`
  font-family: monospace;
  font-weight: lighter;
  margin: 0 0 0.1rem;
  font-size: 0.8rem;
`

const PartImage = styled.img`
  image-rendering: pixelated;
`;

const Part = observer(({part}) => {
  const canvasStore = useCanvas();

  const addPart = () => {
    canvasStore.addPart(part.jsData);
  };

  return (
    <PartWrapper>
      <PartName>{part.n}</PartName>
      <PartImage
        src={part.img}
        alt={`${part.name} element`}
        width={part.size.width * SCALE}
        height={part.size.height * SCALE}
        onClick={addPart}
      />
    </PartWrapper>
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
