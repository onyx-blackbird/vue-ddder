<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef, type Ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import GlossaryExport from './sidebar/GlossaryExport.vue';

import { replaceNewline } from '../Uitls';
import { eventStormStore } from '../store/EventStorm';
import type Note from '../models/Note';
import useCollapse from '../composables/useCollapse';

const { collapsedSidebar, onToggleCollapseSidebar } = useCollapse({collapsedSidebar: true});

const languages = computed(() => eventStormStore.getState().languages);
const notes = computed(() => eventStormStore.getState().notes);

function getTitle(note: Note, language: string) {
	return note.getTranslation(language)?.title;
}
function getDescription(note: Note, language: string) {
	return replaceNewline(note.getTranslation(language)?.description);
}

const inputField = useTemplateRef('note-input');
function focusOnInput() {
	if (inputField.value && Array.isArray(inputField.value)) {
		const visibleInput = (inputField.value as Array<HTMLInputElement>).find(input  => input.style.display !== 'none');
		visibleInput?.focus();
	}
}

const editMode = ref('');
const currentEditNote: Ref<Note|null> = ref(null);
const inputLanguage = ref('');
const inputValue = ref('');

function showField(note: Note, language: string, type: string) {
	return editMode.value === `${type}_${note.id}_${language}`;
}

function onEdit(note: Note, language: string, type: string) {
	currentEditNote.value = note;
	inputLanguage.value = language;
	editMode.value = `${type}_${note.id}_${language}`;
	nextTick(focusOnInput);
}

function onChange() {
	currentEditNote.value = null;
	inputValue.value = '';
	editMode.value = '';
}

function onEditTitle(note: Note, language: string) {
	onEdit(note, language, 'title');
	inputValue.value = getTitle(note, language) || '';
}

function onChangeTitle() {
	currentEditNote.value?.setTitle(inputLanguage.value, inputValue.value);
	onChange();
}

function onEditDescription(note: Note, language: string) {
	onEdit(note, language, 'description');
	inputValue.value = note.getTranslation(language)?.description || '';
}

function onChangeDescription() {
	currentEditNote.value?.setDescription(inputLanguage.value, inputValue.value);
	onChange();
}
</script>

<template>
	<div class="glossary tableview">
		<div class="main">
			<h2>Glossary</h2>
			<table>
				<thead>
					<tr>
						<template v-for="(language) in languages">
							<th>Title ({{ language }})</th>
							<th>Description ({{ language }})</th>
						</template>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(note, noteIndex) in notes" :key="noteIndex">
						<template v-for="(language) in languages">
							<td>
								<div v-show="!showField(note, language, 'title')">
									{{ getTitle(note, language) }} <font-awesome-icon :icon="['far', 'pen-to-square']" @click="onEditTitle(note, language)"/>
								</div>
								<input type="text"
									ref="note-input"
									v-show="showField(note, language, 'title')"
									v-model="inputValue"
									@blur="onChangeTitle"
									@keyup.enter="onChangeTitle">
							</td>
							<td>
								<div v-show="!showField(note, language, 'description')">
									<span v-html="getDescription(note, language)"></span> <font-awesome-icon :icon="['far', 'pen-to-square']" @click="onEditDescription(note, language)"/>
								</div>
								<textarea type="text"
									ref="note-input"
									v-show="showField(note, language, 'description')"
									v-model="inputValue"
									@blur="onChangeDescription">
								</textarea>
							</td>
						</template>
					</tr>
				</tbody>
			</table>
		</div>
		<aside class="right">
			<div class="sidebar" v-show="!collapsedSidebar">
				<div class="icons">
					<font-awesome-icon class="collapse" title="collapse"
						:icon="['fas', 'angles-right']"
						@click="onToggleCollapseSidebar"/>
				</div>
				<glossary-export title="Export" :collapsed="false"/>
				<h2>Links</h2>
				<div>
					<router-link to="/">Back to layout</router-link>
				</div>
			</div>
			<div class="sidebar collapsed" v-show="collapsedSidebar">
				<div class="icons">
					<font-awesome-icon class="collapse" title="expand"
						:icon="['fas', 'angles-left']"
						@click="onToggleCollapseSidebar"/>
				</div>
				<h2 class="vertical">Options</h2>
			</div>
		</aside>
	</div>
</template>

<style>
.glossary .link {
	margin-bottom: 0.5em;
}
.glossary a {
    margin: 0.25rem 0 0 auto;
    padding: 5px 10px;
    border: 1px solid;
    border-radius: 0.5rem;
	background-color: #ffffff;
}
.glossary a:hover {
	background-color: #eeeeee;
}
.tableview {
	margin-left: 1em;
	display: grid;
	grid-template-columns: 1fr var(--sidebar-width);
	overflow: hidden;
}
.main {
	margin-right: 1em;
}
.tableview aside {
	height: 100vh;
}
.glossary td svg {
	cursor: pointer;
	float: right;
	padding-top: 0.2em;
}
.glossary td input {
	width: calc(100% - 0.5em);
}
.glossary td textarea {
	width: calc(100% - 0.5em);
	height: 50px;
}
</style>
