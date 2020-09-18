import { createEntity } from '@brochington/ecstatic';

import DNDOverlord from "./DNDOverlord";
import DragInteraction from 'components/interactions/DragInteraction';

class DragContent extends HTMLElement {
  constructor() {
    console.log('hello?');
    super();

    this.addEventListener("pointerdown", this.onPointerDown);
  }

  onPointerDown(evt: PointerEvent) {
    console.log('pointer down!!');
    const overlord = this.closest<DNDOverlord>("dnd-overlord");

    if (overlord) {
      const { world, systems } = overlord;
      
      createEntity(world).add(new DragInteraction({
        element: this,
        initialized: false,
      }));

      systems.run();
    }
    // this.style.position = 'absolute';
    // this.style.left = `${evt.x}px`;
    // this.style.top = `${evt.y}px`;

    // document.addEventListener('pointermove', this.onPointerMove);
    // this.addEventListener('pointerup', this.onPointerUp);
  }

  // onPointerMove(evt: PointerEvent) {
  //   this.style.left = `${evt.x}px`;
  //   this.style.top = `${evt.y}px`;
  // }

  // onPointerUp(evt: PointerEvent) {
  //   document.removeEventListener("pointermove", this.onPointerMove);
  // }

  disconnectedCallback() {
    this.removeEventListener("pointerdown", this.onPointerDown);
  }
}

customElements.define("drag-content", DragContent);
