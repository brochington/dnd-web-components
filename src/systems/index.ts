import { World, System, createSystem } from '@brochington/ecstatic';
import { Components } from 'components';

import { dragElement, dragElementComps } from 'systems/dragElement';

class Systems {
  dragElement: System;

  constructor(world: World<Components>) {
    this.dragElement = createSystem(world, dragElementComps, dragElement);
  }

  run() {
    this.dragElement();
    // run whatever systems here.
  }
}

export default Systems;
