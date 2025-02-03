import { ref, type Ref } from "vue";

import { OFFSET_X } from "../Uitls";
import type Note from "../models/Note";
import { appStore } from "../store/App";
import { Coordinates } from "../models/Layout";
import Arrow from "../models/Arrow";

function findNote(evt: MouseEvent): Note | undefined {
	const mouseX = evt.clientX - OFFSET_X;
	return appStore.getState().notes.find(note => 
		note.coordinates.x < mouseX && note.coordinates.x + note.size.width > mouseX &&
		note.coordinates.y < evt.clientY && note.coordinates.y + note.size.height > evt.clientY
	);
}

export default function useArrow() {

	const startNote: Ref<Note|null> = ref(null);

	function onMouseDown(evt: MouseEvent): void {
		const note = findNote(evt);
		if (note) {
			startNote.value = note;
		}
	}

	function onMouseUp(evt: MouseEvent): void {
		const note = findNote(evt);
		if (note && startNote.value != null) {
			const startX = startNote.value.coordinates.x + startNote.value.size.width;
			const startY = startNote.value.coordinates.y + startNote.value.size.height / 2;
			const start = new Coordinates(startX, startY);
			const endX = note.coordinates.x;
			const endY = note.coordinates.y + note.size.height / 2;
			const end = new Coordinates(endX, endY);
			const arrow = new Arrow(start, end);
			appStore.addArrow(arrow);
		}
		startNote.value = null;
	}

	return {
		onMouseDown,
		onMouseUp,
	};

}
