class DragContent extends HTMLElement {
  constructor() {
    super();

    this.addEventListener("pointerdown", this.onPointerDown);
  }

  onPointerDown(evt: PointerEvent) {
    this.style.position = 'absolute';
    this.style.left = `${evt.x}px`;
    this.style.top = `${evt.y}px`;

    document.addEventListener('pointermove', this.onPointerMove);
    this.addEventListener('pointerup', this.onPointerUp);

  }

  onPointerMove(evt: PointerEvent) {
    this.style.left = `${evt.x}px`;
    this.style.top = `${evt.y}px`;
  }

  onPointerUp(evt: PointerEvent) {
    document.removeEventListener("pointermove", this.onPointerMove);
  }

  disconnectedCallback() {
    this.removeEventListener('pointerdown', this.onPointerDown);
  }
}

customElements.define('drag-content', DragContent);