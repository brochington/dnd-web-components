/*
  This is the main provider of state for all the drag and drop components
  within it. 
*/

import { v4 as uuidv4 } from "uuid";
import Staction from 'staction';
import sharedStateMap, { State } from '../shared-state';
import { Actions } from '../actions';

class DNDOverlord extends HTMLElement {
  dnd_id: string;

  _state: Staction<State, Actions>;

  constructor() {
    super();

    this.dnd_id = uuidv4();

    this._state = new Staction<State, Actions>();

    // this.setAttribute('dnd-type', 'overlord');

    // sharedStateMap.set(this.id, new Staction<State, Actions>())

    // create instance of state, and somehow make sure its accessible to child
    // elements.
  }
}

customElements.define("dnd-overlord", DNDOverlord);

export default DNDOverlord;