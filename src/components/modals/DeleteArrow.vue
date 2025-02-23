<script setup lang="ts">
import { ref, watch, type ModelRef } from 'vue';

import { VueFinalModal } from 'vue-final-modal';

import type Arrow from '../../models/Arrow';
import { eventStormStore } from "../../store/EventStorm";
import useModal from '../../composables/useModal';

const model = defineModel<Arrow|null>();

const { showModal, closeModal } = useModal(model as ModelRef<Arrow|null>);

const currentArrowInfo = ref('');
watch(model, (newArrow) => {
	if (newArrow != null) {
		const startNote = eventStormStore.findNote(newArrow.startNoteId);
		const endNote = eventStormStore.findNote(newArrow.endNoteId);
		if (startNote && endNote) {
			const startTitle = startNote.getTranslation(eventStormStore.getState().currentLanguage)?.title;
			const endTitle = endNote.getTranslation(eventStormStore.getState().currentLanguage)?.title;
			currentArrowInfo.value = `"${startTitle}" and "${endTitle}"`;
		}
		showModal.value = true;
	}
});

function deleteArrow() {
	if (model.value != null) {
		eventStormStore.deleteArrow(model.value);
	}
	closeModal();
}
</script>

<template>
	<vue-final-modal v-model="showModal"
		class="editor-modal"
		content-class="editor-modal-content"
		overlay-transition="vfm-fade"
		content-transition="vfm-fade"
		@closed="closeModal">
		<form @submit.prevent>
			<p>
				Do you really want to delete the arrow between {{ currentArrowInfo }}
			</p>
			<button @click="closeModal">Cancel</button>
			<button class="primary" @click="deleteArrow">Confirm</button>
		</form>
	</vue-final-modal>
</template>
