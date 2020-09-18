/*
  This is the main provider of state for all the drag and drop components
  within it. 
*/

import { v4 as uuidv4 } from "uuid";
import { World } from '@brochington/ecstatic';
import { Components } from '../components';
import Systems from "systems";
// import { }

class DNDOverlord extends HTMLElement {
  overlordID: string;

  world: World<Components>;

  systems: Systems;

  constructor() {
    super();

    this.overlordID = uuidv4();

    this.world = new World<Components>();
    this.systems = new Systems(this.world);
  }
}

customElements.define("dnd-overlord", DNDOverlord);

export default DNDOverlord;