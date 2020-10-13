import DragWrapper from "dom-elements/DragWrapper";

class DraggingContent extends HTMLElement {
  constructor() {
    super();

    this.style.display = 'none';

    const dragWrapper = this.closest<DragWrapper>("drag-wrapper");

    if (dragWrapper) {
      dragWrapper.entity.add(this);
    }
  }
}

export default DraggingContent;
