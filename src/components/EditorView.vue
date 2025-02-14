<script setup lang="ts">
import { onMounted } from 'vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import useNote from '../composables/useNote';
import { NOTE_TYPES } from '../models/Note';

import EditorGrid from './EditorGrid.vue'
import SideBar from './SideBar.vue'
import StickyNote from './StickyNote.vue'
import useScroll from '../composables/useScroll';

const { onNewNoteDragStart, onNewNoteDrop } = useNote();
const { showScrollUp, showScrollDown, onScroll, scrollToTop, scrollToBottom } = useScroll('aside');

onMounted(() => {
	document.title = 'Event Storming';
});
</script>

<template>
	<main>
		<aside class="left" ref="aside" @scroll="onScroll">
			<h2>Notes</h2>
			<sticky-note v-for="(type) in NOTE_TYPES" 
				:key="type.id"
				:note="type"
				:readonly="true"
				:style="type.style"
				@dragstart="onNewNoteDragStart($event, type)"/>
			<div class="scroll up" v-show="showScrollUp"
				@click="scrollToTop">
				<font-awesome-icon :icon="['fas', 'angles-up']"/>
			</div>
			<div class="scroll down" v-show="showScrollDown"
				@click="scrollToBottom">
				<font-awesome-icon :icon="['fas', 'angles-down']"/>
			</div>
		</aside>
		<div class="center" v-dragscroll:nochilddrag>
			<editor-grid
				@dragover.prevent
				@drop="onNewNoteDrop"/>
		</div>
		<aside class="right">
			<side-bar/>
		</aside>
	</main>
</template>

<style>
:root {
	--sidebar-width: 300px;
}
main {
	display: grid;
	grid-template-columns: 175px 1fr var(--sidebar-width);
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
  	scrollbar-width: none;
}
aside.right {
	border-left: 1px solid #333333;
}
aside .scroll {
	position: fixed;
	left: 0;
	width: 175px;
	height: 30px;
	background-color: #33333380;
	text-align: center;
	cursor: pointer;
}
aside .scroll svg {
	color: #ffffff;
}
aside .scroll.up {
	top: 0;
}
aside .scroll.down {
	bottom: 0;
}
</style>
