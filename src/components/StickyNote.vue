<script setup lang="ts">
import { nextTick, ref, toRef, useTemplateRef } from  'vue';
import { vResizeObserver } from '@vueuse/components';

import { debounce, GRID_SIZE } from '../Uitls';
import { appStore } from '../store/App';
import type Note from '../models/Note';

interface Props {
	note: Note,
	readonly?: boolean,
}
const props = defineProps<Props>();

const titleRef = toRef(props.note.title);
const editMode = ref(false);
const input = useTemplateRef('title-input');

function onDblCLick() {
	if (props.readonly) return;
	editMode.value = true;
	nextTick(() => input.value!.focus());
}

function onChange() {
	editMode.value = false;
	props.note.title = titleRef.value;
}

const onResizeObserver = debounce(
	(entries: any) => {
		const [entry] = entries;
		let { width, height } = entry.contentRect;
		if (appStore.getState().snap) {
			width = Math.ceil(width / GRID_SIZE) * GRID_SIZE;
			height = Math.ceil(height / GRID_SIZE) * GRID_SIZE;
		}
		props.note.resize(width, height);
	},
	100
);
</script>

<template>
	<div class="note" draggable="true"
		v-resize-observer="onResizeObserver"
		:class="note.type"
		@dblclick="onDblCLick">
		<span v-show="!editMode">{{note.title}}</span>
		<input type="text" class="edit"
			ref="title-input"
			v-show="editMode"
			v-model="titleRef"
			@blur="onChange"
			@keyup.enter="onChange">
	</div>
</template>

<style>
.note {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  border: 1px solid #333333;
  margin-bottom: 20px;
}

.note.event {
  background-color: orange;
}
.note.command {
  background-color: cornflowerblue;
}
.note.policy {
  background-color: plum;
}
.note.external {
  background-color: lightpink;
}
.note.actor {
  background-color: gold;
}
.note.object {
  background-color: lemonchiffon;
}
.note.view {
  background-color: lightgreen;
}
.note.openissue {
  background-color: crimson;
}
.note.comment {
  background-color: lightgray;
}

.note.resizable {
	position: absolute;
	resize: both;
	overflow: hidden;
}

.note .edit,
.note .edit:focus {
	background-color: transparent;
	width: 90%;
	border: 1px solid #333333;
	outline: none;
}
</style>
