import { SystemArgs } from 'types';
import { getOverlord } from 'utils/elements';
import DragInteraction from 'components/interactions/DragInteraction';
import DNDOverlord from '../dom-elements/DNDOverlord';
import DragContent from 'dom-elements/DragContent';

export function dragElement(args: SystemArgs): void {
  const { entity, components } = args;
  const interaction = components.get(DragInteraction);
  const element = components.get(DragContent);

  const { world, systems } = getOverlord(element);

  if (!interaction.initialized) {
    interaction.initialized = true;

    const { offsetX, offsetY, offsetLeft, offsetTop } = interaction;
    // element.style.position = 'absolute';
    console.log(interaction);
    const handleMove = (evt: PointerEvent) => {
      element.style.transform =
        `translate(${evt.x - offsetX - offsetLeft}px, ${evt.y - offsetY - offsetTop}px)`;

      systems.run();
    }

    const handleUp = () => {
      document.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerup', handleUp);

      const maintainPosition = element.hasAttribute("maintain-position");
      console.log("maintainPosition", maintainPosition);
      if (!maintainPosition) {
        element.style.transform = 'none';
      }

      entity.remove(DragInteraction);
    }

    document.addEventListener('pointermove', handleMove);
    document.addEventListener('pointerup', handleUp)
  }
};