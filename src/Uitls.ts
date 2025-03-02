import { unref } from 'vue';

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

export function unrefMap<T extends Object>(sourceMap: Map<string, T>): Map<string, T> {
	const plainMap = new Map<string, T>();
	sourceMap.forEach((value, key) => {
		const valueUnref: T = Object.keys(value).reduce((acc, key) => {
			acc[key as keyof typeof acc] = unref(value[key as keyof typeof acc]);
			return acc;
		}, {} as T);
		plainMap.set(unref(key), valueUnref);
	});
	return plainMap;
}

export function replaceNewline(input: string | undefined): string {
	return input ? input.replace('\n', '<br>') : '';
}
