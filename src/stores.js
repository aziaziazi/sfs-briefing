import React, {createContext} from "react";
import CanvasModel from "./models/CanvasModel";
import PartListModel from "./models/PartListModel";

const StoreContext = createContext();

export const StoreProvider = ({children, store}) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const store = {
  canvas: new CanvasModel(),
  partList: new PartListModel()
};

export const useStore = () => React.useContext(StoreContext);
export const useCanvas = () => React.useContext(StoreContext).canvas;
export const usePartList = () => React.useContext(StoreContext).partList;
