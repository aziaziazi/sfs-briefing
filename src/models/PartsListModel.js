import React, {createContext} from "react";
import {action, computed, observable, toJS} from 'mobx';

import ProbeModel from './ProbeModel';

export default class PartsListModel {
  @observable parts = [];

  @computed
  get bluePrint() {
    const partsFiltered = toJS(this.parts.map(p => p.bluePrintData))
    const json = JSON.stringify({parts: partsFiltered})

    return json.replace(/"/g, "'")
  }

  @action
  addProbe() {
    this.parts.push(new ProbeModel(this.parts, 1, 1, 1, 1, 90, 2.0));
  }

  @action
  positionToTop(index) {
  }
}

const PartsListContext = createContext();

export const PartsListProvider = ({children, partListStore}) => {
  return (
    <PartsListContext.Provider value={partListStore}>{children}</PartsListContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const usePartList = () => React.useContext(PartsListContext);

/* HOC to inject store to any functional or class component */
export const withPartList = (Component) => (props) => {
  return <Component {...props} store={usePartList()}/>;
};