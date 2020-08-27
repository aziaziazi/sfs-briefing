import React from "react";
import {action, computed, observable} from 'mobx';

import ProbeModel from './parts/ProbeModel';

export default class CanvasModel {
  @observable canvasElements = [];

  @computed
  get bluePrint() {
    const partsFiltered = this.canvasElements.map(p => p.bluePrintData)
    const json = JSON.stringify({parts: partsFiltered}, null, 2)

    return json.replace(/"/g, "'")
  }

  @action
  addPart(partData) {
    this.canvasElements.push(new ProbeModel({...partData}));
  }

  @action
  updateBlueprint(newBlueprint) {
    this.canvasElements = newBlueprint.parts.map(p => new ProbeModel(p))
  }

  @action
  removePart(part) {
    this.canvasElements.remove(part)
  }
}
