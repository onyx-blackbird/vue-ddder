import { generateUniqueId } from "../Uitls";
import { Coordinates } from "./Layout";

export default class Arrow {

	private _id: string;
	private _start: Coordinates;
	private _end: Coordinates;

	constructor(start: Coordinates, end: Coordinates) {
		this._id = generateUniqueId();
		this._start = start;
		this._end = end;
	}

	get id() {
		return this._id;
	}

	private set id(id: string) {
		this._id = id;
	}

	get start() {
		return this._start;
	}

	set start(start: Coordinates) {
		this._start = start;
	}

	get end() {
		return this._end;
	}

	set end(end: Coordinates) {
		this._end = end;
	}

	get style(): any {
		const length = this.calculateLength();
		const angle = this.calculateAngle();
		return {
			left: this.start.x + 'px',
			top: this.start.y + 'px',
			width: (length-10) + 'px',
			transform: `rotate(${angle}deg)`
		};
	}

	public toJsonObject(): Object {
		return {
			id: this._id,
			start: {
				x: this._start.x,
				y: this._start.y
			},
			end: {
				x: this._end.x,
				y: this._end.y
			},
		}
	}

	public static fromJsonObject(jsonArrow: Arrow): Arrow {
		const note = new Arrow(jsonArrow.start, jsonArrow.end);
		note.id = jsonArrow.id;
		return note;
	}

	private calculateAngle(): number {
		return Math.atan2(this._start.y - this._end.y, this._start.x - this._end.x) * 180 / Math.PI + 180;
	}

	private calculateLength(): number {
		return Math.round(Math.sqrt(Math.pow(this._start.y - this._end.y, 2) + Math.pow(this._start.x - this._end.x, 2)));
	}

}
