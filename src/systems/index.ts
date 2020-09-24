import { World, System, createSystem, CompTypes } from "@brochington/ecstatic";
import noop from "lodash/noop";
import { Components } from "components";

import { dragElement } from "systems/dragElement";
import DragInteraction from "components/interactions/DragInteraction";
import DragContent from 'dom-elements/DragContent';
import DragWrapper from 'dom-elements/DragWrapper';
import DNDOverlord from "dom-elements/DNDOverlord";

const totalAddAttemptsAllowed = 20;

class Systems {
  dragElement: System = noop;

  addAttempts = 0;

  constructor(world: World<Components>) {
    this.addSystems(world);
  }

  addSystems(world: World<Components>) {
    const allComps = [DragWrapper, DragContent, DragInteraction, DNDOverlord];

    if (allComps.every((c) => !!c)) {
      this.dragElement = world.createSystem(
        [DragWrapper, DragContent, DragInteraction],
        dragElement
      );

      return;
    }

    this.addAttempts += 1;

    if (this.addAttempts < totalAddAttemptsAllowed) {
      window.requestAnimationFrame(() => this.addSystems(world));
    } else {
      throw new Error("Unable to load Sytems");
    }
  }

  run() {
    this.dragElement();
    // run whatever systems here.
  }
}

export default Systems;
