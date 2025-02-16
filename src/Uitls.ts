export const OFFSET_X = 200;
export const GRID_SIZE = 20;
export const TRANSFER_FORMAT = 'application/json';
export const COPY_EFFECT = 'copy';
export const MOVE_EFFECT = 'move';

export interface MoveData {
	noteId: string,
	x: number,
	y: number,
}

export function debounce<T extends Function>(cb: T, wait = 300){
	let timer = 0;
	return (...args: any) => {
		clearTimeout(timer);
		timer = setTimeout(() => cb(...args), wait);
	};
}
