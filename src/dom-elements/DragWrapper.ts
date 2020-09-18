/*
 Things that will need to be done:
  - Monitor adding/removing of drag related elements. Maybe add mutation observers
   to them or something.
  - Need to figure out some kind of state management. Will the state be global?
*/

import DNDOverlord from './DNDOverlord';

class DragWrapper extends HTMLElement {
  constructor() {
    super();

    console.time('closest');
    const a = this.closest<DNDOverlord>("dnd-overlord");
    console.timeEnd("closest");
    console.log('a', a?._state);
  }
}

customElements.define("drag-wrapper", DragWrapper);