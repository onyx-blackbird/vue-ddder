<script setup lang="ts">
import { ref } from 'vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import CanvasOptions from './CanvasOptions.vue';
import HelpModal from './HelpModal.vue';
import ImportExport from './ImportExport.vue';
import PrintNotes from './PrintNotes.vue';

const EXPANDED = '300px';
const COLLAPSED = '50px';

const collapsed = ref(false);
const showHelpModal = ref(false);

function onToggleCollapse() {
	if (collapsed.value === true) {
		collapsed.value = false;
		document.documentElement.style.setProperty('--sidebar-width', EXPANDED);
	} else {
		collapsed.value = true;
		document.documentElement.style.setProperty('--sidebar-width', COLLAPSED);
	}
}

function onShowHelpModal() {
	showHelpModal.value = true;
}
</script>

<template>
	<div class="sidebar" v-show="!collapsed">
		<div class="icons">
			<font-awesome-icon class="collapse" title="collapse"
				:icon="['fas', 'angles-right']"
				@click="onToggleCollapse"/>
			<font-awesome-icon class="help" title="help"
				:icon="['far', 'circle-question']"
				@click="onShowHelpModal"/>
		</div>
		<canvas-options/>
		<import-export/>
		<print-notes/>
	</div>
	<div class="sidebar collapsed" v-show="collapsed">
		<div class="icons">
			<font-awesome-icon class="collapse" title="expand"
				:icon="['fas', 'angles-left']"
				@click="onToggleCollapse"/>
		</div>
		<h2 class="vertical">Options and Tools</h2>
	</div>
	<help-modal v-model="showHelpModal"/>
</template>

<style>
.sidebar .icons {
	position: relative;
	margin-top: 1em;
}
.sidebar.collapsed {
	width: 20px;
}
.sidebar .help {
	position: absolute;
	right: 0;
}
.sidebar svg {
	height: 20px;
	cursor: pointer;
}
h2.vertical {
	writing-mode: vertical-lr;
    margin: 10px 0 0 0;
    line-height: 0.8;
}
form.options {
	border: 1px solid #333333;
	padding: 0.5em;
	margin-bottom: 1em;
}
form.options div {
	margin: 5px 2px;
}
input {
	width: 100px;
}
.radio {
	display: inline-grid;
  	line-height: 1.5;
}
.radio input {
	width: auto;
}
</style>
