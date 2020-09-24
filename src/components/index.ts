import DragInteraction from './interactions/DragInteraction';
import DNDOverlord from 'dom-elements/DNDOverlord';
import DragWrapper from 'dom-elements/DragWrapper';
import DragContent from 'dom-elements/DragContent';
import DraggingContent from 'dom-elements/DraggingContent';
import DraggingPlaceholder from 'dom-elements/DraggingPlaceholder';

import DropZone from 'dom-elements/DropZone';

export type Components =
  | typeof DragInteraction
  | typeof DNDOverlord
  | typeof DragWrapper
  | typeof DragContent
  | typeof DraggingContent
  | typeof DraggingPlaceholder
  | typeof DropZone;