<script setup lang="ts">
import { computed } from 'vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { GRID_SIZE } from '../Uitls';
import { eventStormStore } from '../store/EventStorm';
import useArrow from '../composables/useArrow';
import useNoteModal from '../composables/useNoteModal';
import useNote from '../composables/useNote';
import useZoom from '../composables/useZoom';

import { VueFinalModal } from 'vue-final-modal';

import StickyNote from './StickyNote.vue';
import ConnectionArrow from './ConnectionArrow.vue';
import useArrowModal from '../composables/useArrowModal';

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
const { currentNote, currentTitle, currentDescription, showEditNoteModal, showDeleteNoteModal, onChangeNote, onSaveNoteModal, onDeleteNote, deleteNote } = useNoteModal();
const { currentArrowInfo, showDeleteArrowModal, onDeleteArrow, deleteArrow } = useArrowModal();
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
			:style="note.style"
			@change-note="onChangeNote(note)"
			@delete-note="onDeleteNote(note)"
			@dragstart="onDragNoteStart($event, note)"
			@mousedown="onMouseDown"
			@mouseup="onMouseUp">
			{{ note.title }}
		</sticky-note>
		<connection-arrow v-for="(arrow) in arrows"
			:key="arrow.id"
			:arrow="arrow"
			@contextmenu="onDeleteArrow(arrow)"/>
		<vue-final-modal v-model="showEditNoteModal"
			class="note-modal"
			content-class="note-modal-content"
			overlay-transition="vfm-fade"
			content-transition="vfm-fade">
			<form @submit.prevent>
				<p>
					<label for="title">Title </label>
					<input type="string" id="title" v-model="currentTitle">
				</p>
				<p>
					<label for="description">Description </label>
					<textarea id="description" v-model="currentDescription"></textarea>
				</p>
				<button @click="showEditNoteModal = false">Cancel</button>
				<button class="primary" @click="onSaveNoteModal">Save</button>
			</form>
		</vue-final-modal>
		<vue-final-modal v-model="showDeleteNoteModal"
			class="note-modal"
			content-class="note-modal-content"
			overlay-transition="vfm-fade"
			content-transition="vfm-fade">
			<form @submit.prevent>
				<p>
					Do you really want to delete "{{currentNote!.title}}""
				</p>
				<button @click="showDeleteNoteModal = false">Cancel</button>
				<button class="primary" @click="deleteNote">Confirm</button>
			</form>
		</vue-final-modal>
		<vue-final-modal v-model="showDeleteArrowModal"
			class="note-modal"
			content-class="note-modal-content"
			overlay-transition="vfm-fade"
			content-transition="vfm-fade">
			<form @submit.prevent>
				<p>
					Do you really want to delete the arrow between {{ currentArrowInfo }}
				</p>
				<button @click="showDeleteArrowModal = false">Cancel</button>
				<button class="primary" @click="deleteArrow">Confirm</button>
			</form>
		</vue-final-modal>
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

.note-modal {
	display: flex;
	justify-content: center;
	align-items: center;
}
.note-modal-content {
	display: flex;
	flex-direction: column;
	padding: 1rem;
	background: #fff;
	border-radius: 0.5rem;
}
.note-modal-content > * + *{
	margin: 0.5rem 0;
}
.note-modal-content input {
	width: 200px;
}
.note-modal-content textarea {
	width: 200px;
	height: 100px;
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
