import { World } from '@brochington/ecstatic';
import { SystemArgs } from "types";
import { getOverlord } from "utils/elements";
import DragInteraction from "components/interactions/DragInteraction";
import DNDOverlord from "../dom-elements/DNDOverlord";
import DragContent from "dom-elements/DragContent";
import DropZone from "dom-elements/DropZone";
import { Components } from "components";
import DragWrapper from 'dom-elements/DragWrapper';
import DraggingContent from 'dom-elements/DraggingContent';

function handleOverDZ(x: number, y: number, element: DragContent, world: World<Components>): void {
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

export function dragElement(args: SystemArgs): void {
  const { entity, components } = args;
  const interaction = components.get(DragInteraction);
  const element = components.get(DragContent);
  const draggingContent = components.get(DraggingContent);

  console.log('dc', draggingContent);

  // const draggingContent = wrapper.querySelector('dragging-content');

  const { world, systems } = getOverlord(element);

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

      const maintainPosition = element.hasAttribute("maintain-position");

      if (!maintainPosition) {
        element.style.transform = "none";
        
        const rect = element.getBoundingClientRect();

        handleOverDZ(rect.x, rect.y, element, world);
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

  // console.log('transform: ', transform);

  if (draggingContent) {
    draggingContent.style.display = 'inline-block';
    draggingContent.style.transform = transform;
  } else {
    element.style.transform = transform;
  }

  handleOverDZ(x, y, element, world);
}
