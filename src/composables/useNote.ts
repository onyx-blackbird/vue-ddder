import Note from "../models/Note";
import { eventStormStore } from "../store/EventStorm";
import { COPY_EFFECT, GRID_SIZE, MOVE_EFFECT, TRANSFER_FORMAT, type MoveData } from "../Uitls";

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
			};
			evt.dataTransfer.setData(TRANSFER_FORMAT, JSON.stringify(dragData));
		}
	}

	function onNewNoteDrop(evt: DragEvent): void {
		if (evt.dataTransfer && evt.dataTransfer.effectAllowed === COPY_EFFECT) {
			const dragData: DragData = JSON.parse(evt.dataTransfer.getData(TRANSFER_FORMAT));
			const targetRect = (evt.currentTarget as HTMLElement).getBoundingClientRect();
			let x = Math.max(0, evt.pageX - dragData.x * eventStormStore.getZoomFactor() - targetRect.left) / eventStormStore.getZoomFactor();
			let y = Math.max(0, evt.pageY - dragData.y * eventStormStore.getZoomFactor() - targetRect.top) / eventStormStore.getZoomFactor();
			if (eventStormStore.getState().snap) {
				x = Math.ceil(x / GRID_SIZE) * GRID_SIZE;
				y = Math.ceil(y / GRID_SIZE) * GRID_SIZE;
			}
			const note = new Note(dragData.type, dragData.title, x, y);
			eventStormStore.addNote(note);
		}
	}

	function onDragNoteStart(evt: DragEvent, note: Note): void {
		if (evt.dataTransfer && evt.target instanceof HTMLElement) {
			evt.dataTransfer.dropEffect = MOVE_EFFECT;
			evt.dataTransfer.effectAllowed = MOVE_EFFECT;
			const dragData: MoveData = {
				noteId: note.id,
				x: evt.pageX - evt.target.offsetLeft * eventStormStore.getZoomFactor(),
				y: evt.pageY - evt.target.offsetTop * eventStormStore.getZoomFactor(),
			};
			evt.dataTransfer.setData(TRANSFER_FORMAT, JSON.stringify(dragData));
		}
	}
	
	function onDropNote(evt: DragEvent): void {
		if (evt.dataTransfer && evt.dataTransfer.effectAllowed === MOVE_EFFECT) {
			const moveData: MoveData = JSON.parse(evt.dataTransfer.getData(TRANSFER_FORMAT));
			let x = Math.max(0, evt.pageX - moveData.x) / eventStormStore.getZoomFactor();
			let y = Math.max(0, evt.pageY - moveData.y) / eventStormStore.getZoomFactor();
			console.dir({
				moveData,
				pageX: evt.pageX,
				pageY: evt.pageY,
			});
			if (eventStormStore.getState().snap) {
				x = Math.ceil(x / GRID_SIZE) * GRID_SIZE;
				y = Math.ceil(y / GRID_SIZE) * GRID_SIZE;
			}
			const note = eventStormStore.getState().notes.find(note => note.id === moveData.noteId);
			note?.move(x, y);
		}
	}

	return {
		onNewNoteDragStart,
		onNewNoteDrop,
		onDragNoteStart,
		onDropNote,
	};

}
