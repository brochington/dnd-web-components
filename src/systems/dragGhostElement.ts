import { SystemArgs } from "types";
import { getContext, getSystems } from "utils/elements";

import DragInteraction from "components/interactions/DragInteraction";
import DragContent from "dom-elements/DragContent";
import DraggingContent from "dom-elements/DraggingContent";
import DNDDrag from "dom-elements/DNDDrag";
import { handleOverDZ } from "utils/dropzone";

export function dragGhostElement(args: SystemArgs): void {
  const { entity, components } = args;
  const interaction = components.get(DragInteraction);
  const draggingContent = components.get(DraggingContent);
  const dndDrag = draggingContent.closest<DNDDrag>('dnd-drag');
  const dragContent = dndDrag?.querySelector<DragContent>('drag-content');

  if (!dragContent) return;

  // const systems = getSystems(dragContent);
  const { world, systems } = getContext(draggingContent);

  const { x, y, offsetX, offsetY, offsetLeft, offsetTop } = interaction;

  if (!interaction.initialized) {
    const handleMove = (evt: PointerEvent) => {
      interaction.x = evt.x;
      interaction.y = evt.y;

      systems.run();
    };

    const handleUp = (evt: PointerEvent) => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleUp);

      const maintainPosition = draggingContent.hasAttribute("maintain-position");

      if (!maintainPosition) {
        draggingContent.style.display = 'none';
        // might need to store the original transform on the element, in case
        // it had one.
        draggingContent.style.transform = 'initial';

        const rect = draggingContent.getBoundingClientRect();

        handleOverDZ(rect.x, rect.y, draggingContent, world);
      }


      entity.remove(DragInteraction);
      systems.run();
    };

    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerup", handleUp);
    draggingContent.style.display = "inline-block";
    const elRect = dragContent.getBoundingClientRect();
    const ghostRect = draggingContent.getBoundingClientRect();

    interaction.initialRect = elRect;
    interaction.initialGhostRect = ghostRect;

    interaction.initialized = true;
  }

  draggingContent.style.display = "inline-block";

  const elRect = interaction.initialRect;
  const dcRect = interaction.initialGhostRect;

  const a = x - offsetX - offsetLeft;
  const b = y - offsetY - offsetTop;

  const transform = `translate(${(elRect.x - dcRect.x) + a}px, ${
    (elRect.y - dcRect.y) + b
  }px)`;

  draggingContent.style.transform = transform;

  handleOverDZ(x, y, draggingContent, world);
}
