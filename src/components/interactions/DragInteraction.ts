interface Args {
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
  offsetLeft: number;
  offsetTop: number;
  clientX: number;
  clientY: number;
}

class DragInteraction {
  x = 0;
  y = 0;
  offsetX = 0;
  offsetY = 0;
  offsetLeft = 0;
  offsetTop = 0;
  clientX = 0;
  clientY = 0;
  initialRect = new DOMRect();
  initialGhostRect = new DOMRect();
  initialized = false;

  constructor(args: Args) {
    this.x = args.x;
    this.y = args.y;
    this.offsetX = args.offsetX;
    this.offsetY = args.offsetY;
    this.offsetLeft = args.offsetLeft;
    this.offsetTop = args.offsetTop;
    this.clientX = args.clientX;
    this.clientY = args.clientY;
  }
}

export default DragInteraction;
