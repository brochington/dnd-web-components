import { Entity } from "@brochington/ecstatic";
import { Components } from "components";
import DragInteraction from "components/interactions/DragInteraction";
import { getWorld } from "utils/elements";
import DragContent from "./DragContent";
import DraggingContent from "./DraggingContent";

class DropZone extends HTMLElement {
  entity: Entity<Components>;

  items: Set<DragContent | DraggingContent>

  constructor() {
    super();

    this.entity = getWorld(this).createEntity().add(this);
    this.items = new Set();

    // this.addEventListener('pointerover', this.onPointerOver);
  }

  // onPointerOver() {
  //   console.log('over drop zone!');

  //   // const world = getWorld(this);

  //   // const things = world.locateAll(DragInteraction);

  //   // world.locateAll(DragInteraction).map((ent) => {
  //   //   console.log('drag entity', ent);
  //   // });
  // }

  disconnectedCallback() {
    this.entity.destroy();
    // this.removeEventListener('mouseover', this.onPointerOver);
  }
}

export default DropZone;
