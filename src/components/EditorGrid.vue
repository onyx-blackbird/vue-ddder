<script setup lang="ts">
import { computed } from 'vue';

import { GRID_SIZE } from '../Uitls';
import { appStore } from '../store/App';
import useArrow from '../composables/useArrow';
import useNoteModal from '../composables/useNoteModal';
import useNote from '../composables/useNote';

import { VueFinalModal } from 'vue-final-modal';

import StickyNote from './StickyNote.vue';
import ConnectionArrow from './ConnectionArrow.vue';

const notes = computed(() => appStore.getState().notes);
const arrows = computed(() => appStore.getState().arrows);

const backgroundSize = GRID_SIZE + 'px ' + GRID_SIZE + 'px';
const gridStyle = computed(() => {
	return {
		width: appStore.getState().gridSize.width + 'px',
		height: appStore.getState().gridSize.height + 'px',
	}
});
const arrowColor = computed(() => appStore.getState().arrowColor);

const { onDragNoteStart, onDropNote } = useNote();
const { onMouseDown, onMouseUp } = useArrow();
const { currentNote, currentTitle, currentDescription, showEditModal, showDeleteModal, onChangeNote, onSaveModal, onDeleteNote, deleteNote } = useNoteModal();
</script>

<template>
	<div class="grid" data-dragscroll
		:style="gridStyle"
		@contextmenu.prevent
		@dragover.prevent
		@drop="onDropNote">
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
			:arrow="arrow">
		</connection-arrow>
		<vue-final-modal v-model="showEditModal"
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
				<button @click="onSaveModal">Save</button>
			</form>
		</vue-final-modal>
		<vue-final-modal v-model="showDeleteModal"
			class="note-modal"
			content-class="note-modal-content"
			overlay-transition="vfm-fade"
			content-transition="vfm-fade">
			<form @submit.prevent>
				<p>
					Do you really want to delete "{{currentNote!.title}}""
				</p>
				<button @click="deleteNote">Confirm</button>
			</form>
		</vue-final-modal>
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
