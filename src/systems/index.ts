import { World, System, createSystem, CompTypes } from "@brochington/ecstatic";
import noop from "lodash/noop";
import { Components } from "components";

import { dragElement } from "systems/dragElement";
import { dragOverDropZone} from 'systems/dragOverDropZone';


import DragInteraction from "components/interactions/DragInteraction";
import DragContent from 'dom-elements/DragContent';
import DraggingContent from 'dom-elements/DraggingContent';
import DragWrapper from 'dom-elements/DragWrapper';
import DNDOverlord from "dom-elements/DNDOverlord";
import DropZone from 'dom-elements/DropZone';

const totalAddAttemptsAllowed = 20;

class Systems {
  dragElement: System = noop;

  dragOverDropZone: System = noop;

  addAttempts = 0;

  constructor(world: World<Components>) {
    this.addSystems(world);
  }

  addSystems(world: World<Components>) {
    const allComps = [
      DragWrapper,
      DragContent,
      DraggingContent,
      DragInteraction,
      DNDOverlord,
      DropZone,
    ];

    if (allComps.every((c) => !!c)) {
      this.dragElement = world.createSystem(
        [DragWrapper, DragContent, DragInteraction],
        dragElement
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

    this.dragOverDropZone();
    // run whatever systems here.
  }
}

export default Systems;
