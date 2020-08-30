import React from "react";
import {action, observable} from 'mobx';

import ProbeModel, {parts} from './parts/ProbeModel';

export default class PartListModel {
  @observable parts = [
    new ProbeModel(parts.Probe),
    new ProbeModel(parts.FuelTank),
    new ProbeModel(parts.IonEngine),
  ];
}
