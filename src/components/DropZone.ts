class DropZone extends HTMLElement {
  constructor() {
    super();

    console.log('drop-zone!!');
  }
}

customElements.define("drop-zone", DropZone);
