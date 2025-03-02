<script setup lang="ts" generic="T">
import { computed, ref} from 'vue';
import { useStorage } from '@vueuse/core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import useCollapse from '../../composables/useCollapse';

type ExportLayout = () => T;
type ImportLayout = (arg0: T) => void;

interface Props {
	storageType: string;
	export: ExportLayout;
	import: ImportLayout;
}
const props = defineProps<Props>();

const { collapsedClass, icon, toggleCollapseTitle } = useCollapse();

const savedLayouts = useStorage(props.storageType, new Map<string, T>());

const layouts = computed(() => {
	const keys = new Array<string>();
	savedLayouts.value.forEach((_value, key) => keys.push(key));
	return keys;
});
const loadLayout = ref('');
function onLoad() {
	if (loadLayout.value !== '') {
		const layout = savedLayouts.value.get(loadLayout.value);
		if (layout) {
			props.import(layout);
		}
	}
}

const layoutName = ref('eventStorm');
function onSave() {
	if (layoutName.value !== '') {
		savedLayouts.value.set(layoutName.value, props.export())
	}
}
function onDelete() {
	if (layoutName.value !== '') {
		savedLayouts.value.delete(layoutName.value);
	}
}
</script>

<template>
	<h2 :class="collapsedClass">Save / Load <font-awesome-icon :icon="['fas', icon]" @click="toggleCollapseTitle"/></h2>
	<div class="collapsible" :class="collapsedClass">
		<div>
			<form @submit.prevent>
				<div>
					<label for="layoutName">Name </label><input type="text" id="layoutName" v-model="layoutName">
				</div>
				<div>
					<button @click="onSave">Save layout</button>
				</div>
			</form>
			<form @submit.prevent>
				<div>
					<label for="loadLayout">Layout </label>
					<select id="loadLayout" v-model="loadLayout">
						<option v-for="(layoutKey) in layouts">{{ layoutKey }}</option>
					</select>
				</div>
				<div>
					<button @click="onLoad">Load layout</button>
					<button @click="onDelete" class="primary">Delete layout</button>
				</div>
			</form>
		</div>
	</div>
</template>
