import { Component } from '@brochington/ecstatic';
import { Components } from '../index';

interface DragInteractionStorage {
  element: HTMLElement;
  initialized: boolean;
}

class DragInteraction extends Component<Components, DragInteractionStorage> {
  type = Components.DragInteraction;

  constructor(storage: DragInteractionStorage) {
    super(storage);
    // this.storage = storage;
  }
}

export default DragInteraction;
