<script setup lang="ts">
import { computed } from 'vue';

import { eventStormStore } from '../../store/EventStorm';
import { GRID_SIZE } from '../../Uitls';

const snap = computed({
	get: () => eventStormStore.getState().snap,
	set: (newValue: boolean) => eventStormStore.setSnap(newValue)
});
const arrowColor = computed({
	get: () => eventStormStore.getState().arrowColor,
	set: (newValue: string) => eventStormStore.setArrowColor(newValue)
});
const gridWidth = computed({
	get: () => eventStormStore.getState().gridSize.width / GRID_SIZE,
	set: (newValue: number) => eventStormStore.setGridSize(newValue * GRID_SIZE, eventStormStore.getState().gridSize.height)
});
const gridHeight = computed({
	get: () => eventStormStore.getState().gridSize.height / GRID_SIZE,
	set: (newValue: number) => eventStormStore.setGridSize(eventStormStore.getState().gridSize.width, newValue * GRID_SIZE)
});
</script>

<template>
	<h2>Options</h2>
	<form @submit.prevent>
		<div>
			<label for="gridWidth">Grid Width </label>
			<input type="number" id="gridWidth" min="500" max="50000" step="100" v-model="gridWidth">
		</div>
		<div>
			<label for="gridHeight">Grid Height </label>
			<input type="number" id="gridHeight" min="300" max="25000" step="100" v-model="gridHeight">
		</div>
		<div>
			<label for="snap">Snap to grid</label>
			<input type="checkbox" id="snap" v-model="snap" role="switch">
		</div>
		<div>
			<label for="color">Arrow color</label>
			<input type="color" id="color" v-model="arrowColor">
		</div>
	</form>
</template>
