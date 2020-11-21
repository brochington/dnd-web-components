import { World, System, createSystem, CompTypes } from "@brochington/ecstatic";
import noop from "lodash/noop";
import { Components } from "components";

import { dragElement } from "systems/dragElement";
import { dragGhostElement } from 'systems/dragGhostElement';
import { dragOverDropZone} from 'systems/dragOverDropZone';


import DragInteraction from "components/interactions/DragInteraction";
import DragContent from 'dom-elements/DragContent';
import DraggingContent from 'dom-elements/DraggingContent';
// import DragWrapper from 'dom-elements/DragWrapper';
import DNDContext from "dom-elements/DNDContext";
import DropZone from 'dom-elements/DropZone';
import DNDDrag from "dom-elements/DNDDrag";

const totalAddAttemptsAllowed = 20;

class Systems {
  dragElement: System = noop;

  dragGhostElement: System = noop;

  dragOverDropZone: System = noop;

  addAttempts = 0;

  constructor(world: World<Components>) {
    this.addSystems(world);
  }

  addSystems(world: World<Components>) {
    const allComps = [
      DNDDrag,
      DragContent,
      DraggingContent,
      DragInteraction,
      DNDContext,
      DropZone,
    ];

    if (allComps.every((c) => !!c)) {
      this.dragElement = world.createSystem(
        [DragContent, DragInteraction],
        dragElement
      );

      this.dragGhostElement = world.createSystem(
        [DraggingContent, DragInteraction],
        dragGhostElement
      );

      this.dragOverDropZone = world.createSystem(
        [DropZone],
        dragOverDropZone
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

    this.dragGhostElement();

    this.dragOverDropZone();
    // run whatever systems here.
  }
}

export default Systems;
