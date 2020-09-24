class DraggingContent extends HTMLElement {
  constructor() {
    super();

    this.style.display = 'none';
  }
}

customElements.define("dragging-content", DraggingContent);

export default DraggingContent;
