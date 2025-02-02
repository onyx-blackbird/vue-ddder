import { Size } from "../models/Layout";
import { Store } from "./Store";

interface AppState extends Object {
	snap: boolean;
	gridSize: Size;
}

const DEFAULT_SIZE = new Size(3000, 2000);

class AppStore extends Store<AppState> {

	constructor() {
		super({
			snap: true,
			gridSize: DEFAULT_SIZE,
		});
	}

	public setSnap(snap: boolean) {
		this.state.snap = snap;
	}

	public setGridSize(width: number, height: number) {
		this.state.gridSize.width = width;
		this.state.gridSize.height = height;
	}

}

export const appStore: AppStore = new AppStore();
