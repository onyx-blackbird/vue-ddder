# Domain Driven Designer

This app is meant to help to digitize event storming outcomes to support developers in DDD.  

## Links
- [Live Demo](http://ddder.the-blackbird.com/)
- [Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design)
- [Event Storming](https://www.eventstorming.com/)

## Features
- With the initial version you can place notes on a grid.
- You can move and resize the notes.
- You can draw arrows between two notes (only from left to right).
- This "layout" can be exported as JSON and imported again, as there is currently no persistence.
- You can export a glossary based on the notes title and description as either JSON or Markdown.

### Known Issues
-  Moving notes when zoomed in or our is not very precise, set to 100% for a better experience.

## Roadmap
This version is still a beta and may have a few bugs. The goal is to add additional features over time.

### Event Storm Screen
- Allow arrows to be drawn in any direction.
- Allos arrows to be deleted indepenently from notes.

### UML Screen
- A second screen where the actual models can be defined in an UML like manner.
- Allow to annotate arrows.
