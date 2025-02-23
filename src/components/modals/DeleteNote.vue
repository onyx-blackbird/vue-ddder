<script setup lang="ts">
import { ref, watch, type ModelRef } from 'vue';

import { VueFinalModal } from 'vue-final-modal';

import Note from '../../models/Note';
import { eventStormStore } from "../../store/EventStorm";
import useModal from '../../composables/useModal';

const model = defineModel<Note|null>();

const { showModal, closeModal } = useModal(model as ModelRef<Note|null>);
const title = ref('');
watch(model, (newNote) => {
	if (newNote != null) {
		showModal.value = true;
		title.value = newNote.getTranslation(eventStormStore.getState().currentLanguage)?.title || '';
	}
	showModal.value = newNote != null;
});

function deleteNote() {
	if (model.value != null) {
		eventStormStore.deleteNote(model.value);
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
				Do you really want to delete "{{ title }}""
			</p>
			<button @click="closeModal">Cancel</button>
			<button class="primary" @click="deleteNote">Confirm</button>
		</form>
	</vue-final-modal>
</template>
