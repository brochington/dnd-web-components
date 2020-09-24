/*
 Things that will need to be done:
  - Monitor adding/removing of drag related elements. Maybe add mutation observers
   to them or something.
  - Need to figure out some kind of state management. Will the state be global?
*/

import { Entity } from '@brochington/ecstatic';
import DNDOverlord from 'dom-elements/DNDOverlord';
import { Components } from 'components';
import { getWorld } from 'utils/elements';

class DragWrapper extends HTMLElement {
  entity: Entity<Components>;

  constructor() {
    super();

    this.entity = getWorld(this).createEntity().add(this);
  }

  connectedCallback() {
    console.log("cc DragWrapper");
  }

  disconnectedCallback() {
    this.entity.destroy();
  }
}

export default DragWrapper;
