import React from "react";
import { render } from "react-dom";
import PartsList from './components/PartsList';
import PartsListModel, {PartsListProvider} from './models/PartsListModel';

const store = new PartsListModel();

render(
  <div>
    <PartsListProvider partListStore={store}>
      <PartsList/>
    </PartsListProvider>
  </div>,
  document.getElementById("root")
);

store.addProbe();
store.addProbe();
store.addProbe();

// playing around in the console
window.store = store;
