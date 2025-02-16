<script setup lang="ts">
import { ref, watch } from 'vue';

import useFile from '../../composables/useFile';
import { eventStormStore } from '../../store/EventStorm';

const JSON_FORMAT = 'json';
const MD_FORMAT = 'md';

const notesFileName = ref('notes.json');
const glossaryFileName = ref('glossary.json');
const glossaryFormat = ref('json');

watch(glossaryFormat, (newFormat, oldFormat) => {
	glossaryFileName.value = glossaryFileName.value.replace(oldFormat, newFormat);
});

const { fileContents, fileMessage, onLoadFile, ensureExtension, download, downloadAsJson } = useFile();

function onExport() {
	downloadAsJson(notesFileName.value, JSON.stringify(eventStormStore.export()));
}

function onImport() {
	if (fileContents.value) {
		eventStormStore.import(JSON.parse(fileContents.value));
	}
}

function onExportGlossary() {
	const fileName = ensureExtension(glossaryFileName.value, glossaryFormat.value);
	const glossary = eventStormStore.exportGlossary();
	if (glossaryFormat.value === JSON_FORMAT) {
		download(fileName, JSON.stringify(glossary));
	} else {
		const markdown = new Array<string>();
		glossary.forEach(entry => {
			markdown.push(`**${entry.title}**  `);
			markdown.push(`${entry.description}  `);
		});
		download(fileName, markdown.join('\n'));
	}
}
</script>

<template>
	<h2>Import / Export</h2>
	<form class="options" @submit.prevent>
		<div class="dropbox">
			<input type="file" accept="application/json" @change="onLoadFile">
			<p>{{fileMessage}}</p>
		</div>
		<div>
			<button @click="onImport">Import Notes and Arrows</button>
		</div>
	</form>
	<form class="options" @submit.prevent>
		<div>
			<label for="fileName">File Name </label><input type="text" id="fileName" v-model="notesFileName">
		</div>
		<div>
			<button @click="onExport">Export Notes and Arrows</button>
		</div>
	</form>
	<form class="options" @submit.prevent>
		<div>
			<label for="fileName">File Name </label><input type="text" id="fileName" v-model="glossaryFileName">
		</div>
		<div class="radio">
			<label for="jsonFormat"><input type="radio" id="jsonFormat" name="format" :value="JSON_FORMAT" v-model="glossaryFormat"> JSON</label>
			<label for="markdownFormat"><input type="radio" id="markdownFormat" name="format" :value="MD_FORMAT" v-model="glossaryFormat"> Markdown</label>
		</div>
		<div>
			<button @click="onExportGlossary">Export Glossary</button>
		</div>
	</form>
</template>

<style>
.dropbox {
    border: 2px dashed #333333;
    padding: 10px 10px;
    position: relative;
    cursor: pointer;
	margin-bottom: 1em;
	width: 200px;
}
.dropbox:hover {
	border-color: black;
}
.dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 20px 10px;
    margin: 0;
}
input[type=file] {
    opacity: 0;
	width: 90%;
    height: 90%;
    position: absolute;
    cursor: pointer;
}
</style>