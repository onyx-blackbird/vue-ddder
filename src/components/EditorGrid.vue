<script setup lang="ts">
import { GRID_SIZE, MOVE_EFFECT, TRANSFER_TYPE, type MoveData } from '../Uitls';
import { appStore } from '../store/App';

import Note, { NOTE_CHANGED, NOTE_CLICKED, NOTE_MOVED } from '../models/Note';

import StickyNote from './StickyNote.vue';
import { computed } from 'vue';

interface Props {
	notes: Note[],
}
defineProps<Props>();

const emit = defineEmits([NOTE_MOVED, NOTE_CLICKED, NOTE_CHANGED]);

const gridStyle = GRID_SIZE + 'px ' + GRID_SIZE + 'px';
const gridSize = computed(() => {
	return {
		width: appStore.getState().gridSize.width + 'px',
		height: appStore.getState().gridSize.height + 'px',
	}
});

function onDragNoteStart(evt: DragEvent, note: Note): void {
	if (evt.dataTransfer && evt.target instanceof HTMLElement) {
		evt.dataTransfer.dropEffect = MOVE_EFFECT;
		evt.dataTransfer.effectAllowed = MOVE_EFFECT;
		const dragData: MoveData = {
			noteId: note.id,
			x: evt.pageX - evt.target.offsetLeft,
			y: evt.pageY - evt.target.offsetTop,
		}
		evt.dataTransfer.setData(TRANSFER_TYPE, JSON.stringify(dragData));
	}
}
function onDropNote(evt: DragEvent): void {
	if (evt.dataTransfer) {
		const moveData: MoveData = JSON.parse(evt.dataTransfer.getData(TRANSFER_TYPE));
		let x = Math.max(0, evt.pageX - moveData.x);
		let y = Math.max(0, evt.pageY - moveData.y);
		if (appStore.getState().snap) {
			x = Math.ceil(x / GRID_SIZE) * GRID_SIZE;
			y = Math.ceil(y / GRID_SIZE) * GRID_SIZE;
		}
		moveData.x = x;
		moveData.y = y;
		emit(NOTE_MOVED, moveData);
	}
}
function onNoteChanged(note: Note, newTitle: string) {
	emit(NOTE_CHANGED, note, newTitle);
}
</script>

<template>
	<div class="grid" data-dragscroll
		:style="gridSize"
		@contextmenu.prevent
		@dragover.prevent
		@drop="onDropNote">
		<sticky-note v-for="(note) in notes"
			class="resizable"
			:key="note.id"
			:note="note"
			:style="note.style"
			@note-changed="onNoteChanged"
			@dragstart="onDragNoteStart($event, note)">
			{{ note.title }}
		</sticky-note>
	</div>
</template>

<style>
.grid {
  background-size: v-bind(gridStyle);
  background-image:
    linear-gradient(to right, #dddddd 1px, transparent 1px),
    linear-gradient(to bottom, #dddddd 1px, transparent 1px);
  overflow: scroll;
  position: relative;
}
</style>