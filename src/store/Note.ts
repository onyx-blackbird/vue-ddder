import { Store } from "./Store";
import Note from "../models/Note";

interface NoteState extends Object {
	notes: Array<Note>;
}

class NoteStore extends Store<NoteState> {

	constructor() {
		super({
			notes: new Array<Note>(),
		});
	}

	public addNote(note: Note): void {
		this.state.notes.push(note);
	}

	public clear(): void {
		this.state.notes.splice(0);
	}
}

export const noteStore: NoteStore = new NoteStore();
