import { generateUniqueId } from "../Uitls";

export default class Arrow {

	private _id: string;
	private _startNoteId: string;
	private _endNoteId: string;

	constructor(startNoteId: string, endNoteId: string) {
		this._id = generateUniqueId();
		this._startNoteId = startNoteId;
		this._endNoteId = endNoteId;
	}

	get id() {
		return this._id;
	}

	private set id(id: string) {
		this._id = id;
	}

	get startNoteId() {
		return this._startNoteId;
	}

	get endNoteId() {
		return this._endNoteId;
	}

	public toJsonObject(): Object {
		return {
			id: this._id,
			startNoteId: this._startNoteId,
			endNoteId: this._endNoteId,
		}
	}

	public static fromJsonObject(jsonArrow: Arrow): Arrow {
		const note = new Arrow(jsonArrow.startNoteId, jsonArrow.endNoteId);
		note.id = jsonArrow.id;
		return note;
	}

}
