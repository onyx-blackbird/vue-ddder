<script setup lang="ts">
import { computed, ref } from 'vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { eventStormStore } from '../../store/EventStorm';
import useCollapse from '../../composables/useCollapse';

import LanguageModal from '../modals/LanguageModal.vue';

const languages = computed(() => eventStormStore.getState().languages);
const language = computed({
	get: () => eventStormStore.getState().currentLanguage,
	set: (newValue: string) => eventStormStore.setLanguage(newValue)
});
const { collapsedClass, icon, toggleCollapseTitle } = useCollapse(false);

const showLanguageModal = ref(false);
function onShowLanguageModal() {
	showLanguageModal.value = true;
}
</script>

<template>
	<h2 :class="collapsedClass">Languages <font-awesome-icon :icon="['fas', icon]" @click="toggleCollapseTitle"/></h2>
	<div class="collapsible" :class="collapsedClass">
		<div>
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
		</div>
	</div>
	<language-modal v-model="showLanguageModal"/>
</template>
