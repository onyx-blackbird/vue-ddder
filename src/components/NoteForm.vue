<script setup lang="ts">
import { toRef } from 'vue';
import { VueFinalModal } from 'vue-final-modal'

import type Note from '../models/Note';

interface Props {
	note: Note,
}
const props = defineProps<Props>();
const title = toRef(props.note.title);

function onNoteChange() {
	props.note.title = title.value;
}
</script>

<template>
	<vue-final-modal
		class="form-modal"
		content-class="form-modal-content"
		overlay-transition="vfm-fade"
		content-transition="vfm-fade">
	<form @submit.prevent="onNoteChange">
		<input type="text" v-model="title">
		<input type="submit" value="Save">
	</form>
    </vue-final-modal>
</template>

<style>
  .form-modal {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .form-modal-content {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background: #fff;
    border-radius: 0.5rem;
  }
  .form-modal-content > * + *{
    margin: 0.5rem 0;
  }
  .form-modal-content h1 {
    font-size: 1.375rem;
  }
  .form-modal-content button {
    margin: 0.25rem 0 0 auto;
    padding: 0 8px;
    border: 1px solid;
    border-radius: 0.5rem;
  }
  </style>
