// Order here matters!

import DNDContext from "./DNDContext";
import DNDDrag from './DNDDrag';
import DragContent from './DragContent';
import DraggingContent from './DraggingContent';
// import './DraggingPlaceholder';

import DropZone from './DropZone';

/*
  It's important to define the custom elements in the order
  that they are nested in the HTML.

  Also, defining them in the same file that declares the Class of
  the component leaves you at the mercy of import order, and can
  lead to weird errors.
*/

customElements.define("dnd-context", DNDContext);
customElements.define("dnd-drag", DNDDrag);
customElements.define("drag-content", DragContent);
customElements.define("dragging-content", DraggingContent);

// Drop related elements
customElements.define("drop-zone", DropZone);