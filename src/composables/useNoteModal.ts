import { ref, type Ref } from "vue";

import type Note from "../models/Note";
import { eventStormStore } from "../store/EventStorm";

export default function useNoteModal() {
	const showEditModal = ref(false);
	const showDeleteModal = ref(false);
	const currentNote: Ref<Note|null> = ref(null);
	const currentTitle = ref('');
	const currentDescription = ref('');

	function onChangeNote(note: Note) {
		currentNote.value = note;
		currentTitle.value = note.title;
		currentDescription.value = note.description;
		showEditModal.value = true;
	}

	function onSaveModal() {
		if (currentNote.value != null) {
			currentNote.value.title = currentTitle.value;
			currentNote.value.description = currentDescription.value;
		}
		currentNote.value = null;
		currentTitle.value = '';
		currentDescription.value = '';
		showEditModal.value = false;
	}

	function onDeleteNote(note: Note) {
		currentNote.value = note;
		showDeleteModal.value = true;
	}
	
	function deleteNote(): void {
		if (currentNote.value != null) {
			eventStormStore.deleteNote(currentNote.value);
		}
		currentNote.value = null;
		showDeleteModal.value = false;
	}

	return {
		currentNote,
		currentTitle,
		currentDescription,
		showDeleteModal,
		showEditModal,
		onChangeNote,
		onSaveModal,
		onDeleteNote,
		deleteNote,
	};
}
