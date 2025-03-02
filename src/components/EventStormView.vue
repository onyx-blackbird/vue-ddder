<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import useNote from '../composables/useNote';
import useScroll from '../composables/useScroll';
import { NOTE_TYPES, SIZE } from '../models/Note';

import EventStormGrid from './EventStormGrid.vue'
import SideBar from './sidebar/SideBar.vue'

const { onNewNoteDragStart, onNewNoteDrop } = useNote();
const { showScrollUp, showScrollDown, onScroll, scrollToTop, scrollToBottom } = useScroll('aside');
const noteStyle = computed(() => {
	return {
		width: SIZE + 'px',
		height: SIZE + 'px',
	};
});
onMounted(() => {
	document.title = 'Event Storming';
});
</script>

<template>
	<div class="eventstorm">
		<main>
			<aside class="left" ref="aside" @scroll="onScroll">
				<h2>Notes</h2>
				<div class="note template" v-for="(note) in NOTE_TYPES"
					draggable="true"
					:key="note.type"
					:class="note.type"
					:style="noteStyle"
					@dragstart="onNewNoteDragStart($event, note)">
					{{ note.title }}
				</div>
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
				<event-storm-grid
					@dragover.prevent
					@drop="onNewNoteDrop"/>
			</div>
			<aside class="right">
				<side-bar/>
			</aside>
		</main>
	</div>
</template>

<style>
:root {
	--sidebar-width: 300px;
}

.eventstorm {
	display: grid;
	grid-template-rows: 1fr;
	height: 100vh;
	width: 100vw;
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
