# Domain Driven Designer

This app is meant to help to digitize event storming outcomes to support developers in DDD.  

## Links
- [Live Demo](http://ddder.the-blackbird.com/)
- [Domain Driven Design](https://www.domainlanguage.com/)
- [Event Storming](https://www.eventstorming.com/)


## Manual

### Options
The size of the grid can be adjusted with the input fields on the right side.
Per default the notes snap to the grid, this can be disabled by unchecking the corresponding checkbox.

### Notes
Drag notes from the left side to the grid in the middle. Double click on the title to edit it or use the edit button to also provide a description.
You can drag the notes around once placed and with the handle on the lower right corner the size can be adjusted.
The grid itself can be moved with left and right click drag.

### Arrows
Right clicking on the source and then release the mouse button on the target note to draw an arrow between them.


## Changelog
The initial version can only place cards on a grid and resize them and draw arrows in between (only from left to right).
This "layout" can be exported as JSON and imported again, as there is currently no persistence.

## Roadmap
This version is still a beta and may have a few bugs. The goal is to add additional features over time.

### UML Screen
- A second screen where the actual models can be defined in an UML like manner.
- Allow to annotate arrows
