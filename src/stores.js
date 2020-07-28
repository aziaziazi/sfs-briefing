import React, {createContext} from "react";

const StoreContext = createContext();

export const StoreProvider = ({children, store}) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useStore = () => React.useContext(StoreContext);
export const useCanvas = () => React.useContext(StoreContext).canvas;
export const usePartList = () => React.useContext(StoreContext).partList;

/* HOC to inject store to any functional or class component */
export const withStores = (Component) => (props) => {
  return <Component {...props} store={useCanvas()}/>;
};