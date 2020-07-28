import {action, computed, observable} from 'mobx';
import {BLOC_SIZE} from './constants';
import probeSrc from '../assets/parts/probe.png'

export default class ProbeModel {
  partsStore; // keep this line ?
  n = 'Probe';
  img = probeSrc;
  xOffsetRatio = 0.5;
  yOffsetRatio = 0;

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
    return {
      x: this.P.x * BLOC_SIZE,
      y: this.P.y * BLOC_SIZE
    };
  }

  @computed
  get orientation() {
    return this.o.z;
  }

  @computed
  get size() {
    const scaleX = this.o.x;
    const scaleY = this.o.y;
    const widthRatio = this.N.width;

    return {
      width: BLOC_SIZE * scaleX * widthRatio,
      height: BLOC_SIZE * scaleY
    };
  }

  @computed
  get offset() {
    return {
      x: this.xOffsetRatio * this.size.width,
      y: this.yOffsetRatio * this.size.height
    }
  }

  @action
  move(x, y) {
    this.P.x = x / BLOC_SIZE;
    this.P.y = y / BLOC_SIZE;
  };

  @action
  snapToGrid() {
    this.P.x = Math.round(this.P.x * 2 ) / 2;
    this.P.y = Math.round(this.P.y * 2 ) / 2;
  }

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
