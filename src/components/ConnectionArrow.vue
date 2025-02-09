<script setup lang="ts">
import { computed } from 'vue';

import { appStore } from "../store/App";
import type Arrow from '../models/Arrow';

interface Props {
	arrow: Arrow,
}
const props = defineProps<Props>();
const startNote = appStore.findNote(props.arrow.startNoteId);
const endNote = appStore.findNote(props.arrow.endNoteId);

const style = computed(() => {
	const startX = startNote!.coordinates.x + startNote!.size.width;
	const startY = startNote!.coordinates.y + startNote!.size.height / 2;
	const endX = endNote!.coordinates.x;
	const endY = endNote!.coordinates.y + endNote!.size.height / 2;
	return {
		'--ax': startX,
		'--ay': startY,
		'--bx': endX,
		'--by': endY,
	};
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
