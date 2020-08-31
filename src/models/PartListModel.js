import React from "react";
import {observable} from 'mobx';

import PartModel, {parts} from './PartModel';

export default class PartListModel {
  @observable parts = [
    new PartModel(parts.Probe.bluePrint),
    new PartModel(parts.FuelTank.bluePrint),
    new PartModel(parts.IonEngine.bluePrint),
  ];
}
