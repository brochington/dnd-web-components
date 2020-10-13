import { SystemArgs } from "types";
import DragContent from "dom-elements/DragContent";
import DropZone from "dom-elements/DropZone";

export function dragOverDropZone(args: SystemArgs): void {
  const { components } = args;

  const dz = components.get(DropZone);
  
  const child = dz.querySelector('div');

  if (dz.items.size > 0) {
    if (child) {
      child.style.backgroundColor = "orange";
    }
  } else {
    if (child) {
      child.style.backgroundColor = "cyan";
    }
  }
}
