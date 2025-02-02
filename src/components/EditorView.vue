<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import { ModalsContainer } from 'vue-final-modal'

import { COPY_EFFECT, GRID_SIZE, TRANSFER_TYPE, type MoveData } from '../Uitls';
import useFile from '../composables/File';
import { appStore } from '../store/App';
import { noteStore } from '../store/Note';
import Note, { NOTE_TYPES } from '../models/Note';

import NoteForm from './NoteForm.vue';
import EditorGrid from './EditorGrid.vue'
import StickyNote from './StickyNote.vue'

interface DragData {
	type: string,
	title: string,
	x: number,
	y: number,
}

const OFFSET_X = 200;

const notes = computed(() => noteStore.getState().notes);
const snap = computed({
	get() {
		return appStore.getState().snap;
	},
	set(newValue: boolean) {
		appStore.setSnap(newValue);
	}
});
const gridWidth = computed({
	get() {
		return appStore.getState().gridSize.width;
	},
	set(newValue: number) {
		appStore.setGridSize(newValue, appStore.getState().gridSize.height);
	}
});
const gridHeight = computed({
	get() {
		return appStore.getState().gridSize.height;
	},
	set(newValue: number) {
		appStore.setGridSize(appStore.getState().gridSize.width, newValue);
	}
});
const currentNote: Ref<Note | null> = ref(null);
const showModal = ref(false);
const fileName = ref('export.json');

const { fileContents, fileMessage, onLoadFile, downloadAsJson } = useFile();

function onDragNoteStart(evt: DragEvent, note: Note): void {
	console.log(appStore.getState().gridSize.height)
	if (evt.dataTransfer && evt.target instanceof HTMLElement) {
		evt.dataTransfer.dropEffect = COPY_EFFECT;
		evt.dataTransfer.effectAllowed = COPY_EFFECT;
		const dragData: DragData = {
			type: note.type,
			title: note.title,
			x: evt.pageX - evt.target.offsetLeft,
			y: evt.pageY - evt.target.offsetTop,
		}
		evt.dataTransfer.setData(TRANSFER_TYPE, JSON.stringify(dragData));
	}
}

function onDropNote(evt: DragEvent): void {
	if (evt.dataTransfer && evt.dataTransfer.effectAllowed === COPY_EFFECT) {
		const dragData: DragData = JSON.parse(evt.dataTransfer.getData(TRANSFER_TYPE));
		let x = Math.max(0, evt.pageX - dragData.x - OFFSET_X);
		let y = Math.max(0, evt.pageY - dragData.y);
		if (appStore.getState().snap) {
			x = Math.ceil(x / GRID_SIZE) * GRID_SIZE;
			y = Math.ceil(y / GRID_SIZE) * GRID_SIZE;
		}
		const note = new Note(dragData.type, dragData.title, x, y);
		noteStore.addNote(note);
	}
}

function onNoteMoved(moveData: MoveData): void {
	const note = notes.value.find(note => note.id === moveData.noteId);
	note?.move(moveData.x, moveData.y);
}

function onNoteChanged(note: Note, newTitle: string): void {
	note.title = newTitle;
}

function onExport() {
	const jsonNotes = notes.value.map(note => note.toJsonObject())
	downloadAsJson(fileName.value, JSON.stringify(jsonNotes));
}

function onImport() {
	if (fileContents.value) {
		noteStore.clear();
		const importNotes: Array<Note> = JSON.parse(fileContents.value);
		importNotes.forEach(note => noteStore.addNote(Note.fromJsonObject(note)));
	}
}
</script>

<template>
	<main>
		<aside class="left">
			<h1>Notes</h1>
			<sticky-note v-for="(type) in NOTE_TYPES" 
				:key="type.id"
				:note="type"
				:readonly="true"
				:style="type.style"
				@dragstart="onDragNoteStart($event, type)">
			</sticky-note>
		</aside>
		<div class="center" v-dragscroll:nochilddrag>
			<editor-grid
				:notes="notes"
				@dragover.prevent
				@drop="onDropNote"
				@note-moved="onNoteMoved"
				@note-changed="onNoteChanged">
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
	<modals-container />
</template>

<style>
form.options {
	border: 1px solid #333333;
	padding: 0.5em;
	margin-bottom: 1em;
}
label {
	display: inline-block;
    width: 100px;
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