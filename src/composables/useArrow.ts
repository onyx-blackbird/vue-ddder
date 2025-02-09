import { ref, type Ref } from "vue";

import { OFFSET_X } from "../Uitls";
import { eventStormStore } from "../store/EventStorm";
import Arrow from "../models/Arrow";
import type Note from "../models/Note";

function findNote(evt: MouseEvent): Note | undefined {
	const mouseX = evt.clientX - OFFSET_X;
	return eventStormStore.getState().notes.find(note => 
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
		const endNote = findNote(evt);
		if (endNote && startNote.value != null && endNote != startNote.value) {
			const arrow = new Arrow(startNote.value.id, endNote.id);
			eventStormStore.addArrow(arrow);
		}
		startNote.value = null;
	}

	return {
		onMouseDown,
		onMouseUp,
	};

}
