<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import HelpModal from './HelpModal.vue';

import useFile from '../composables/useFile';
import { eventStormStore } from '../store/EventStorm';

const JSON_FORMAT = 'json';
const MD_FORMAT = 'md';

const EXPANDED = '300px';
const COLLAPSED = '50px';

const { fileContents, fileMessage, onLoadFile, ensureExtension, download, downloadAsJson } = useFile();

const collapsed = ref(false);
const showHelpModal = ref(false);

const snap = computed({
	get: () => eventStormStore.getState().snap,
	set: (newValue: boolean) => eventStormStore.setSnap(newValue)
});
const arrowColor = computed({
	get: () => eventStormStore.getState().arrowColor,
	set: (newValue: string) => eventStormStore.setArrowColor(newValue)
});
const gridWidth = computed({
	get: () => eventStormStore.getState().gridSize.width,
	set: (newValue: number) => eventStormStore.setGridSize(newValue, eventStormStore.getState().gridSize.height)
});
const gridHeight = computed({
	get: () => eventStormStore.getState().gridSize.height,
	set: (newValue: number) => eventStormStore.setGridSize(eventStormStore.getState().gridSize.width, newValue)
});
const notesFileName = ref('notes.json');
const glossaryFileName = ref('glossary.json');
const glossaryFormat = ref('json');

watch(glossaryFormat, (newFormat, oldFormat) => {
	glossaryFileName.value = glossaryFileName.value.replace(oldFormat, newFormat);
});

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

function onToggleCollapse() {
	if (collapsed.value === true) {
		collapsed.value = false;
		document.documentElement.style.setProperty('--sidebar-width', EXPANDED);
	} else {
		collapsed.value = true;
		document.documentElement.style.setProperty('--sidebar-width', COLLAPSED);
	}
}

function onShowHelpModal() {
	showHelpModal.value = true;
}
</script>

<template>
	<div class="sidebar" v-show="!collapsed">
		<div class="icons">
			<font-awesome-icon class="collapse" title="collapse"
				:icon="['fas', 'angles-right']"
				@click="onToggleCollapse"/>
			<font-awesome-icon class="help" title="help"
				:icon="['far', 'circle-question']"
				@click="onShowHelpModal"/>
		</div>
		<h2>Options</h2>
		<form class="options" @submit.prevent>
			<div>
				<label for="gridWidth">Grid Width </label>
				<input type="number" id="gridWidth" min="1000" max="50000" step="100" v-model="gridWidth">
			</div>
			<div>
				<label for="gridHeight">Grid Height </label>
				<input type="number" id="gridHeight" min="1000" max="10000" step="100" v-model="gridHeight">
			</div>
			<div>
				<label for="snap">Snap to grid</label>
				<input type="checkbox" id="snap" v-model="snap" role="switch">
			</div>
			<div>
				<label for="color">Arrow color</label>
				<input type="color" id="color" v-model="arrowColor">
			</div>
		</form>
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
	</div>
	<div class="sidebar collapsed" v-show="collapsed">
		<div class="icons">
			<font-awesome-icon class="collapse" title="expand"
				:icon="['fas', 'angles-left']"
				@click="onToggleCollapse"/>
		</div>
		<h2 class="vertical">Options and Tools</h2>
	</div>
	<help-modal v-model="showHelpModal"/>
</template>

<style>
.sidebar .icons {
	position: relative;
	margin-top: 1em;
}
.sidebar.collapsed {
	width: 20px;
}
.sidebar .help {
	position: absolute;
	right: 0;
}
.sidebar svg {
	height: 20px;
	cursor: pointer;
}
h2.vertical {
	writing-mode: vertical-lr;
    margin: 10px 0 0 0;
    line-height: 0.8;
}
form.options {
	border: 1px solid #333333;
	padding: 0.5em;
	margin-bottom: 1em;
}
form.options div {
	margin: 5px 2px;
}
input {
	width: 100px;
}
.radio {
	display: inline-grid;
  	line-height: 1.5;
}
.radio input {
	width: auto;
}
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
