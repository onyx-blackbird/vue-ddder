<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from 'vue';

import useFile from '../composables/useFile';
import useNote from '../composables/useNote';
import { appStore } from '../store/App';
import Note, { NOTE_TYPES } from '../models/Note';

import NoteForm from './NoteForm.vue';
import EditorGrid from './EditorGrid.vue'
import StickyNote from './StickyNote.vue'

const snap = computed({
	get: () => appStore.getState().snap,
	set: (newValue: boolean) => appStore.setSnap(newValue)
});
const gridWidth = computed({
	get: () => appStore.getState().gridSize.width,
	set: (newValue: number) => appStore.setGridSize(newValue, appStore.getState().gridSize.height)
});
const gridHeight = computed({
	get: () => appStore.getState().gridSize.height,
	set: (newValue: number) => appStore.setGridSize(appStore.getState().gridSize.width, newValue)
});
const currentNote: Ref<Note | null> = ref(null);
const showModal = ref(false);
const fileName = ref('export.json');

const { fileContents, fileMessage, onLoadFile, downloadAsJson } = useFile();
const { onNewNoteDragStart, onNewNoteDrop } = useNote();

function onExport() {
	downloadAsJson(fileName.value, JSON.stringify(appStore.export()));
}

function onImport() {
	if (fileContents.value) {
		appStore.import(JSON.parse(fileContents.value));
	}
}

onMounted(() => {
	document.title = 'Event Storming';
});
</script>

<template>
	<main>
		<aside class="left">
			<h2>Notes</h2>
			<sticky-note v-for="(type) in NOTE_TYPES" 
				:key="type.id"
				:note="type"
				:readonly="true"
				:style="type.style"
				@dragstart="onNewNoteDragStart($event, type)">
			</sticky-note>
		</aside>
		<div class="center" v-dragscroll:nochilddrag>
			<editor-grid
				@dragover.prevent
				@drop="onNewNoteDrop">
			</editor-grid>
		</div>
		<aside class="right">
			<h2>Options</h2>
			<form class="options" @submit.prevent>
				<p>
					<label for="gridWidth">Grid Width </label>
					<input type="number" id="gridWidth" min="1000" max="50000" step="100" v-model="gridWidth">
				</p>
				<p>
					<label for="gridHeight">Grid Height </label>
					<input type="number" id="gridHeight" min="1000" max="10000" step="100" v-model="gridHeight">
				</p>
				<p>
					<label for="snap">Snap to grid</label>
					<input type="checkbox" id="snap" v-model="snap" role="switch">
				</p>
			</form>
			<h2>Import / Export</h2>
			<form class="options" @submit.prevent>
				<div class="dropbox">
					<input type="file" accept="application/json" @change="onLoadFile">
					<p>{{fileMessage}}</p>
				</div>
				<button @click="onImport">Import</button>
			</form>
			<form class="options" @submit.prevent>
				<p><label for="fileName">File Name </label><input type="text" id="fileName" v-model="fileName"></p>
				<p><button @click="onExport">Export</button></p>
			</form>
		</aside>
	</main>
	<note-form v-if="currentNote" v-model="showModal"
		:note="currentNote">
	</note-form>
</template>

<style>
main {
	display: grid;
	grid-template-columns: 200px 1fr 300px;
	overflow: hidden;
}
.center {
	overflow: hidden;
}
aside {
	padding: 0 1rem;
}
aside.left {
	border-right: 1px solid #333333;
	overflow-y: scroll;
}
aside.right {
	border-left: 1px solid #333333;
}
form.options {
	border: 1px solid #333333;
	padding: 0.5em;
	margin-bottom: 1em;
}
input {
	width: 100px;
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
    width: 100%;
    height: 60px;
    position: absolute;
    cursor: pointer;
}
</style>
