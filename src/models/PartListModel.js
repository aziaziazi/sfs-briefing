import React from "react";
import {observable} from 'mobx';

import PartModel, {parts} from './PartModel';

export default class PartListModel {
  @observable parts = [
    new PartModel(parts.Probe),
    new PartModel(parts.FuelTank),
    new PartModel(parts.IonEngine),
  ];
}
