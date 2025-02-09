<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';

const model = defineModel({required: true, default: false});
</script>
<template>
	<vue-final-modal v-model="model"
		class="help-modal"
		content-class="help-modal-content"
		overlay-transition="vfm-fade"
		content-transition="vfm-fade">
		<h2>Help</h2>
		<h3>Options</h3>
		<p>
			You can collapse and expand the sidebar by pressing the chevron icon.
			The size of the grid can be adjusted with the input fields.
			Per default the notes snap to the grid, this can be disabled by unchecking the corresponding checkbox.
			The color of the arrows can be changed with a color picker.
		</p>
		<h3>Notes</h3>
		<p>
			Drag notes from the left side onto the grid in the middle. Double click on the title to edit it or use the edit icon to also provide a description.
			You can drag the notes around once placed and with the handle on the lower right corner the size can be adjusted.
			The grid itself can be moved with left and right click drag outside of a note.
		</p>
		<h3>Arrows</h3>
		<p>
			Right click and hold on the source note and then release the right mouse button on the target note to draw an arrow between them. 
			This is currently limitted for left to right arrows.
		</p>
	</vue-final-modal>
</template>

<style>
.help-modal {
	display: flex;
	justify-content: center;
	align-items: center;
}
.help-modal-content {
	display: flex;
	flex-direction: column;
	padding: 1rem 2rem;
	background: #fff;
	border-radius: 0.5rem;
	width: 50vw;
	height: 50vh;
	overflow: auto;
}
.help-modal-content > * + *{
	margin: 0.5rem 0;
}
</style>
