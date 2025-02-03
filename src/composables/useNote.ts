import Note from "../models/Note";
import { appStore } from "../store/App";
import { COPY_EFFECT, GRID_SIZE, MOVE_EFFECT, OFFSET_X, TRANSFER_TYPE, type MoveData } from "../Uitls";

interface DragData {
	type: string,
	title: string,
	x: number,
	y: number,
}

export default function useNote() {

	function onNewNoteDragStart(evt: DragEvent, note: Note): void {
		if (evt.dataTransfer && evt.target instanceof HTMLElement) {
			evt.dataTransfer.dropEffect = COPY_EFFECT;
			evt.dataTransfer.effectAllowed = COPY_EFFECT;
			const dragData: DragData = {
				type: note.type,
				title: note.title,
				x: evt.pageX - evt.target.offsetLeft,
				y: evt.pageY - evt.target.offsetTop,
			}
			evt.dataTransfer.setData(TRANSFER_TYPE, JSON.stringify(dragData));
		}
	}

	function onNewNoteDrop(evt: DragEvent): void {
		if (evt.dataTransfer && evt.dataTransfer.effectAllowed === COPY_EFFECT) {
			const dragData: DragData = JSON.parse(evt.dataTransfer.getData(TRANSFER_TYPE));
			let x = Math.max(0, evt.pageX - dragData.x - OFFSET_X);
			let y = Math.max(0, evt.pageY - dragData.y);
			if (appStore.getState().snap) {
				x = Math.ceil(x / GRID_SIZE) * GRID_SIZE;
				y = Math.ceil(y / GRID_SIZE) * GRID_SIZE;
			}
			const note = new Note(dragData.type, dragData.title, x, y);
			appStore.addNote(note);
		}
	}

	function onDragNoteStart(evt: DragEvent, note: Note): void {
		if (evt.dataTransfer && evt.target instanceof HTMLElement) {
			evt.dataTransfer.dropEffect = MOVE_EFFECT;
			evt.dataTransfer.effectAllowed = MOVE_EFFECT;
			const dragData: MoveData = {
				noteId: note.id,
				x: evt.pageX - evt.target.offsetLeft,
				y: evt.pageY - evt.target.offsetTop,
			}
			evt.dataTransfer.setData(TRANSFER_TYPE, JSON.stringify(dragData));
		}
	}
	
	function onDropNote(evt: DragEvent): void {
		if (evt.dataTransfer) {
			const moveData: MoveData = JSON.parse(evt.dataTransfer.getData(TRANSFER_TYPE));
			let x = Math.max(0, evt.pageX - moveData.x);
			let y = Math.max(0, evt.pageY - moveData.y);
			if (appStore.getState().snap) {
				x = Math.ceil(x / GRID_SIZE) * GRID_SIZE;
				y = Math.ceil(y / GRID_SIZE) * GRID_SIZE;
			}
			const note = appStore.getState().notes.find(note => note.id === moveData.noteId);
			note?.move(x, y);
		}
	}

	function onNoteChanged(note: Note, newTitle: string): void {
		note.title = newTitle;
	}

	return {
		onNewNoteDragStart,
		onNewNoteDrop,
		onDragNoteStart,
		onDropNote,
		onNoteChanged,
	};

}
