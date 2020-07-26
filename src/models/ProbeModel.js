import {action, computed, observable, toJS} from 'mobx';
import { BLOC_SIZE } from './constants';
import LionSrc from '../lion.png'

export default class ProbeModel {
  partsStore; // keep this line ?
  n = 'Probe';
  img = LionSrc;
  id = Math.random();
  originalSizeX = 2 * BLOC_SIZE;
  originalSizeY = BLOC_SIZE;
  @observable title;
  @observable P;
  @observable o;
  @observable N;
  @observable finished = false;

  constructor(partsStore, probeData) {
    this.partsStore = partsStore;
    this.P = probeData.P;
    this.o = probeData.o;
    this.N = probeData.N; // todo: check if this parameter actually scale in both direction
  };

  @computed
  get bluePrintData() {
    return {
      n: this.n,
      P: this.P,
      o: this.o,
      N: this.N
    }
  }

  @computed
  get bluePrint() {
    const json = JSON.stringify(this.bluePrintData, null, 2)

    return json.replace(/"/g, "'")
  }


  @computed
  get name() {
    return this.n;
  }

  @computed
  get position() {
    return { x: this.P.x, y: this.P.y };
  }

  @computed
  get orientation() {
    return t.o.z;
  }

  @computed
  get size() {
    const scaleX = this.o.x;
    const scaleY = this.o.y;
    const scaleBoth = this.N.width;
    const width = this.originalSizeX * scaleX * scaleBoth;
    const height = this.originalSizeY * scaleY * scaleBoth;
    return { width, height };
  }

  @action
  move(x, y) {
    this.P = { x, y };
  };

  @action
  turn(orientation) {
    this.o.z = this.o.z + orientation;
  }

  @action
  resize(orientation) {
    this.o.z = this.o.z + orientation;
  }

  @action
  remove() {
    this.partsStore.parts.remove(this);
  }
}
