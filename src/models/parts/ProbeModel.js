import {action, computed, observable, toJS} from 'mobx';
import probeSrc from '../../assets/parts/probe.png'

export const parts = {
  'Probe': {
    n: 'Probe',
    P: {
      x: 0,
      y: 0,
    },
    img: probeSrc,
    xOffsetRatio: 0.5,
    yOffsetRatio: 0,
    o: {
      x: 1,
      y: 1,
      z: 0,
    },
    N: {
      width: 2,
    }
  },
  'Probe2': {
    n: 'Probe2',
    P: {
      x: 0,
      y: 0,
    },
    img: probeSrc,
    xOffsetRatio: 0.5,
    yOffsetRatio: 0,
    o: {
      x: 1.5,
      y: 1.5,
      z: 0,
    },
    N: {
      width: 2,
    }
  },
}

export default class ProbeModel {
  @observable P;
  @observable o;
  @observable N;

  constructor(probeData) {
    const defaultValues = parts[probeData.n]
    this.n = probeData.n;
    this.P = probeData.P;
    this.o = probeData.o;
    this.N = probeData.N;
    this.img = probeData.img || defaultValues.img;
    this.xOffsetRatio = probeData.xOffsetRatio || defaultValues.xOffsetRatio;
    this.yOffsetRatio = probeData.yOffsetRatio || defaultValues.yOffsetRatio;
  };

  @computed
  get jsData() {
    return toJS(this);
  }

  @computed
  get bluePrintData() {
    return {
      n: this.jsData.n,
      P: this.jsData.P,
      o: this.jsData.o,
      N: this.jsData.N
    }
  }

  @computed
  get name() {
    return this.n;
  }

  @computed
  get position() {
    return {
      x: this.P.x,
      y: this.P.y
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
      width: scaleX * widthRatio,
      height: scaleY
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
    this.P.x = x;
    this.P.y = y;
  };

  @action
  snapToGrid() {
    this.P.x = Math.round(this.P.x * 2) / 2;
    this.P.y = Math.round(this.P.y * 2) / 2;
  }

  @action
  turn(orientation) {
    this.o.z = this.o.z + orientation;
  }

  @action
  resize(orientation) {
    this.o.z = this.o.z + orientation;
  }
}
