import { createEntity } from "@brochington/ecstatic";
import { getWorld, getOverlord } from "utils/elements";

import DNDOverlord from "dom-elements/DNDOverlord";
import DragWrapper from "dom-elements/DragWrapper";
import DragInteraction from "components/interactions/DragInteraction";
import DropZone from "dom-elements/DropZone";

/*
  This should probably add and remove itself from the drag wrapper state.
  I think all internal dnd components probably should do this.

  attributes:
    - auto-return: element returns to its original placement after drag end
      - NOTE: should this be default behavior? Maybe hold-position should be
              an attr instead...

    - hold-position: tells the dragged item to maintain current position after
                     being dragged.
    - reset: Reset the position to the original position.
*/

class DragContent extends HTMLElement {

  dropZone: DropZone | null = null;

  constructor() {
    super();

    const dragWrapper = this.closest<DragWrapper>("drag-wrapper");

    if (dragWrapper) {
      dragWrapper.entity.add(this);
    }

    this.addEventListener("pointerdown", this.onPointerDown);
    // this.addEventListener("pointerover", this.onPointerOver);
  }

  onPointerDown(evt: PointerEvent) {
    const { world, systems } = getOverlord(this);
    const dragWrapper = this.closest<DragWrapper>('drag-wrapper');

    if (!dragWrapper) return;

    // OffsetLeft and OffsetTop are use to calculate the original top and left
    // when a transform is applied. This is needed because getBoundingClientRect()
    // includes this original number.
    const computedStyles = getComputedStyle(this, null);
    const { transform: t, borderWidth } = computedStyles;

    let offsetLeft = this.offsetLeft;
    let offsetTop = this.offsetTop;
    const rect = this.getBoundingClientRect();

    // this.style.boxSizing = 'content-box';

    if (t !== "none") {
      const tParsed = t.match(/-?\d+\.?\d*/g)?.map(Number);

      if (tParsed) {
        console.log("tParsed!!", tParsed);
        offsetLeft = rect.left - tParsed[4];
        offsetTop = rect.top - tParsed[5];
      }
    }

    dragWrapper.entity.add(
      new DragInteraction({
        x: evt.x,
        y: evt.y,
        offsetLeft: offsetLeft,
        offsetTop: offsetTop,
        // offsetX and offsetY are the offset of where the mouse hits within the drag element.
        // These CANNOT be determined by element.offsetX/offsetY because they don't include the
        // border width.
        // https://stackoverflow.com/questions/35360704/wrong-offsetx-and-offsety-on-mousedown-event-of-parent-element
        offsetX: evt.clientX - rect.left,
        offsetY: evt.clientY - rect.top,
        clientX: evt.clientX,
        clientY: evt.clientY,
      })
    );

    systems.run();
  }

  disconnectedCallback() {
    getWorld(this).locate(DragWrapper)?.remove(DragContent);

    this.removeEventListener("pointerdown", this.onPointerDown);
  }
}

export default DragContent;
