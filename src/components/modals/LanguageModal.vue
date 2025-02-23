<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';

import { VueFinalModal } from 'vue-final-modal';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { eventStormStore } from "../../store/EventStorm";

const model = defineModel({required: true, default: false});
const languages: Ref<Array<string>> = ref([]);
const newLanguage = ref('');

watch(
	eventStormStore.getState().languages,
	(newLanguages) => {
		newLanguages.forEach(language => languages.value.push(language))
	},
	{ immediate: true }
);	

function onRemoveLanguage(index: number) {
	languages.value.splice(index, 1);
}
function onAddLanguage() {
	if (newLanguage.value !== '' && !languages.value.includes(newLanguage.value)) {
		languages.value.push(newLanguage.value);
	}
	newLanguage.value = '';
}
function onSave() {
	onAddLanguage();
	eventStormStore.setLanguages(languages.value);
	model.value = false;
}
</script>

<template>
	<vue-final-modal v-model="model"
		class="editor-modal"
		content-class="editor-modal-content"
		overlay-transition="vfm-fade"
		content-transition="vfm-fade">
		<h2>Languages</h2>
		<form @submit.prevent>
			<div class="language" v-for="(_lang, index) in languages" :key="index">
				<input type="text" v-model="languages[index]" maxlength="2">
				<font-awesome-icon :icon="['fas', 'minus']" @click="onRemoveLanguage(index)" title="remove"/>
			</div>
			<div class="language">
				<input type="text" v-model="newLanguage" maxlength="2">
				<font-awesome-icon :icon="['fas', 'plus']" @click="onAddLanguage" title="add"/>
			</div>
			<button @click="model = false">Close</button>
			<button class="primary" @click="onSave">Save</button>
		</form>
	</vue-final-modal>
</template>

<style>
.language {
	width: 55px;
	height: 30px;
}
.language input {
	width: 20px;
}
.language svg {
	cursor: pointer;
	padding: 5px;
	float: right;
}
</style>
