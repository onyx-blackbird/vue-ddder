export class Coordinates {
	private _x: number;
	private _y: number;

	constructor(x: number, y: number) {
		this._x = x;
		this._y = y;
	}

	get x() {
		return this._x;
	}

	set x(x:number) {
		this._x = x;
	}

	get y() {
		return this._y;
	}

	set y(y:number) {
		this._y = y;
	}
}

export class Size {
	private _width: number;
	private _height: number;

	constructor(width: number, height: number) {
		this._width = width;
		this._height = height;
	}

	get width() {
		return this._width;
	}

	set width(width:number) {
		this._width = width;
	}

	get height() {
		return this._height;
	}

	set height(height:number) {
		this._height = height;
	}
}
