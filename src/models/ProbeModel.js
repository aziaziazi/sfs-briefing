import { action, computed, observable } from 'mobx';
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

  constructor(partsStore, posX, posY, scaleX, scaleY, orientation, scaleBoth) {
    this.partsStore = partsStore;
    this.P = { x: posX, y: posY };
    this.o = { x: scaleX, y: scaleY, z: orientation };
    this.N = { width: scaleBoth }; // todo: check if this parameter actually scale in both direction
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
    this.partsStore.remove(this);
  }
}
