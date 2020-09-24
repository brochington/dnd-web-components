interface Args {
  offsetX: number;
  offsetY: number;
  offsetLeft: number;
  offsetTop: number;
}

class DragInteraction {
  offsetX = 0;
  offsetY = 0;
  offsetLeft = 0;
  offsetTop = 0;
  initialized = false;

  constructor(args: Args) {
    this.offsetX = args.offsetX;
    this.offsetY = args.offsetY;
    this.offsetLeft = args.offsetLeft;
    this.offsetTop = args.offsetTop;
  }
}

export default DragInteraction;
