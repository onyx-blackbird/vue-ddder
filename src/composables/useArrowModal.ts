import { computed, ref, type Ref } from "vue";

import type Arrow from "../models/Arrow";
import { eventStormStore } from "../store/EventStorm";

export default function useArrowModal() {
	const showDeleteArrowModal = ref(false);
	const currentArrow: Ref<Arrow|null> = ref(null);

	const currentArrowInfo = computed(() => {
		if (currentArrow.value != null) {
			const startNote = eventStormStore.findNote(currentArrow.value.startNoteId);
			const endNote = eventStormStore.findNote(currentArrow.value.endNoteId);
			if (startNote && endNote) {
				return `"${startNote.title}" and "${endNote.title}"`;
			}
		}
	});

	function onDeleteArrow(arrow: Arrow) {
		currentArrow.value = arrow;
		showDeleteArrowModal.value = true;
	}
	
	function deleteArrow(): void {
		if (currentArrow.value != null) {
			eventStormStore.deleteArrow(currentArrow.value);
		}
		currentArrow.value = null;
		showDeleteArrowModal.value = false;
	}

	return {
		currentArrow,
		currentArrowInfo,
		showDeleteArrowModal,
		onDeleteArrow,
		deleteArrow,
	};
}
