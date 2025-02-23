<script setup lang="ts">
import { computed, ref, useTemplateRef, type Ref } from 'vue';
import { useVueToPrint } from 'vue-to-print';

import VueMultiselect from 'vue-multiselect';

import Note, { NOTE_TYPES } from '../../models/Note';
import { eventStormStore } from '../../store/EventStorm';

const notesRef = useTemplateRef('notesRef');
const { handlePrint } = useVueToPrint({
	content: notesRef as Ref<HTMLElement>,
	documentTitle: "Event Storming Notes",
});

const selectedTypes: Ref<Array<Note>> = ref([]);

const language = computed(() => eventStormStore.getState().currentLanguage);
const notes = computed(() => eventStormStore.getState().notes.filter(note => 
	selectedTypes.value.find(noteType => noteType.type === note.type) && note.getTranslation(language.value)?.title
));
</script>

<template>
	<h2>Print</h2>
	<form @submit.prevent>
		<div>
			<vue-multiselect v-model="selectedTypes"
				placeholder="Select note types to print"
				track-by="type"
				label="title"
				selectLabel=""
				:multiple="true"
				:close-on-select="false"
				:allow-empty="false"
				:searchable="false"
				:hide-selected="true"
				:options="NOTE_TYPES"/>
		</div>
		<div>
			<button @click="handlePrint">Print the notes on A4 paper</button>
		</div>
	</form>
	<div class="notes" ref="notesRef">
		<div v-for="(note) in notes"
			:key="note.id"
			class="note"
			:class="note.type">
			{{ note.getTranslation(language)?.title }}
		</div>
	</div>
</template>

<style>
.notes {
	display: none;
}
@media print {
	.notes {
		display: block;
	}
}
.notes .note {
	width: 215mm;
	height: 69mm;
	border: none;
	margin: 0 0 1mm 0;
	font-size: 2em;
}

.multiselect__tag {
	background-color: #eeeeee;
	color: #000000;
    border: 1px solid;
}
.multiselect__input, .multiselect__single {
	line-height: 1.1em;
	padding: 0;
	margin-bottom: 0;
}
.multiselect__option--highlight {
    background: #eeeeee;
	color: #000000;
}
.multiselect__option--highlight::after {
	background: #dddddd;
	color: #000000;
}
.multiselect__tag-icon:hover {
	color:#000000;
	background-color: #ffffff;
}
.multiselect__tag-icon::after {
	color:#000000;
}
.multiselect__tag-icon:hover::after {
	color:#000000;
}
</style>
