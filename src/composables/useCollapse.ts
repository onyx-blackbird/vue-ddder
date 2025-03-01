import { ref } from "vue";

const ANGLES_DOWN = 'angles-down';
const ANGLES_UP = 'angles-up';

export default function useCollapse(startCollapsed = true) {
	const collapsedClass = ref({collapsed: startCollapsed});
	const icon = ref(startCollapsed ? ANGLES_DOWN : ANGLES_UP);

	function toggleCollapse() {
		if (collapsedClass.value.collapsed === true) {
			collapsedClass.value.collapsed = false;
			icon.value = ANGLES_UP;
		} else {
			collapsedClass.value.collapsed = true;
			icon.value = ANGLES_DOWN;
		}
	}

	return {
		collapsedClass,
		icon,
		toggleCollapse,
	};
}
