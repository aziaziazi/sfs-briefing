import React from "react";
import { observer } from "mobx-react";

const Part = observer(({part}) => {
  const handleRemove = () => part.remove();

  return <div onClick={handleRemove}>{part.id}</div>
});

export default Part;
