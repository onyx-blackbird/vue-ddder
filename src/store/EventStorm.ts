import Arrow from "../models/Arrow";
import Note from "../models/Note";
import { Size } from "../models/Layout";
import { Store } from "./Store";

interface EventStormState extends Object {
	snap: boolean;
	zoom: number;
	arrowColor: string;
	gridSize: Size;
	currentLanguage: string;
	languages: Array<string>;
	notes: Array<Note>;
	arrows: Array<Arrow>;
}

interface JsonModel {
	gridSize: any,
	snap: boolean,
	arrowColor: string,
	currentLanguage: string;
	languages: Array<string>;
	notes: Array<any>;
	arrows: Array<any>;
}

interface GlossaryModel {
	title: string,
	description: string,
}

const DEFAULT_SIZE = new Size(10000, 6000);
const DEFAULT_LANGUAGE = 'en';

class EventStormStore extends Store<EventStormState> {

	constructor() {
		super({
			snap: true,
			zoom: 100,
			arrowColor: '#000000',
			gridSize: DEFAULT_SIZE,
			currentLanguage: DEFAULT_LANGUAGE,
			languages: [DEFAULT_LANGUAGE],
			notes: new Array<Note>(),
			arrows: new Array<Arrow>(),
		});
	}

	public setSnap(snap: boolean) {
		this.state.snap = snap;
	}

	public setZoom(zoom: number) {
		this.state.zoom = zoom;
	}

	public getZoomFactor(): number {
		return this.state.zoom / 100;
	}

	public setArrowColor(arrowColor: string) {
		this.state.arrowColor = arrowColor;
	}

	public setGridSize(width: number, height: number) {
		this.state.gridSize.width = width;
		this.state.gridSize.height = height;
	}

	public setLanguage(language: string) {
		this.state.currentLanguage = language;
	}

	public setLanguages(languages: Array<string>) {
		this.state.languages = languages;
		if (!this.state.languages.includes(this.state.currentLanguage)) {
			this.state.currentLanguage = this.state.languages[0];
		}
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

	public findArrow(arrowId: string): Arrow | undefined {
		return this.state.arrows.find(arrow => arrow.id === arrowId);
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
			currentLanguage: this.state.currentLanguage,
			languages: this.state.languages,
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
		this.setLanguage(jsonModel.currentLanguage);
		this.state.languages = jsonModel.languages;
		jsonModel.notes.forEach(note => this.addNote(Note.fromJsonObject(note)));
		jsonModel.arrows.forEach(arrow => this.addArrow(Arrow.fromJsonObject(arrow)));
	}

	public exportGlossary(): Map<string, Array<GlossaryModel>> {
		const glossary = new Map<string, Array<GlossaryModel>>();
		this.state.languages.forEach(language => glossary.set(language, []));
		this.state.notes.forEach(note => {
			note.translations.forEach((translation, language) => {
				glossary.get(language)!.push({
					title: translation.title,
					description: translation.description || '',
				});
			});
		});
		return glossary;
	}

}

export const eventStormStore: EventStormStore = new EventStormStore();
