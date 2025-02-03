import { generateUniqueId } from "../Uitls";
import { Coordinates, Size } from "./Layout";

export const SIZE = 140;

export default class Note {

	private _id: string;
	private _type: string;
	private _title: string = '';
	private _coordinates: Coordinates;
	private _size: Size;

	constructor(type: string, title: string, x: number, y: number) {
		this._id = generateUniqueId();
		this._title = title;
		this._type = type;
		this._coordinates = new Coordinates(x, y);
		this._size = new Size(SIZE, SIZE);
		this._title = title;
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

	get title() {
		return this._title;
	}

	set title(title) {
		this._title = title;
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
			height: this.size.height + 'px',
		};
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
			title: this._title,
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
		const note = new Note(jsonNote.type, jsonNote.title, jsonNote.coordinates.x, jsonNote.coordinates.y);
		note.id = jsonNote.id;
		note.resize(jsonNote.size.width, jsonNote.size.height);
		return note;
	}

}

export const NOTE_TYPES: Array<Note> = [
	new Note('event', 'Event', 0, 0),
	new Note('command', 'Command', 0, 0),
	new Note('policy', 'Policy', 0, 0),
	new Note('external', 'External System', 0, 0),
	new Note('actor', 'Actor', 0, 0),
	new Note('object', 'Object', 0, 0),
	new Note('view', 'View', 0, 0),
	new Note('openissue', 'Open Issue', 0, 0),
	new Note('comment', 'Comment', 0, 0),
];
