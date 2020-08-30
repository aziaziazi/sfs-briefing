import React from "react";
import {action, computed, observable} from 'mobx';

import PartModel from './PartModel';

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
    this.canvasElements.push(new PartModel({...partData}));
  }

  @action
  updateBlueprint(newBlueprint) {
    this.canvasElements = newBlueprint.parts.map(p => new PartModel(p))
  }

  @action
  removePart(part) {
    this.canvasElements.remove(part)
  }
}
