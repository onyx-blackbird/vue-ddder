<script setup lang="ts">
import { ref } from 'vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { eventStormStore } from '../../store/EventStorm';
import useFile from '../../composables/useFile';
import useCollapse from '../../composables/useCollapse';

const notesFileName = ref('notes.json');

const { collapsedClass, icon, toggleCollapseTitle } = useCollapse();
const { fileContents, fileMessage, onLoadFile, downloadAsJson } = useFile();

function onImport() {
	if (fileContents.value) {
		eventStormStore.import(JSON.parse(fileContents.value));
	}
}

function onExport() {
	downloadAsJson(notesFileName.value, JSON.stringify(eventStormStore.export()));
}
</script>

<template>
	<h2 :class="collapsedClass">Import / Export <font-awesome-icon :icon="['fas', icon]" @click="toggleCollapseTitle"/></h2>
	<div class="collapsible" :class="collapsedClass">
		<div>
			<form @submit.prevent>
				<div class="dropbox">
					<input type="file" accept="application/json" @change="onLoadFile">
					<p>{{fileMessage}}</p>
				</div>
				<div>
					<button @click="onImport">Import Notes and Arrows</button>
				</div>
			</form>
			<form @submit.prevent>
				<div>
					<label for="fileName">File Name </label><input type="text" id="fileName" v-model="notesFileName">
				</div>
				<div>
					<button @click="onExport">Export Notes and Arrows</button>
				</div>
			</form>
		</div>
	</div>
</template>

<style>
.dropbox {
    border: 2px dashed #333333;
    padding: 10px 10px;
    position: relative;
    cursor: pointer;
	margin-bottom: 1em;
	width: 200px;
}
.dropbox:hover {
	border-color: black;
}
.dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 20px 10px;
    margin: 0;
}
input[type=file] {
    opacity: 0;
	width: 90%;
    height: 90%;
    position: absolute;
    cursor: pointer;
}
</style>