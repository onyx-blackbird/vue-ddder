<script setup lang="ts">
import { ref } from 'vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import CanvasOptions from './CanvasOptions.vue';
import LanguageOptions from './LanguageOptions.vue';
import ImportExport from './ImportExport.vue';
import PrintNotes from './PrintNotes.vue';
import LocalStorage from './LocalStorage.vue';
import HelpModal from '../modals/HelpModal.vue';
import GlossaryExport from './GlossaryExport.vue';

import { eventStormStore } from '../../store/EventStorm';
import useCollapse from '../../composables/useCollapse';

const { collapsedSidebar, onToggleCollapseSidebar } = useCollapse({collapsedSidebar: false});
const showHelpModal = ref(false);

function onShowHelpModal() {
	showHelpModal.value = true;
}
</script>

<template>
	<div class="sidebar" v-show="!collapsedSidebar">
		<div class="icons">
			<font-awesome-icon class="collapse" title="collapse"
				:icon="['fas', 'angles-right']"
				@click="onToggleCollapseSidebar"/>
			<font-awesome-icon class="help" title="help"
				:icon="['far', 'circle-question']"
				@click="onShowHelpModal"/>
		</div>
		<language-options/>
		<canvas-options/>
		<local-storage storageType="eventStorm"
			:export="eventStormStore.export.bind(eventStormStore)"
			:import="eventStormStore.import.bind(eventStormStore)"/>
		<import-export/>
		<glossary-export title="Glossary" :collapsed="true">
			<div class="link">
				<router-link to="/glossary">Show glossary table</router-link>
			</div>
		</glossary-export>
		<print-notes/>
	</div>
	<div class="sidebar collapsed" v-show="collapsedSidebar">
		<div class="icons">
			<font-awesome-icon class="collapse" title="expand"
				:icon="['fas', 'angles-left']"
				@click="onToggleCollapseSidebar"/>
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
.sidebar form {
	border: 1px solid #333333;
	border-radius: 0.5em;
	padding: 0.5em;
	margin-bottom: 1em;
}
.sidebar form div {
	margin: 5px 2px;
}
.sidebar h2 {
	position: relative;
	margin: 0.5em 0;
}
h2.vertical {
	writing-mode: vertical-lr;
    margin: 10px 0 0 0;
    line-height: 0.8;
}
h2.collapsed {
	margin-bottom: 0;
}
h2 svg {
	position: absolute;
	top: 5px;
	right: 0;
}
.collapsible {
	display: grid; 
	grid-template-rows: 1fr;
	transition: 250ms grid-template-rows ease;
}
.collapsible.collapsed {
	grid-template-rows: 0fr;
}
.collapsible > div {
	overflow: hidden;
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
