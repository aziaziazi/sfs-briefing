import React from "react";
import {action, computed, observable, toJS} from 'mobx';

import ProbeModel from './ProbeModel';
import {BLOC_SIZE} from "./constants";

export default class CanvasModel {
  @observable canvasElements = [];

  @computed
  get bluePrint() {
    const partsFiltered = toJS(this.canvasElements.map(p => p.bluePrintData))
    const json = JSON.stringify({parts: partsFiltered}, null, 2)

    return json.replace(/"/g, "'")
  }

  @action
  addProbe({x, y}) {
    //const posX = x / BLOC_SIZE;
    //const posY = (400 - y) / BLOC_SIZE;

    this.canvasElements.push(new ProbeModel({
      'n': 'Probe',
      'P': {
        'x': x,
        'y': y
      },
      'o': {
        'x': 1,
        'y': 1,
        'z': 0
      },
      'N': {
        'width': 2
      }
    }, true));
  }

  @action
  addDefaultProbe() {
    this.addProbe({x: 0, y: 0});
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
