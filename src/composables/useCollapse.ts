import { ref } from "vue";

const ANGLES_DOWN = 'angles-down';
const ANGLES_UP = 'angles-up';
const EXPANDED = '300px';
const COLLAPSED = '50px';

interface CollapseOptions {
	collapsedTitle?: boolean;
	collapsedSidebar?: boolean;
}

export default function useCollapse(options: CollapseOptions = {collapsedTitle: true, collapsedSidebar: false}) {
	const collapsedSidebar = ref(options.collapsedSidebar);
	const collapsedClass = ref({collapsed: options.collapsedTitle});
	const icon = ref(options.collapsedTitle ? ANGLES_DOWN : ANGLES_UP);

	if (options.collapsedSidebar) {
		document.documentElement.style.setProperty('--sidebar-width', COLLAPSED);
	}

	function toggleCollapseTitle() {
		if (collapsedClass.value.collapsed === true) {
			collapsedClass.value.collapsed = false;
			icon.value = ANGLES_UP;
		} else {
			collapsedClass.value.collapsed = true;
			icon.value = ANGLES_DOWN;
		}
	}

	function onToggleCollapseSidebar() {
		if (collapsedSidebar.value === true) {
			collapsedSidebar.value = false;
			document.documentElement.style.setProperty('--sidebar-width', EXPANDED);
		} else {
			collapsedSidebar.value = true;
			document.documentElement.style.setProperty('--sidebar-width', COLLAPSED);
		}
	}

	return {
		collapsedSidebar,
		collapsedClass,
		icon,
		toggleCollapseTitle,
		onToggleCollapseSidebar,
	};
}
