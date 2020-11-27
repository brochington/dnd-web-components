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
  // Detect if over a dropzone by hiding the element currently dragged,
  // then doing a test to see what the element below it is.
  // element.hidden = true;

  // Update! For now there is an issue with hiding the currently
  // dragged element if a dropzone is below it in the DOM tree.
  // hiding a transformed element doesn't maintain the spaceing, so
  // there is a shift in the layer, which will move the dropzone
  // and affect the below element detection. Using style.pointerEvents
  // instead to let the dragged element be clicked through. 
  const originalPointerEventVal = element.style.pointerEvents;

  element.style.pointerEvents = 'none'
  const elBelow = document.elementFromPoint(x, y);
  element.style.pointerEvents = originalPointerEventVal;
  // element.hidden = false;

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
