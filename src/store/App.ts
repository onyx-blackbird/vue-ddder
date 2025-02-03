import type Arrow from "../models/Arrow";
import type Note from "../models/Note";
import { Size } from "../models/Layout";
import { Store } from "./Store";

interface AppState extends Object {
	snap: boolean;
	gridSize: Size;
	notes: Array<Note>;
	arrows: Array<Arrow>;
}

const DEFAULT_SIZE = new Size(3000, 2000);

class AppStore extends Store<AppState> {

	constructor() {
		super({
			snap: true,
			gridSize: DEFAULT_SIZE,
			notes: new Array<Note>(),
			arrows: new Array<Arrow>(),
		});
	}

	public setSnap(snap: boolean) {
		this.state.snap = snap;
	}

	public setGridSize(width: number, height: number) {
		this.state.gridSize.width = width;
		this.state.gridSize.height = height;
	}
	
	public addArrow(arrow: Arrow): void {
		this.state.arrows.push(arrow);
	}
	
	public addNote(note: Note): void {
		this.state.notes.push(note);
	}

	public clear(): void {
		this.state.notes.splice(0);
		this.state.arrows.splice(0);
	}

}

export const appStore: AppStore = new AppStore();
