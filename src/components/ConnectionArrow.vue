<script setup lang="ts">
import { computed } from 'vue';

import { eventStormStore } from "../store/EventStorm";
import type Arrow from '../models/Arrow';

interface Props {
	arrow: Arrow,
}
const props = defineProps<Props>();
const startNote = eventStormStore.findNote(props.arrow.startNoteId);
const endNote = eventStormStore.findNote(props.arrow.endNoteId);

const style = computed(() => {
	if (startNote && endNote) {
		let startX = startNote.coordinates.x + startNote.size.width;
		let startY = startNote.coordinates.y + startNote.size.height / 2;
		let endX = endNote.coordinates.x;
		let endY = endNote.coordinates.y + endNote.size.height / 2;
		if (startNote.coordinates.x > endNote.coordinates.x + endNote.size.width) {
			startX = startNote.coordinates.x;
			endX = endNote.coordinates.x + endNote.size.width;
		} else if (startNote.coordinates.x + startNote.size.width > endNote.coordinates.x) {
			startX = startNote.coordinates.x + startNote.size.width / 2;
			endX = endNote.coordinates.x + endNote.size.width / 2;
			if (startNote.coordinates.y + startNote.size.height > endNote.coordinates.y) {
				startY = startNote.coordinates.y;
				endY = endNote.coordinates.y + endNote.size.height;
			} else {
				startY = startNote.coordinates.y + startNote.size.height;
				endY = endNote.coordinates.y;
			}
		}
		return {
			'--ax': startX,
			'--ay': startY,
			'--bx': endX,
			'--by': endY,
		};
	}
});
</script>

<template>
	<div class="arrow" :style="style"></div>
</template>

<style>
.arrow {
	left: calc(var(--ax) * 1px);
	top: calc(var(--ay) * 1px);
	width: calc(hypot(calc(var(--by) - var(--ay)), calc(var(--bx) - var(--ax))) * 1px);
	rotate: atan2(calc(var(--by) - var(--ay)), calc(var(--bx) - var(--ax)));
	clip-path: polygon(0 calc(50% - var(--t)/2),calc(100% - var(--h)) calc(50% - var(--t)/2),calc(100% - var(--h)) 0,100% 50%,calc(100% - var(--h)) 100%,calc(100% - var(--h)) calc(50% + var(--t)/2),0 calc(50% + var(--t)/2));
}
</style>
