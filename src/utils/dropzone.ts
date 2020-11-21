import { World } from "@brochington/ecstatic";
import { Components } from "components";

import DragContent from "dom-elements/DragContent";
import DraggingContent from "dom-elements/DraggingContent";
import DropZone from "dom-elements/DropZone";


export function handleOverDZ(
  x: number,
  y: number,
  element: DragContent | DraggingContent,
  world: World<Components>
): void {
  // Detect if over a dropzone by hiding the currently dragged, then doing a test
  // to see what the element below is.
  element.hidden = true;
  const elBelow = document.elementFromPoint(x, y);
  element.hidden = false;

  const dz = elBelow?.closest<DropZone>("drop-zone");

  // can only be over one drop zone at a time
  if (dz) {
    dz.items.add(element);
  } else {
    // remove from all dropzones
    world
      .grabAll(DropZone)
      .map(({ component }) => component.items.delete(element));
  }
}
