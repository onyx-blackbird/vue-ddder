<script setup lang="ts">
import { onMounted } from 'vue';

import useNote from '../composables/useNote';
import { NOTE_TYPES } from '../models/Note';

import EditorGrid from './EditorGrid.vue'
import SideBar from './SideBar.vue'
import StickyNote from './StickyNote.vue'

const { onNewNoteDragStart, onNewNoteDrop } = useNote();

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
			<side-bar></side-bar>
		</aside>
	</main>
</template>

<style>
:root {
	--sidebar-width: 300px;
}
main {
	display: grid;
	grid-template-columns: 200px 1fr var(--sidebar-width);
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
</style>
