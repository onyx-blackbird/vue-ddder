import { onMounted, ref, useTemplateRef, type Ref } from "vue";
import { debounce } from "../Uitls";

function needsScrollDown(element: HTMLElement): boolean {
	return element.scrollTop + element.clientHeight < element.scrollHeight
}

export default function useScroll(elementRef: string) {
	const element: Ref<HTMLElement | null> = useTemplateRef(elementRef);
	const showScrollUp = ref(false);
	const showScrollDown = ref(false);

	const onScroll = debounce(
		() => {
			showScrollUp.value = element.value!.scrollTop > 0;
			showScrollDown.value = needsScrollDown(element.value!);
		},
		100
	);

	function scrollToTop() {
		element.value!.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}

	function scrollToBottom() {
		element.value!.scrollTo({
			top: element.value!.scrollHeight,
			left: 0,
			behavior: "smooth",
		});
	}

	onMounted(() => {
		showScrollDown.value = needsScrollDown(element.value!);
	});

	return {
		showScrollUp,
		showScrollDown,
		onScroll,
		scrollToTop,
		scrollToBottom,
	};
}
