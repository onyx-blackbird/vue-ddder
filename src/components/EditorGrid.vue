<script setup lang="ts">
import { computed } from 'vue';

import { GRID_SIZE } from '../Uitls';
import { appStore } from '../store/App';
import useNote from '../composables/useNote';
import useArrow from '../composables/useArrow';

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

const { onNoteChanged, onDragNoteStart, onDropNote } = useNote();
const { onMouseDown, onMouseUp } = useArrow();
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
			@note-changed="onNoteChanged"
			@dragstart="onDragNoteStart($event, note)"
			@mousedown="onMouseDown"
			@mouseup="onMouseUp">
			{{ note.title }}
		</sticky-note>
		<connection-arrow v-for="(arrow) in arrows"
			:key="arrow.id"
			:arrow="arrow">
		</connection-arrow>
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
</style>
