// Order here matters!

import DNDOverlord from './DNDOverlord';
import DragWrapper from './DragWrapper';
import DragContent from './DragContent';
// import './DraggingContent';
// import './DraggingPlaceholder';

import DropZone from './DropZone';

/*
  It's important to define the custom elements in the order
  that they are nested in the HTML.

  Also, defining them in the same file that declares the Class of
  the component leaves you at the mercy of import order, and can
  lead to weird errors.
*/

customElements.define("dnd-overlord", DNDOverlord);
customElements.define("drag-wrapper", DragWrapper);
customElements.define("drag-content", DragContent);

// Drop related elements
customElements.define("drop-zone", DropZone);