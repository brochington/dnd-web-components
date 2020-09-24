import { createEntity } from "@brochington/ecstatic";
import { getWorld, getOverlord } from "utils/elements";

import DNDOverlord from "dom-elements/DNDOverlord";
import DragWrapper from "dom-elements/DragWrapper";
import DragInteraction from "components/interactions/DragInteraction";

/*
  This should probably add and remove itself from the drag wrapper state.
  I think all internal dnd components probably should do this.

  attributes:
    - auto-return: element returns to its original placement after drag end
      - NOTE: should this be default behavior? Maybe hold-position should be
              an attr instead...

    - hold-position: tells the dragged item to maintain current position after
                     being dragged.
*/

class DragContent extends HTMLElement {
  _id: number;

  constructor() {
    super();
    console.log("construct DragContent");
    this._id = Math.random();

    const dragWrapper = this.closest<DragWrapper>("drag-wrapper");

    if (dragWrapper) {
      dragWrapper.entity.add(this);
    }

    this.addEventListener("pointerdown", this.onPointerDown);
    this.addEventListener("pointerover", this.onPointerOver);
  }

  onPointerDown(evt: PointerEvent) {
    // console.log('pointer_down', this._id);
    const { world, systems } = getOverlord(this);
    const dragWrapper = this.closest<DragWrapper>('drag-wrapper');

    if (!dragWrapper) return;

    // OffsetLeft and OffsetTop are use to calculate the original top and left
    // when a transform is applied. This is needed because getBoundingClientRect()
    // inlcudes this original number.
    const t = getComputedStyle(this, null).transform;
    let offsetLeft = this.offsetLeft;
    let offsetTop = this.offsetTop;

    if (t !== "none") {
      const tParsed = t.match(/-?\d+\.?\d*/g)?.map(Number);

      if (tParsed) {
        const rect = this.getBoundingClientRect();
        offsetLeft = rect.left - tParsed[4];
        offsetTop = rect.top - tParsed[5];
      }
    }

    console.log("offsets", offsetLeft, offsetTop);

    dragWrapper.entity.add(
      new DragInteraction({
        offsetLeft: offsetLeft,
        offsetTop: offsetTop,
        // offsetX and offsetY are the offset of where the mouse hits within the drag element.
        offsetX: evt.offsetX,
        offsetY: evt.offsetY,
      })
    );

    systems.run();
  }

  // onPointerOver() {
  //   console.log("over!", this._id);
  // }

  connectedCallback() {
    console.log("cc DragContent");
  }

  disconnectedCallback() {
    getWorld(this).locate(DragWrapper)?.remove(DragContent);

    this.removeEventListener("pointerdown", this.onPointerDown);
  }
}

export default DragContent;
