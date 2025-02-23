<script setup lang="ts">
import { watch, type ModelRef } from 'vue';

import { VueFinalModal } from 'vue-final-modal';

import Note from '../../models/Note';
import { eventStormStore } from "../../store/EventStorm";
import useModal from '../../composables/useModal';

const model = defineModel<Note|null>();

const { showModal, closeModal } = useModal(model as ModelRef<Note|null>);

watch(model, (newNote) => {
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
				Do you really want to delete "{{model!.title}}""
			</p>
			<button @click="closeModal">Cancel</button>
			<button class="primary" @click="deleteNote">Confirm</button>
		</form>
	</vue-final-modal>
</template>
