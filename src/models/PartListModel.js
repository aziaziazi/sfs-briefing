import React from "react";
import {observable} from 'mobx';

import ProbeModel from './ProbeModel';

export default class PartListModel {
  @observable parts = [
    new ProbeModel(null, {
      'n': 'Probe',
      'P': {
        'x': 0,
        'y': 0
      },
      'o': {
        'x': 1,
        'y': 1,
        'z': 0
      },
      'N': {
        'width': 2
      }
    })
  ];
}
