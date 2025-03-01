<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { GRID_SIZE } from '../Uitls';
import { eventStormStore } from '../store/EventStorm';
import type Note from '../models/Note';
import type Arrow from '../models/Arrow';
import useArrow from '../composables/useArrow';
import useNote from '../composables/useNote';
import useZoom from '../composables/useZoom';

import StickyNote from './StickyNote.vue';
import ConnectionArrow from './ConnectionArrow.vue';
import EditNote from './modals/EditNote.vue';
import DeleteNote from './modals/DeleteNote.vue';
import DeleteArrow from './modals/DeleteArrow.vue';

const notes = computed(() => eventStormStore.getState().notes);
const arrows = computed(() => eventStormStore.getState().arrows);

const backgroundSize = GRID_SIZE + 'px ' + GRID_SIZE + 'px';
const gridStyle = computed(() => {
	return {
		width: eventStormStore.getState().gridSize.width + 'px',
		height: eventStormStore.getState().gridSize.height + 'px',
	}
});
const arrowColor = computed(() => eventStormStore.getState().arrowColor);

const { zoomStyle, onWheel, onDecrease, onIncrease, onReset } = useZoom();
const { onDragNoteStart, onDropNote } = useNote();
const { onMouseDown, onMouseUp } = useArrow();

const currentEditNote: Ref<Note|null> = ref(null);
function onChangeNote(note: Note) {
	currentEditNote.value = note;
}
const currentDeleteNote: Ref<Note|null> = ref(null);
function onDeleteNote(note: Note) {
	currentDeleteNote.value = note;
}
const currentArrow: Ref<Arrow|null> = ref(null);
function onDeleteArrow(arrow: Arrow) {
	currentArrow.value = arrow;
}
</script>

<template>
	<div class="grid" data-dragscroll
		:style="gridStyle"
		@contextmenu.prevent
		@dragover.prevent
		@drop="onDropNote"
		@wheel="onWheel">
		<sticky-note v-for="(note) in notes"
			class="resizable"
			:key="note.id"
			:note="note"
			@change-note="onChangeNote(note)"
			@delete-note="onDeleteNote(note)"
			@dragstart="onDragNoteStart($event, note)"
			@mousedown="onMouseDown"
			@mouseup="onMouseUp"/>
		<connection-arrow v-for="(arrow) in arrows"
			:key="arrow.id"
			:arrow="arrow"
			@contextmenu="onDeleteArrow(arrow)"/>
		<edit-note v-model="currentEditNote"/>
		<delete-note v-model="currentDeleteNote"/>
		<delete-arrow v-model="currentArrow"/>
		<teleport to="body">
			<div class="zoom">
				<font-awesome-icon :icon="['fas', 'minus']" @click="onDecrease"/>
				<span @click="onReset">{{ zoomStyle }}</span>
				<font-awesome-icon :icon="['fas', 'plus']" @click="onIncrease"/>
			</div>
		</teleport>
	</div>
</template>

<style>
.grid {
  background-size: v-bind(backgroundSize);
  background-image:
    linear-gradient(to right, #dddddd 1px, transparent 1px),
    linear-gradient(to bottom, #dddddd 1px, transparent 1px);
  overflow: scroll;
  position: relative;
  zoom: v-bind(zoomStyle);
}

.zoom {
	position: fixed;
	top: 10px;
	left: 200px;
	padding: 2px 5px;
	background-color: #ffffff80;
	border: 1px solid #33333380;
}
.zoom span {
	cursor: pointer;
	user-select: none;
}
.zoom svg {
	cursor: pointer;
	padding: 0 5px;
}

.editor-modal {
	display: flex;
	justify-content: center;
	align-items: center;
}
.editor-modal-content {
	display: flex;
	flex-direction: column;
	padding: 1rem;
	background: #fff;
	border-radius: 0.5rem;
	max-width: 50vw;
	max-height: 50vh;
	overflow: auto;
}
.editor-modal-content > * + *{
	margin: 0.5rem 0;
}
.editor-modal-content input {
	width: 200px;
}
.editor-modal-content textarea {
	width: 200px;
	height: 100px;
}
.editor-modal-scroll {
	max-height: 40vh;
	overflow: auto;
	margin-bottom: 1em;
}
.arrow {
	--t: 5px;  /* tail size */
	--h: 10px; /* head size */

	position: absolute;
	transform-origin: left 50%;
	height: var(--h);
	background: v-bind(arrowColor);
}
</style>
