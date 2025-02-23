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
		<div class="help-modal-scroll">
			<p>The sidebar can be collapsed and expanded by pressing the chevron icon.</p>
			<h3>Languages</h3>
			<ul>
				<li>Select the display language; initially only "en" is available.</li>
				<li>Additional languages can be added with the "Edit Language Options" button.</li>
				<li>Edit the default language and/or add additonal languages (only two letter codes are allowed.)</li>
			</ul>
			<h3>Options</h3>
			<ul>
				<li>The size of the canvas can be adjusted with the input fields; the values represent the number of squares on the grid pattern.</li>
				<li>Per default the notes snap to the grid, this can be disabled by unchecking the corresponding checkbox.</li>
				<li>The color of the arrows can be changed with a color picker.</li>
			</ul>
			<h3>Canvas</h3>
			<ul>
				<li>The canvas can be moved with left and right click drag outside of notes and arrows.</li>
				<li>Use the mousewheel or the buttons on the upper left corner to change the zoom level.</li>
			</ul>
			<h3>Notes</h3>
			<ul>
				<li>Drag notes from the left side onto the grid in the middle. Double click on the title to edit it in the current language</li>
				<li>Use the edit icon to add titles and descriptions in all configured languages</li>
				<li>Once placed on the canvas the notes can be dragged around it and the size can be adjusted with the handle on the lower right corner.</li>
				<li>To delete a note click the trash can icon.</li>
			</ul>
			<h3>Arrows</h3>
			<ul>
				<li>Right click and hold on the source note and then release the right mouse button on the target note to draw an arrow between them.</li>
				<li>To delete an arrow right click on it.</li>
			</ul>
			<h3>Import and Export</h3>
			<ul>
				<li>The whole layout can be exported as a JSON file as there is no persistency availeble at the moment.</li>
				<li>This exported JSON file can be imported again to continue the work.</li>
				<li>It is recommended to add descriptions to notes so they can be exported as a basis for the ubiquitos language; either in JSON format or Markdown to be used in Wikis</li>
			</ul>
			<h3>Print</h3>
			<p>
				This tool is here to help digitize Event Storming outcomes. The actual process is better done on a physical wallpaper.
				To get back from this digital version the notes can be printed out.
			</p>
		</div>
		<form @submit.prevent>
			<button @click="model = false">Close</button>
		</form>
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
.help-modal-scroll {
	height: 40vh;
	overflow: auto;
}
</style>
