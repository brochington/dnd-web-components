import DragInteraction from "components/interactions/DragInteraction";
import DropZone from "dom-elements/DropZone";
import { getContext } from '../utils/elements';
import DNDDrag from "./DNDDrag";
import DraggingContent from "./DraggingContent";

function getDraggingContent(el: HTMLElement): DraggingContent | null {
  const dndDrag = el.closest<DNDDrag>("dnd-drag");

  if (!dndDrag) return null;

  const draggingContent = dndDrag.querySelector<DraggingContent>('dragging-content');

  return draggingContent;
}

class DragContent extends HTMLElement {

  dropZone: DropZone | null = null;

  constructor() {
    super();

    this.addEventListener("pointerdown", this.onPointerDown);
  }

  onPointerDown(evt: PointerEvent) {
    const { world, systems } = getContext(this);

    // OffsetLeft and OffsetTop" are use to calculate the original top and left
    // when a transform is applied. This is needed because getBoundingClientRect()
    // includes this original number.
    const computedStyles = getComputedStyle(this, null);
    const { transform: t } = computedStyles;

    let offsetLeft = this.offsetLeft;
    let offsetTop = this.offsetTop;
    const rect = this.getBoundingClientRect();

    if (t !== "none") {
      const tParsed = t.match(/-?\d+\.?\d*/g)?.map(Number);

      if (tParsed) {
        offsetLeft = rect.left - tParsed[4];
        offsetTop = rect.top - tParsed[5];
      }
    }

    const draggingContent = getDraggingContent(this);

    const elementComp = draggingContent || this;

    world
      .createEntity()
      .add(elementComp)
      .add(
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
    this.removeEventListener("pointerdown", this.onPointerDown);
  }
}

export default DragContent;
