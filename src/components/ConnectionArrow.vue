<script setup lang="ts">
import type Arrow from '../models/Arrow';

interface Props {
	arrow: Arrow,
}
defineProps<Props>();
</script>

<template>
	<div class="arrow" :style="arrow.style"></div>
</template>

<style>
.arrow {
	position: absolute;
	height: 0;
	border-bottom: 5px solid #000000;
}

.arrow::after {	
	content: '';
	width: 0; 
	height: 0; 
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
	border-left: 20px solid #000000;
	position: absolute;
	right: -10px;
	top: -8px;
}
</style>
