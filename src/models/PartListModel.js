import React from "react";
import {action, observable} from 'mobx';

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

  @action
  dragPart(e, part, addDefaultProbe) {
    console.log("dragPart action");
    console.log("e => ", e);
    console.log("part => ", part);
    const elementRect = e.target.getBoundingClientRect();

    const elementSize = part.size;
    const elementOffset = part.offset;
    const elementPos = {
      x: e.target.offsetLeft,
      y: e.target.offsetTop
    };
    const mousePos = {
      x: e.pageX,
      y: e.pageY
    };

    const mouseOffset = {
      x: mousePos.x - elementPos.x,
      y: mousePos.y - elementPos.y
    }

    console.log({elementSize});
    console.log({elementOffset});
    console.log({elementPos});
    console.log({mousePos});
    console.log("mouseOffset => ", mouseOffset);
    addDefaultProbe()
  }
}
