import React from "react";
import {observer} from "mobx-react";
import styled from "styled-components";
import {useCanvas, usePartList} from "../../stores";
import probeSrc from "../../assets/parts/probe.png";

const Wrapper = styled.div`
`;

const Part = observer(({part}) => {
  const canvasStore = useCanvas();

  const handleSlideNew = e => {
    // const elementPos = e.target.getBoundingClientRect()
    // const elementPosX = e.target.offsetLeft;
    // const elementPosY = e.target.offsetTop;
    // const mousePosX = e.pageX;
    // const mousePosY = e.pageY;
    // const mouseOffset = {
    //   x: mousePosX - elementPosX,
    //   y: mousePosY - elementPosY
    // }
  }

  const newPartOnCenter = () => {
    canvasStore.addDefaultProbe()
  }

  return (
    <img
      src={probeSrc}
      alt={`${part.name} element`}
      width={200}
      height={100}
      onClick={newPartOnCenter}
      onDragStart={handleSlideNew}
    />
  )
})

export const PartList = observer(() => {
  const partList = usePartList();

  return (
    <Wrapper>
      {partList.parts.map(p => <Part part={p}>{p.name}</Part>)}
    </Wrapper>
  )
});
