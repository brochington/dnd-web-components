TODO: 
- Drop Zone
  - Dropping Content
  - Dropped Content(?)
- Dragging Content
- Dragging Placeholder
- Sorting
- "Infinitity Drag"
  - basically support for a factory of Drag Content type things.


Events:
- https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
- events should be added to with `element.addEventListener` 



Component names: 
- Should they all have the prefix `dnd-`

Drag
  - `dnd-drag`
  - `dnd-dragging`
  - `dnd-dragged`

Drop
  - `dnd-drop`
  - `dnd-dropping`
  - `dnd-dropped`


Have a global context as default, but able to add a `dnd-context` if needed
to keep everything it's it's own "scope".

Drag and Drop on Safari:
https://developer.apple.com/library/archive/documentation/AppleApplications/Conceptual/SafariJSProgTopics/DragAndDrop.html