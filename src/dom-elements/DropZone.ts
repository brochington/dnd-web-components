import { Entity } from "@brochington/ecstatic";
import { Components } from "components";
import DragInteraction from "components/interactions/DragInteraction";
import { getWorld } from "utils/elements";

class DropZone extends HTMLElement {
  entity: Entity<Components>;

  constructor() {
    super();

    this.entity = getWorld(this).createEntity().add(this);

    this.addEventListener('pointerover', this.onPointerOver);
  }

  onPointerOver() {
    console.log('over drop zone!');

    const world = getWorld(this);

    const things = world.locateAll(DragInteraction);

    console.log(things);

    world.locateAll(DragInteraction).map((ent) => {
      console.log('drag entity', ent);
    });
  }

  disconnectedCallback() {
    this.entity.destroy();
    this.removeEventListener('pointerover', this.onPointerOver);
  }
}

export default DropZone;
