import DNDOverlord from 'dom-elements/DNDOverlord';
import DragWrapper from 'dom-elements/DragWrapper';
import { getWorld } from 'utils/elements';

class DraggingPlaceholder extends HTMLElement {
  constructor() {
    super();

    getWorld(this).locate(DragWrapper)?.add(this);
  }

  disconnectedCallback() {
    getWorld(this).locate(DragWrapper)?.remove(DraggingPlaceholder);
  }
}

customElements.define("dragging-placeholder", DraggingPlaceholder);

export default DraggingPlaceholder;
