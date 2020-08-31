import {action, computed, observable, toJS} from 'mobx';
import probeSrc from '../assets/parts/probe.png'
import fuelTankSrc from '../assets/parts/fuel-tank.png'
import ionEngineSrc from '../assets/parts/ion-engine.png'

export const parts = {
  Probe: {
    img: probeSrc,
    defaultSize: {x: 1, y: 1},
    xOffsetRatio: 0.5,
    yOffsetRatio: 0,
    bluePrint: {
      n: 'Probe',
      P: {
        x: 0,
        y: 0,
      },
      o: {
        x: 1,
        y: 1,
        z: 0,
      },
      N: {
        width: 2,
      }
    }
  },
  FuelTank: {
    img: fuelTankSrc,
    defaultSize: {x: 1, y: 1},
    xOffsetRatio: 0.5,
    yOffsetRatio: 0,
    bluePrint: {
      n: 'Fuel Tank',
      P: {
        x: 0,
        y: 0,
      },
      o: {
        x: 1,
        y: 1,
        z: 0,
      },
      N: {
        width_original: 3,
        width_a: 2.0,
        width_b: 2.0,
        height: 1.0,
        fuel_percent: 1.0,
      }
    }
  },
  IonEngine: {
    img: ionEngineSrc,
    defaultSize: {x: 0.8, y: 0.5},
    xOffsetRatio: 0.5,
    yOffsetRatio: 0,
    bluePrint: {
      n: 'Placeholder ION',
      P: {
        x: 0,
        y: 0,
      },
      o: {
        x: 1,
        y: 1,
        z: 0,
      },
      B: {
        engine_on: false,
      }
    }
  },
};

export default class PartModel {
  @observable P;
  @observable o;
  @observable N;
  @observable B;

  constructor({n, P, o, N, B}) {
    const defaultConfig = Object.values(parts).find(partConfig => partConfig.bluePrint.n === n)

    this.n = n;
    this.P = P;
    this.o = o;
    this.N = N;
    this.B = B;
    this.img = defaultConfig.img;
    this.defaultSize = defaultConfig.defaultSize;
    this.xOffsetRatio = defaultConfig.xOffsetRatio;
    this.yOffsetRatio = defaultConfig.yOffsetRatio;
  };

  @computed
  get jsData() {
    return toJS(this);
  }

  @computed
  get bluePrintData() {
    return {
      n: this.n,
      P: this.P,
      o: this.o,
      N: this.N,
      B: this.B
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
    const scaleX = this.o.x * this.defaultSize.x;
    const scaleY = this.o.y * this.defaultSize.y;
    const widthRatio = !this.N ? 1 : this.N.width || this.N.width_original;

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
