import { computed } from "vue";

import { eventStormStore } from "../store/EventStorm";

export default function useZoom() {
	
	const zoomStyle = computed(() => eventStormStore.getState().zoom + '%');

	function onDecrease() {
		eventStormStore.setZoom(Math.max(eventStormStore.getState().zoom - 10, 10));
	}

	function onIncrease() {
		eventStormStore.setZoom(Math.min(eventStormStore.getState().zoom + 10, 200));
	}

	function onWheel(evt: WheelEvent) {
		if (evt.deltaY > 0) {
			onIncrease();
		} else if (evt.deltaY < 0) {
			onDecrease();
		}
	}

	function onReset() {
		eventStormStore.setZoom(100);
	}

	return {
		zoomStyle,
		onWheel,
		onIncrease,
		onDecrease,
		onReset,
	};
}
