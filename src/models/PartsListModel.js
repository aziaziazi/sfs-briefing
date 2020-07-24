import { action, computed, observable, toJS } from 'mobx';

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
