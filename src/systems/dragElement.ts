import { SystemArgs } from 'types';
import { Components } from 'components';
import DragInteraction from 'components/interactions/DragInteraction';

export const dragElementComps = [Components.DragInteraction];


export function dragElement(args: SystemArgs): void {
  console.log('dragging element');
  const { components } = args;
  const interaction = components.get<DragInteraction>(Components.DragInteraction);

  if (!interaction.initialized) {
    console.log('init it!!', interaction);
    interaction.initialized = true;
    console.log('after: ', interaction.initialized);
  }
  // const interaction = 
};