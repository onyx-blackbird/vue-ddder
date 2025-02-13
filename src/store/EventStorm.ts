import Arrow from "../models/Arrow";
import Note from "../models/Note";
import { Size } from "../models/Layout";
import { Store } from "./Store";

interface EventStormState extends Object {
	snap: boolean;
	arrowColor: string;
	gridSize: Size;
	notes: Array<Note>;
	arrows: Array<Arrow>;
}

interface JsonModel {
	gridSize: any,
	snap: boolean,
	arrowColor: string,
	notes: Array<any>;
	arrows: Array<any>;
}

interface GlossaryModel {
	title: string,
	description: string,
}

const DEFAULT_SIZE = new Size(3000, 2000);

class EventStormStore extends Store<EventStormState> {

	constructor() {
		super({
			snap: true,
			arrowColor: '#000000',
			gridSize: DEFAULT_SIZE,
			notes: new Array<Note>(),
			arrows: new Array<Arrow>(),
		});
	}

	public setSnap(snap: boolean) {
		this.state.snap = snap;
	}

	public setArrowColor(arrowColor: string) {
		this.state.arrowColor = arrowColor;
	}

	public setGridSize(width: number, height: number) {
		this.state.gridSize.width = width;
		this.state.gridSize.height = height;
	}
	
	public addArrow(arrow: Arrow): void {
		this.state.arrows.push(arrow);
	}

	public deleteArrow(arrowToDelete: Arrow): void {
		const arrowIndex = this.state.arrows.findIndex(arrow => arrow.id === arrowToDelete.id);
		if (arrowIndex !== -1) {
			this.state.arrows.splice(arrowIndex, 1);
		}
	}
	
	public addNote(note: Note): void {
		this.state.notes.push(note);
	}

	public deleteNote(noteToDelete: Note): void {
		const noteIndex = this.state.notes.findIndex(note => note.id === noteToDelete.id);
		if (noteIndex !== -1) {
			this.state.notes.splice(noteIndex, 1);
			this.state.arrows.filter(arrow => arrow.startNoteId === noteToDelete.id || arrow.endNoteId === noteToDelete.id)
				.forEach(arrow => this.deleteArrow(arrow));
		}
	}

	public findNote(noteId: string): Note | undefined {
		return this.state.notes.find(note => note.id === noteId);
	}

	public export(): JsonModel {
		const notes = this.state.notes.map(note => note.toJsonObject());
		const arrows = this.state.arrows.map(arrow => arrow.toJsonObject());
		return {
			gridSize: {
				width: this.state.gridSize.width,
				height: this.state.gridSize.height
			},
			snap: this.state.snap,
			arrowColor: this.state.arrowColor,
			notes,
			arrows,
		};
	}

	public import(jsonModel: JsonModel): void {
		this.state.notes.splice(0);
		this.state.arrows.splice(0);
		this.setGridSize(jsonModel.gridSize.width, jsonModel.gridSize.height);
		this.setSnap(jsonModel.snap);
		this.setArrowColor(jsonModel.arrowColor);
		jsonModel.notes.forEach(note => this.addNote(Note.fromJsonObject(note)));
		jsonModel.arrows.forEach(arrow => this.addArrow(Arrow.fromJsonObject(arrow)));
	}

	public exportGlossary(): Array<GlossaryModel> {
		const glossary = new Array();
		this.state.notes.forEach(note => glossary.push({
			title: note.title,
			description: note.description
		}));
		return glossary;
	}

}

export const eventStormStore: EventStormStore = new EventStormStore();
