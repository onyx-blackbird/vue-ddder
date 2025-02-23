<script setup lang="ts">
import { computed, ref } from 'vue';
import { eventStormStore } from '../../store/EventStorm';

import LanguageModal from '../modals/LanguageModal.vue';

const languages = computed(() => eventStormStore.getState().languages);
const language = computed({
	get: () => eventStormStore.getState().currentLanguage,
	set: (newValue: string) => eventStormStore.setLanguage(newValue)
});
const showLanguageModal = ref(false);
function onShowLanguageModal() {
	showLanguageModal.value = true;
}
</script>

<template>
	<h2>Languages</h2>
	<form @submit.prevent>
		<div>
			<label for="language">Current </label>
			<select id="language" v-model="language">
				<option v-for="(lang) in languages">{{ lang }}</option>
			</select>
		</div>
		<div>
			<button @click="onShowLanguageModal">Edit Language Options</button>
		</div>
	</form>
	<language-modal v-model="showLanguageModal"/>
</template>
