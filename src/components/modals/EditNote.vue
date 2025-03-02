<script setup lang="ts">
import { computed, ref, watch, type ModelRef, type Ref } from 'vue';

import { VueFinalModal } from 'vue-final-modal';

import { unrefMap } from '../../Uitls';
import Note, { type Translation } from '../../models/Note';
import useModal from '../../composables/useModal';
import { eventStormStore } from '../../store/EventStorm';

const model = defineModel<Note|null>();
const languages = computed(() => eventStormStore.getState().languages);
const { showModal, closeModal } = useModal(model as ModelRef<Note|null>);
const translationsRef: Ref<Array<Translation>> = ref([]);
	
watch(model, (newNote) => {
	if (newNote != null) {
		translationsRef.value = [];
		const translations = unrefMap(newNote.translations);
		languages.value.forEach(language => {
			const translation = translations.get(language) || {title: '', description: ''};
			translationsRef.value.push(translation);
		})
		showModal.value = true;
	}
});


function onSave() {
	if (model.value != null) {
		languages.value.forEach((language, index) => {
			const translation = translationsRef.value[index];
			model.value!.translations.set(language, translation);
		});
	}
	translationsRef.value = [];
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
			<div class="editor-modal-scroll">
				<fieldset v-for="(language, index) in languages" :key="index">
					<legend>{{ language }}</legend>
					<p>
						<label :for="`title_${index}`">Title </label>
						<input type="string" :id="`title_${index}`" v-model="translationsRef[index].title">
					</p>
					<p>
						<label :for="`description_${index}`">Description </label>
						<textarea :id="`description_${index}`" v-model="translationsRef[index].description"></textarea>
					</p>
				</fieldset>
			</div>
			<button @click="closeModal">Cancel</button>
			<button class="primary" @click="onSave">Save</button>
		</form>
	</vue-final-modal>
</template>
