import seedrandom from 'seedrandom';

const RNG = seedrandom();
const IDS = new Array<string>();

export const OFFSET_X = 200;
export const GRID_SIZE = 20;
export const TRANSFER_TYPE = 'applicaiton/json';
export const COPY_EFFECT = 'copy';
export const MOVE_EFFECT = 'move';

export interface MoveData {
	noteId: string,
	x: number,
	y: number,
}

export function generateUniqueId(): string {
	let random: string = RNG().toString(36).substring(2, 18);
	if (IDS.find((id) => id === random)) {
		random = generateUniqueId();
	}
	return random;
}

export function debounce<T extends Function>(cb: T, wait = 300){
	let timer = 0;
	return (...args: any) => {
		clearTimeout(timer);
		timer = setTimeout(() => cb(...args), wait);
	};
}
