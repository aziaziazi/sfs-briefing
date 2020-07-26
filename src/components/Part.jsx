import React from "react";
import { observer } from "mobx-react";
import {usePartList} from "../models/PartsListModel";

const Part = observer((props) => {
  const handleRemove = () => props.part.remove();
  const partsListStore = usePartList()
  
  console.log("props => ", props);
  console.log("partsListStore => ", partsListStore);
  return <div onClick={handleRemove}>{props.part.id}</div>
});

export default Part;
