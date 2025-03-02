<script setup lang="ts">
import { ref, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import useCollapse from '../../composables/useCollapse';
import useGlossary from '../../composables/useGlossary';
import useFile from '../../composables/useFile';

const JSON_FORMAT = 'json';
const MD_FORMAT = 'md';
const MKD_FORMAT = 'mkd';

interface Props {
	title: string,
	collapsed: boolean;
}
const props = defineProps<Props>();

const { collapsedClass, icon, toggleCollapseTitle } = useCollapse({collapsedTitle: props.collapsed});
const { ensureExtension, download } = useFile();
const { getJson, getSimpleMarkdown, getExtendedMarkdown } = useGlossary();

const glossaryFileName = ref('glossary.json');
const glossaryFormat = ref('json');

watch(glossaryFormat, (newFormat, oldFormat) => {
	glossaryFileName.value = glossaryFileName.value.replace(oldFormat, newFormat);
});

function onExportGlossary() {
	let fileContent = '';
	switch (glossaryFormat.value) {
		case MD_FORMAT:
			fileContent = getSimpleMarkdown();
			break;
		case MKD_FORMAT:
			fileContent = getExtendedMarkdown();
			break;
		case JSON_FORMAT:
		default:
			fileContent = getJson();
	}
	const fileName = ensureExtension(glossaryFileName.value, glossaryFormat.value);
	download(fileName, fileContent);
}
</script>

<template>
	<h2 :class="collapsedClass">{{ title }} <font-awesome-icon :icon="['fas', icon]" @click="toggleCollapseTitle"/></h2>
	<div class="glossary collapsible" :class="collapsedClass">
		<div>
			<form @submit.prevent>
				<div>
					<label for="fileName">File Name </label><input type="text" id="fileName" v-model="glossaryFileName">
				</div>
				<div class="radio">
					<label for="jsonFormat"><input type="radio" id="jsonFormat" name="format" :value="JSON_FORMAT" v-model="glossaryFormat"> JSON</label>
					<label for="mdFormat"><input type="radio" id="mdFormat" name="format" :value="MD_FORMAT" v-model="glossaryFormat"> Markdown</label>
					<label for="mkdFormat"><input type="radio" id="mkdFormat" name="format" :value="MKD_FORMAT" v-model="glossaryFormat"> Markdown (extended)</label>
				</div>
				<div>
					<button @click="onExportGlossary">Export Glossary</button>
				</div>
			</form>
			<slot></slot>
		</div>
	</div>
</template>

<style>
.glossary .radio label {
	width: 200px;
}
</style>