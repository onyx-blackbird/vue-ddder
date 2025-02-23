<script setup lang="ts">
import { ref, watch, type ModelRef } from 'vue';

import { VueFinalModal } from 'vue-final-modal';

import Note from '../../models/Note';
import useModal from '../../composables/useModal';

const model = defineModel<Note|null>();

const { showModal, closeModal } = useModal(model as ModelRef<Note|null>);
const currentTitle = ref('');
const currentDescription = ref('');

watch(model, (newNote) => {
	if (newNote != null) {
		currentTitle.value = newNote.title;
		currentDescription.value = newNote.description;
		showModal.value = true;
	}
});

function onSaveNoteModal() {
	if (model.value != null) {
		model.value.title = currentTitle.value;
		model.value.description = currentDescription.value;
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
				<label for="title">Title </label>
				<input type="string" id="title" v-model="currentTitle">
			</p>
			<p>
				<label for="description">Description </label>
				<textarea id="description" v-model="currentDescription"></textarea>
			</p>
			<button @click="closeModal">Cancel</button>
			<button class="primary" @click="onSaveNoteModal">Save</button>
		</form>
	</vue-final-modal>
</template>
