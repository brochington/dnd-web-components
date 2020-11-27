import { SystemArgs } from "types";
import { getContext } from "utils/elements";
import DragInteraction from "components/interactions/DragInteraction";
import DragContent from "dom-elements/DragContent";
import DraggingContent from "dom-elements/DraggingContent";
import DropZone from "dom-elements/DropZone";
import { handleOverDZ } from "utils/dropzone";
import { getParsedTransform } from 'utils/general';

export function dragElement(args: SystemArgs): void {
  const { entity, components } = args;
  const interaction = components.get(DragInteraction);
  const dragContent = components.get(DragContent);

  const dragContain = dragContent.closest("drag-contain");

  const { world, systems } = getContext(dragContent);

  const { x, y, offsetX, offsetY, offsetLeft, offsetTop } = interaction;

  if (!interaction.initialized) {
    const handleMove = (evt: PointerEvent) => {
      interaction.x = evt.x;
      interaction.y = evt.y;

      systems.run();
    };

    const handleUp = (evt: any) => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleUp);

      const snapBack = dragContent.hasAttribute("snap-back");

      if (snapBack) {
        dragContent.style.transform = "none";

        const rect = dragContent.getBoundingClientRect();

        handleOverDZ(rect.x, rect.y, dragContent, world);
      }

      entity.remove(DragInteraction);

      systems.run();
    };

    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerup", handleUp);

    interaction.initialized = true;
  }

  const nextX = x - offsetX - offsetLeft;
  const nextY = y - offsetY - offsetTop;

  let transform = `translate(${nextX}px, ${nextY}px)`;

  if (dragContain) {
    const containRect = dragContain.getBoundingClientRect();
    const contentRect = dragContent.getBoundingClientRect();

    const t = getParsedTransform(dragContent);

    if (t) {
      let boundX = nextX;
      let boundY = nextY;
      const northConst = contentRect.top - t[5]; // constant
      const eastConst = contentRect.right - t[4];
      const southConst = contentRect.bottom - t[5];
      const westConst = contentRect.left - t[4];
      const a = containRect.top - nextY;
      const b = containRect.bottom - nextY;
      const c = containRect.right - nextX;
      const d = containRect.left - nextX;

      // y axis
      if (a > northConst) {
        boundY = contentRect.top - northConst;
      } else if (b < southConst) {
        boundY = contentRect.bottom - southConst;
      }

      // x axis
      if (c < eastConst) {
        boundX = contentRect.right - eastConst;
      } else if (d > westConst) {
        boundX = contentRect.left - westConst;
      }

      transform = `translate(${boundX}px, ${boundY}px)`;
    }
  }

  dragContent.style.transform = transform;
  handleOverDZ(x, y, dragContent, world);
}
