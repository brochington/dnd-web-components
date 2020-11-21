import { SystemArgs } from "types";
import { getContext } from "utils/elements";
import DragInteraction from "components/interactions/DragInteraction";
import DragContent from "dom-elements/DragContent";
import DraggingContent from "dom-elements/DraggingContent";
import DropZone from "dom-elements/DropZone";
import { handleOverDZ } from "utils/dropzone";

export function dragElement(args: SystemArgs): void {
  const { entity, components } = args;
  const interaction = components.get(DragInteraction);
  const dragContent = components.get(DragContent);
  const hasDraggingContent = components.has(DraggingContent);

  // entitites that have a DraggingContent componenent will be handled
  // in another system.
  if (hasDraggingContent) return;

  const { world, systems } = getContext(dragContent);

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

      const maintainPosition = dragContent.hasAttribute("maintain-position");

      if (!maintainPosition) {
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

  const transform = `translate(${x - offsetX - offsetLeft}px, ${
    y - offsetY - offsetTop
  }px)`;

  dragContent.style.transform = transform;

  handleOverDZ(x, y, dragContent, world);
}
