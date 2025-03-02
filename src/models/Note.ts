import { v6 as uuidv6 } from 'uuid';
import { Coordinates, Size } from "./Layout";

export const SIZE = 140;

export const CHANGE_NOTE = 'change-note';
export const DELETE_NOTE = 'delete-note';

export interface Translation {
	title: string;
	description?: string;
}

export interface NoteTemplate {
	type: string;
	title: string;
}

export default class Note {

	private _id: string;
	private _type: string;
	private _translations: Map<string, Translation> = new Map();
	private _coordinates: Coordinates;
	private _size: Size;

	constructor(type: string, x: number, y: number) {
		this._id = uuidv6();
		this._type = type;
		this._coordinates = new Coordinates(x, y);
		this._size = new Size(SIZE, SIZE);
	}

	get id() {
		return this._id;
	}

	private set id(id: string) {
		this._id = id;
	}

	get type() {
		return this._type;
	}

	get translations() {
		return this._translations;
	}

	set translations(translation: Map<string, Translation>) {
		this._translations = translation;
	}

	get coordinates() {
		return this._coordinates;
	}

	get size() {
		return this._size;
	}

	get style(): any {
		return {
			left: this._coordinates.x + 'px',
			top: this._coordinates.y + 'px',
			width: this._size.width + 'px',
			height: this._size.height + 'px',
		};
	}

	public getTranslation(language: string): Translation|undefined {
		return this._translations.get(language);
	}

	public setTitle(language: string, title: string): void {
		this._translations.set(language, {
			title,
			description: this._translations.get(language)?.description
		});
	}

	public setDescription(language: string, description: string): void {
		this._translations.set(language, {
			title: this._translations.get(language)!.title,
			description
		});
	}

	public move(x: number, y: number): void {
		this._coordinates.x = x;
		this._coordinates.y = y;
	}

	public resize(width: number, height: number): void {
		this._size.width = width;
		this._size.height = height;
	}

	public toJsonObject(): Object {
		return {
			id: this._id,
			type: this._type,
			translations: Object.fromEntries(this._translations),
			coordinates: {
				x: this._coordinates.x,
				y: this._coordinates.y
			},
			size: {
				width: this._size.width,
				height: this._size.height
			}
		}
	}

	public static fromJsonObject(jsonNote: Note): Note {
		const note = new Note(jsonNote.type, jsonNote.coordinates.x, jsonNote.coordinates.y);
		note.id = jsonNote.id;
		const translations: Map<string, Translation> = new Map(Object.entries(jsonNote.translations));
		translations.forEach((translation, language) => note._translations.set(language, translation));
		note.resize(jsonNote.size.width, jsonNote.size.height);
		return note;
	}

}

export const NOTE_TYPES: Array<NoteTemplate> = [
	{type: 'event', title: 'Event'},
	{type: 'command', title: 'Command'},
	{type: 'policy', title: 'Policy'},
	{type: 'external', title: 'External System'},
	{type: 'actor', title: 'Actor'},
	{type: 'object', title: 'Object'},
	{type: 'view', title: 'View'},
	{type: 'openissue', title: 'Open Issue'},
	{type: 'comment', title: 'Comment'},
];
